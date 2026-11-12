// Sanity fields are now localized and come back as `{ en: "..." }` (or
// `{ en: [...blocks] }` for rich text). Components expect the plain value,
// so recursively unwrap any localized object to the requested language.

export const DEFAULT_LOCALE = "en";

const LOCALE_KEY = /^[a-z]{2}([-_][A-Za-z]{2})?$/;

function isLocalizedObject(value: Record<string, unknown>): boolean {
  const keys = Object.keys(value).filter((k) => !k.startsWith("_"));
  return (
    keys.length > 0 &&
    DEFAULT_LOCALE in value &&
    keys.every((k) => LOCALE_KEY.test(k))
  );
}

export function localize<T = unknown>(
  value: unknown,
  locale: string = DEFAULT_LOCALE
): T {
  if (Array.isArray(value)) {
    return value.map((v) => localize(v, locale)) as T;
  }
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (isLocalizedObject(obj)) {
      return localize(obj[locale] ?? obj[DEFAULT_LOCALE], locale);
    }
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) out[k] = localize(v, locale);
    return out as T;
  }
  return value as T;
}
