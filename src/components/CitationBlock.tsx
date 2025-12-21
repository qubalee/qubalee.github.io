import { useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  generateAPACitation,
  generateBibTeX,
  generateRIS,
  generateHarvardCitation,
  type CitationData,
} from "@/lib/citationUtils";
import { useToast } from "@/hooks/use-toast";

interface CitationBlockProps {
  citationData: CitationData;
}

export const CitationBlock = ({ citationData }: CitationBlockProps) => {
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const copyText = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  const apa = generateAPACitation(citationData);
  const harvard = generateHarvardCitation(citationData);
  const bibtex = generateBibTeX(citationData);
  const ris = generateRIS(citationData);

  const handleCopy = (text: string, format: string) => {
    copyText(text);
    setCopied(format);
    toast({
      title: "Copied to clipboard",
      description: `${format} citation copied successfully`,
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded",
      description: `Citation saved as ${filename}`,
    });
  };

  return (
    <div className="mt-8 mb-6 rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        📚 Cite This Note
      </h3>
      
      <Tabs defaultValue="harvard" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="harvard">Harvard</TabsTrigger>
          <TabsTrigger value="apa">APA</TabsTrigger>
          <TabsTrigger value="bibtex">BibTeX</TabsTrigger>
          <TabsTrigger value="ris">RIS</TabsTrigger>
        </TabsList>

        <TabsContent value="harvard" className="space-y-3">
          <div className="p-4 bg-muted rounded-md font-mono text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
            {harvard}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(harvard, "Harvard")}
              className="flex items-center gap-2"
            >
              {copied === "Harvard" ? (
                <Check size={14} className="text-green-500" />
              ) : (
                <Copy size={14} />
              )}
              {copied === "Harvard" ? "Copied!" : "Copy"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="apa" className="space-y-3">
          <div className="p-4 bg-muted rounded-md font-mono text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
            {apa}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(apa, "APA")}
              className="flex items-center gap-2"
            >
              {copied === "APA" ? (
                <Check size={14} className="text-green-500" />
              ) : (
                <Copy size={14} />
              )}
              {copied === "APA" ? "Copied!" : "Copy"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="bibtex" className="space-y-3">
          <div className="p-4 bg-muted rounded-md font-mono text-xs text-foreground leading-relaxed whitespace-pre-wrap break-words">
            {bibtex}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(bibtex, "BibTeX")}
              className="flex items-center gap-2"
            >
              {copied === "BibTeX" ? (
                <Check size={14} className="text-green-500" />
              ) : (
                <Copy size={14} />
              )}
              {copied === "BibTeX" ? "Copied!" : "Copy"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(bibtex, `citation-${citationData.title.substring(0, 20)}.bib`)}
              className="flex items-center gap-2"
            >
              <Download size={14} />
              Download .bib
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="ris" className="space-y-3">
          <div className="p-4 bg-muted rounded-md font-mono text-xs text-foreground leading-relaxed whitespace-pre-wrap break-words">
            {ris}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(ris, "RIS")}
              className="flex items-center gap-2"
            >
              {copied === "RIS" ? (
                <Check size={14} className="text-green-500" />
              ) : (
                <Copy size={14} />
              )}
              {copied === "RIS" ? "Copied!" : "Copy"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(ris, `citation-${citationData.title.substring(0, 20)}.ris`)}
              className="flex items-center gap-2"
            >
              <Download size={14} />
              Download .ris
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
