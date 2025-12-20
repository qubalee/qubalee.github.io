import { useMemo } from "react";
import { useCsvData } from "@/hooks/useCsvData";
import {
  sectionsManifest,
  type SectionDefinition,
} from "@/data/sectionsManifest";

type SectionConfigRow = {
  id: string;
  label?: string;
  enabled?: string;
  order?: string;
  subtitle?: string;
  note?: string;
  href?: string;
};

export type ConfiguredSection = SectionDefinition & {
  label: string;
  order: number;
  subtitle?: string;
  note?: string;
  href?: string;
};

export const useSectionsConfig = () => {
  const { data } = useCsvData<SectionConfigRow>("/data/sections-config.csv");

  const { sections, configMap } = useMemo(() => {
    const configMap = new Map<string, SectionConfigRow>();

    data.forEach((row) => {
      if (row?.id) {
        configMap.set(row.id, row);
      }
    });

    const sections = sectionsManifest
      .map((section) => {
        const row = configMap.get(section.id);
        const enabled = row?.enabled ? row.enabled.trim().toLowerCase() !== "false" : true;
        if (!enabled) {
          return null;
        }

        const label = row?.label?.trim() ? row.label : section.defaultLabel;
        const order = row?.order ? Number(row.order) : section.defaultOrder;
        const subtitle = row?.subtitle?.trim()
          ? row.subtitle
          : section.defaultSubtitle;
        const note = row?.note?.trim() ? row.note : section.defaultNote;
        const href = row?.href?.trim() ? row.href : undefined;

        return {
          ...section,
          label,
          order,
          subtitle,
          note,
          href,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.order - b.order) as ConfiguredSection[];

    return { sections, configMap };
  }, [data]);

  return { sections, configMap };
};
