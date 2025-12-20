import type { ComponentType } from "react";
import About from "@/components/About";
import Blog from "@/components/Blog";
import Publications from "@/components/Publications";
import Research from "@/components/Research";
import Team from "@/components/Team";
import Teaching from "@/components/Teaching";

export type SectionId =
  | "about"
  | "research"
  | "publications"
  | "teaching"
  | "team"
  | "blog";

export type SectionDefinition = {
  id: SectionId;
  component: ComponentType;
  defaultLabel: string;
  defaultOrder: number;
  defaultSubtitle?: string;
  defaultNote?: string;
};

export const sectionsManifest: SectionDefinition[] = [
  { id: "about", component: About, defaultLabel: "About", defaultOrder: 10 },
  {
    id: "research",
    component: Research,
    defaultLabel: "Research",
    defaultOrder: 20,
    defaultSubtitle: undefined,
  },
  {
    id: "publications",
    component: Publications,
    defaultLabel: "Publications",
    defaultOrder: 30,
  },
  {
    id: "teaching",
    component: Teaching,
    defaultLabel: "Teaching",
    defaultOrder: 40,
    defaultNote: "Office Hours: Tuesdays and Thursdays, 2-4 PM • Location: Office 123",
  },
  { id: "team", component: Team, defaultLabel: "Research Team", defaultOrder: 50 },
  { id: "blog", component: Blog, defaultLabel: "Notes", defaultOrder: 60 },
];
