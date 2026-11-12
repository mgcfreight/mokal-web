import { fetchLocalized } from "@/utils/constants";
import { DEFAULT_LOCALE } from "@/utils/localize";
import { Blogs } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchQuery = req.nextUrl.searchParams.get('searchQuery')


    // title and contents are localized objects ({ en: ... }): filter and
    // traverse the locale itself, since localize() only runs on the result.
    const query = ` *[_type == 'blog'][title.${DEFAULT_LOCALE} match '${searchQuery}*']{
    "id":_id,
      "imageUrl":image.asset->url,
        "title":title,
         "publishedAt":_createdAt,
     "content":[...contents.${DEFAULT_LOCALE}[].children[]]}`


    const blogsData: Blogs = await fetchLocalized({
        query,
        config: {
            cache: 'no-store',
        }
    }
    )
    return NextResponse.json(blogsData)
}