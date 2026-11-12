import { fetchLocalized } from "@/utils/constants";
import { DEFAULT_LOCALE } from "@/utils/localize";
import IndividualBlog from "@/components/page-components/individualblog";
import { IndvidualBlog } from "@/utils/types";


export default async function Blog({params}:{params:Promise<{blogId:string}>}) {
    const {blogId}=(await params)

    const individualBlogData = await fetchLocalized({
        query: `*[_type == 'blog' && _id=='${blogId}'][0]{
"id":_id,
  "imageUrl":image.asset->url,
    "title":title,
     "publishedAt":_createdAt,
 "content":[...contents.${DEFAULT_LOCALE}[].children[]]}`,
        config: {
            cache: 'no-store'
        }
    })

    return (
        <IndividualBlog data={individualBlogData as IndvidualBlog}/>
    )
}