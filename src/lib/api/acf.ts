import { ACFProductFields } from "../types/acf";

export function hasACFData<K extends keyof ACFProductFields>(
  acf: ACFProductFields | undefined,
  key: K
): boolean {
  if (!acf) return false;
  const val = acf[key];
  if (val === undefined || val === null) return false;
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === "object") return Object.keys(val).length > 0;
  if (typeof val === "string") return val.trim().length > 0;
  return Boolean(val);
}
