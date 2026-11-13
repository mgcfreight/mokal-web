import { fetchLocalized } from "@/utils/constants";
import { DEFAULT_LOCALE } from "@/utils/localize";
import { Blogs } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

const MAX_SEARCH_LENGTH = 100;
const CACHE_SECONDS = 60;

export async function GET(req: NextRequest) {
    const searchQuery = (req.nextUrl.searchParams.get('searchQuery') ?? '').trim()

    if (searchQuery.length > MAX_SEARCH_LENGTH) {
        return NextResponse.json(
            { message: `searchQuery must be at most ${MAX_SEARCH_LENGTH} characters` },
            { status: 400 }
        )
    }
    if (!searchQuery) return NextResponse.json([])

    // title and contents are localized objects ({ en: ... }): filter and
    // traverse the locale itself, since localize() only runs on the result.
    // The search term goes in as a GROQ parameter, never into the query text.
    const query = ` *[_type == 'blog' && title.${DEFAULT_LOCALE} match $search]{
    "id":_id,
      "imageUrl":image.asset->url,
        "title":title,
         "publishedAt":_createdAt,
     "content":[...contents.${DEFAULT_LOCALE}[].children[]]}`


    const blogsData: Blogs = await fetchLocalized({
        query,
        params: { search: `${searchQuery}*` },
        config: {
            next: { revalidate: CACHE_SECONDS },
        }
    }
    )
    return NextResponse.json(blogsData, {
        headers: {
            'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 5}`,
        },
    })
}
