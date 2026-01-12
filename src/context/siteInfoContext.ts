import { createContext } from "react";

export type SiteInfo = {
  name: string;
  role: string;
  tagline: string;
  department: string;
  photo: string;
  email: string;
  office: string;
};

export const defaultSiteInfo: SiteInfo = {
  name: "",
  role: "",
  tagline: "",
  department: "",
  photo: "",
  email: "",
  office: "",
};

export const SiteInfoContext = createContext<SiteInfo>(defaultSiteInfo);
