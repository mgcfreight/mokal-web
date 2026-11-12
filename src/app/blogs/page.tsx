import { fetchLocalized } from "@/utils/constants";
import { DEFAULT_LOCALE } from "@/utils/localize";
import { Blogs } from "@/utils/types";
import BlogsClient from "@/components/page-components/blogs";


const query=` *[_type == 'blog']{
  "authorName":Author.authorName,
    "authorImg":Author.authorImage.asset->url,
"id":_id,
  "imageUrl":image.asset->url,
    "title":title,
     "publishedAt":_createdAt,
 "content":[...contents.${DEFAULT_LOCALE}[].children[]]}`
 

export default async function BlogsPage() {



    const blogsData: Blogs = await fetchLocalized({
        query,
        config: {
            cache: 'no-store',
        }
    }
    )


    return (
        <>
            <BlogsClient data={blogsData}/>
        </>
    )
}