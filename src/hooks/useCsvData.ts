import { useEffect, useState } from "react";
import { getAssetUrl } from "@/lib/assetPath";

type CsvRecord = Record<string, string>;

const parseCell = (cell: string) =>
  cell.replace(/""/g, '"').trim();

const parseLine = (line: string): string[] => {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      result.push(parseCell(current));
      current = "";
      continue;
    }

    current += char;
  }

  result.push(parseCell(current));
  return result;
};

const parseCsv = (csv: string): CsvRecord[] => {
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    return [];
  }

  const headers = parseLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseLine(line);
    const record: CsvRecord = {};
    headers.forEach((header, idx) => {
      record[header] = values[idx] ?? "";
    });
    return record;
  });
};

export const useCsvData = <T extends CsvRecord = CsvRecord>(
  path: string
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    const load = async () => {
      if (!path) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const url = getAssetUrl(path);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        const raw = await response.text();
        if (canceled) {
          return;
        }

        const parsed = parseCsv(raw) as T[];
        setData(parsed);
      } catch (err) {
        if (canceled) {
          return;
        }

        setError(err instanceof Error ? err.message : "Failed to load CSV");
      } finally {
        if (!canceled) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      canceled = true;
    };
  }, [path]);

  return { data, isLoading, error };
};
