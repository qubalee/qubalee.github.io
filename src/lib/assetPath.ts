export const getAssetUrl = (relativePath: string): string => {
  const cleanPath = relativePath.replace(/^\/+/, "");
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/+$/, "");
  return `${base}/${cleanPath}`;
};
