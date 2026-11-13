import { fetchLocalized } from "@/utils/constants";
import { DEFAULT_LOCALE } from "@/utils/localize";
import { NextRequest, NextResponse } from "next/server";

const MAX_LIMIT = 20;
const DEFAULT_LIMIT = 4;
const MAX_SEARCH_LENGTH = 100;
const CACHE_SECONDS = 60;

/**
 * Parses a positive integer query param. Returns the fallback when the param
 * is absent, or null when it is present but not a whole number in range.
 */
function parseIntParam(
  value: string | null,
  fallback: number,
  min: number,
  max: number
): number | null {
  if (value === null || value === "") return fallback;
  if (!/^\d+$/.test(value)) return null;
  const n = Number(value);
  return n >= min && n <= max ? n : null;
}

function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 });
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const limit = parseIntParam(params.get("limit"), DEFAULT_LIMIT, 1, MAX_LIMIT);
  if (limit === null)
    return badRequest(`limit must be an integer from 1 to ${MAX_LIMIT}`);

  const page = parseIntParam(
    params.get("page"),
    1,
    1,
    Number.MAX_SAFE_INTEGER
  );
  if (page === null) return badRequest("page must be an integer of 1 or more");

  const job = (params.get("job") ?? "").trim();
  if (job.length > MAX_SEARCH_LENGTH)
    return badRequest(`job must be at most ${MAX_SEARCH_LENGTH} characters`);

  // User input only ever reaches Sanity as GROQ parameters. An empty $search
  // matches every job.
  const filter = `_type == 'job' && ($search == "" || name.${DEFAULT_LOCALE} match $search)`;
  const query = `{
    "total": count(*[${filter}]),
    "data": *[${filter}][$start...$end]{
      ...,
      "publishedAt":_createdAt
    }
  }`;

  const start = (page - 1) * limit;
  const result = await fetchLocalized<{ total: number; data: unknown[] }>({
    query,
    params: {
      search: job ? `${job}*` : "",
      start,
      end: start + limit,
    },
    config: {
      next: { revalidate: CACHE_SECONDS },
    },
  });

  const totalItems = result.total;
  const returnData = {
    page,
    totalPages: Math.max(1, Math.ceil(totalItems / limit)),
    data: result.data,
    totalItems,
  };
  return NextResponse.json(returnData, {
    headers: {
      "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 5}`,
    },
  });
}
