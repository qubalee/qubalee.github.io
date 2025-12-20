import { useContext } from "react";
import { SiteInfoContext } from "@/context/siteInfoContext";

export const useSiteInfo = () => {
  return useContext(SiteInfoContext);
};
