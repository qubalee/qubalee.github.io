import { useMemo, type PropsWithChildren } from "react";
import { useCsvData } from "@/hooks/useCsvData";
import { SiteInfoContext, defaultSiteInfo, type SiteInfo } from "@/context/siteInfoContext";

export const SiteInfoProvider = ({ children }: PropsWithChildren) => {
  const { data } = useCsvData<Partial<SiteInfo>>("/data/site-info.csv");

  const siteInfo = useMemo(() => {
    const row = data[0];
    if (!row) {
      return defaultSiteInfo;
    }

    return {
      name: row.name?.trim() || defaultSiteInfo.name,
      role: row.role?.trim() || defaultSiteInfo.role,
      tagline: row.tagline?.trim() || defaultSiteInfo.tagline,
      department: row.department?.trim() || defaultSiteInfo.department,
      photo: row.photo?.trim() || defaultSiteInfo.photo,
      email: row.email?.trim() || defaultSiteInfo.email,
      office: row.office?.trim() || defaultSiteInfo.office,
    };
  }, [data]);

  return (
    <SiteInfoContext.Provider value={siteInfo}>
      {children}
    </SiteInfoContext.Provider>
  );
};
