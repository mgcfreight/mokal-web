import { client } from "@/utils/constants";
import IndividualBlog from "@/components/page-components/individualblog";
import { IndvidualBlog } from "@/utils/types";
import type { Metadata } from "next";
import { getBlogPostingSchema } from "@/utils/schema";
import { getLocale } from "@/utils/locale-server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string }>;
}): Promise<Metadata> {
  const { blogId } = await params;
  const locale = await getLocale();
  try {
    const blog: { title: { en: string, fr: string } } = await client.fetch({
      query: `*[_type == 'blog' && _id == $id][0]{ title }`,
      params: { id: blogId },
      config: {
        cache: "no-store",
      },
    });

    if (blog && blog.title) {
      return {
        title: `${blog.title[locale]} | MGC Freight`,
        description: `Read our latest blog: ${blog.title[locale]}. Stay updated with logistics insights from MGC Freight.`,
      };
    }
  } catch (error) {
    console.error("Error generating metadata for blog:", error);
  }

  return {
    title: "Blog | MGC Freight",
    description: "Read the MGC Freight blog for expert insights and updates on logistics.",
    keywords: ["blogs", "freight blogs", "MGC Freight blogs", "logistics blogs", "supply chain blogs", "transportation blogs"],
    openGraph: {
      title: "Blog | MGC Freight",
      description: "Read our latest blog posts for expert insights on logistics and freight shipping.",
      type: "website",
      locale: "en_US",
      siteName: "MGC Freight",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | MGC Freight",
      description: "Expert insights on logistics and freight shipping.",
    },
  };
}



export default async function Blog({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = (await params)
  const lang = await getLocale();

  const individualBlogData = await client.fetch({
    query: `*[_type == 'blog' && _id == $id][0]{
"id":_id,
  "imageUrl":image.asset->url,
    "title":title,
     "publishedAt":_createdAt,
     "authorName":Author.authorName,
     "authorImg":Author.authorImage.asset->url,
 "content":[...coalesce(contents[$lang], contents.en)[].children[]]}`,
    params: { id: blogId, lang },
    config: {
      cache: 'no-store'
    }
  })

  const blogSchema = individualBlogData
    ? getBlogPostingSchema(individualBlogData, `https://www.mgcfreight.com/blogs/${blogId}`, lang)
    : null;

  return (
    <>
      {blogSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
      )}
      <IndividualBlog data={individualBlogData as IndvidualBlog} locale={lang} />
    </>
  )
}