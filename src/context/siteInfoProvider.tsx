import { useMemo, type PropsWithChildren } from "react";
import { useCsvData } from "@/hooks/useCsvData";
import { SiteInfoContext, defaultSiteInfo, type SiteInfo } from "@/context/siteInfoContext";
import { getAssetUrl } from "@/lib/assetPath";

export const SiteInfoProvider = ({ children }: PropsWithChildren) => {
  const { data } = useCsvData<Partial<SiteInfo>>("/data/site-info.csv");

  const siteInfo = useMemo(() => {
    const row = data[0];
    if (!row) {
      return defaultSiteInfo;
    }

    const resolvePhoto = (value?: string) => {
      if (!value) return defaultSiteInfo.photo;
      const clean = value.trim();
      if (!clean) return defaultSiteInfo.photo;
      if (/^https?:\/\//i.test(clean) || clean.startsWith("data:")) return clean;
      return getAssetUrl(clean);
    };

    return {
      name: row.name?.trim() || defaultSiteInfo.name,
      role: row.role?.trim() || defaultSiteInfo.role,
      tagline: row.tagline?.trim() || defaultSiteInfo.tagline,
      department: row.department?.trim() || defaultSiteInfo.department,
      photo: resolvePhoto(row.photo),
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
