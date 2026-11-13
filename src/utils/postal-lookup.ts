import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { Country } from "@/utils/types";

export type PostalLocation = {
  city: string;
  country: string;
  countryCode: string;
  state: string;
  stateCode: string;
};

export const INVALID_POSTAL_MESSAGE = "Invalid Postal Code";
export const UNSUPPORTED_COUNTRY_MESSAGE =
  "We can only quote shipments within the US and Canada.";
export const LOOKUP_FAILED_MESSAGE =
  "Couldn't verify postal code. Please try again.";

// Cache lookups so validation and the auto-fill effect share one request per code.
const cache = new Map<string, Promise<PostalLocation | null>>();

export function normalizePostalCode(value: unknown): string {
  const code = String(value ?? "")
    .replace(/\s+/g, "")
    .toUpperCase();
  // The API accepts 5–6 characters only: send ZIP+4 ("12345-6789") as "12345".
  const zipPlus4 = code.match(/^(\d{5})-?\d{4}$/);
  return zipPlus4 ? zipPlus4[1] : code;
}

/**
 * Resolves to the location, or `null` when the code doesn't exist.
 * Rejects on network/server errors so callers can tell "invalid" from "couldn't check".
 */
export function lookupPostalCode(raw: unknown): Promise<PostalLocation | null> {
  const postal = normalizePostalCode(raw);
  if (postal.length < 5) return Promise.resolve(null);

  if (!cache.has(postal)) {
    const request = axiosInstance
      .get(`/location`, { params: { postalCode: postal } })
      .then(({ data }) => {
        const loc = data?.data;
        if (!loc?.city || !loc?.country || !loc?.state) return null;
        return {
          city: loc.city,
          country: loc.country,
          countryCode: loc.countryCode,
          state: loc.state,
          stateCode: loc.stateCode,
        } as PostalLocation;
      })
      .catch((error) => {
        const status = axios.isAxiosError(error) ? error.response?.status : 0;
        // Only 400/404 mean the API rejected the code itself: a definite "invalid".
        // mokal-backend also answers 400 when its own Google call fails, which
        // says nothing about the code, so treat that like a 5xx.
        if ((status === 400 || status === 404) && !isUpstreamFailure(error)) {
          return null;
        }
        // Anything else (429, 401/403, 5xx, network) says nothing about the
        // code: don't cache it, so the user can retry.
        cache.delete(postal);
        throw error;
      });
    cache.set(postal, request);
  }
  return cache.get(postal)!;
}

/**
 * mokal-backend returns 400 "Invalid Google API Key" (INVALID_GOOGLE_API_KEY)
 * when Google denies its geocoding request: an outage, not a bad code.
 * TODO: drop once the backend returns a 5xx for upstream failures
 * (https://github.com/mgcfreight/mokal-backend/issues/518).
 */
function isUpstreamFailure(error: unknown): boolean {
  if (!axios.isAxiosError(error)) return false;
  const message = (error.response?.data as any)?.message;
  const text = Array.isArray(message) ? message.join(" ") : String(message ?? "");
  return /google/i.test(text);
}

/**
 * Re-check a postal code right before submitting. Lookups are cached, so this
 * is cheap; it closes the gap where the field was edited while validation ran.
 * Resolves to `true`, or the error message to show on the field.
 */
export async function checkPostalCode(raw: unknown): Promise<true | string> {
  let loc: PostalLocation | null;
  try {
    loc = await lookupPostalCode(raw);
  } catch {
    return LOOKUP_FAILED_MESSAGE;
  }
  if (!loc) return INVALID_POSTAL_MESSAGE;
  return isSupportedLocation(loc) || UNSUPPORTED_COUNTRY_MESSAGE;
}

/** The first of shippingFrom/shippingTo whose postal code fails a re-check. */
export async function findInvalidPostalCode(values: {
  shippingFrom?: { postalCode?: unknown };
  shippingTo?: { postalCode?: unknown };
}): Promise<{ name: string; message: string } | null> {
  const prefixes = ["shippingFrom", "shippingTo"] as const;
  const results = await Promise.all(
    prefixes.map((p) => checkPostalCode(values[p]?.postalCode))
  );
  const index = results.findIndex((r) => r !== true);
  if (index === -1) return null;
  return {
    name: `${prefixes[index]}.postalCode`,
    message: results[index] as string,
  };
}

/**
 * The quote API only accepts US and CA (`@IsEnum(Country)` in mokal-backend).
 * Codes from anywhere else (e.g. Mexico) must be rejected before submitting,
 * or the payload would go out without a country.
 */
export function isSupportedLocation(loc: PostalLocation): boolean {
  return toCountry(loc) !== undefined;
}

function toCountry(address: any): Country | undefined {
  const code = String(address?.countryCode ?? "").toUpperCase();
  if (code === Country.US || code === Country.CA) return code as Country;
  if (address?.country === "United States") return Country.US;
  if (address?.country === "Canada") return Country.CA;
  return undefined;
}

/** Shape a shippingFrom/shippingTo form value for the quote-request API. */
export function toAddressPayload(address: any) {
  // countryCode is form-only: the API takes `country` as the code.
  const rest = { ...(address ?? {}) };
  delete rest.countryCode;
  return {
    ...rest,
    postalCode: normalizePostalCode(rest.postalCode),
    country: toCountry(address),
  };
}
