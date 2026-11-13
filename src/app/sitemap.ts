import { MetadataRoute } from "next";
import { client } from "@/utils/constants";

// export const revalidate = 3600; // Revalidate sitemap at most every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use production URL as fallback if NEXT_PUBLIC_BASE_URL is not set or points to localhost
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.mgcfreight.com";

  // Clean up potential trailing slash
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }

  // Define all the static routes in the app
  const staticRoutes = [
    "",
    "/who-we-are",
    "/video-library",
    "/white-glove-services",
    "/track-shipments",
    "/truckload",
    "/terms-and-conditions",
    "/spot-quote",
    "/specialized-freight",
    "/shipping-guides",
    "/privacy-policy",
    "/international-shipping",
    "/get-a-quote",
    "/LTL",
    "/fulfillment-services",
    "/freight-forwarding",
    "/courier-services",
    "/customer-spotlight",
    "/corporate-partner",
    "/contact-us",
    "/claims",
    "/careers",
    "/broker-partner",
    "/carrier-partners",
    "/blogs",
    "/book-a-demo",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch all blogs from Sanity to generate dynamic blog entries
  try {
    const blogs = await client.fetch<Array<{ id: string; publishedAt?: string }>>({
      query: `*[_type == 'blog']{ "id": _id, "publishedAt": _createdAt }`,
      // config: {
      //   cache: "no-store",
      // },
    });

    if (blogs && Array.isArray(blogs)) {
      blogs.forEach((blog) => {
        if (blog.id) {
          sitemapEntries.push({
            url: `${baseUrl}/blogs/${blog.id}`,
            lastModified: blog.publishedAt ? new Date(blog.publishedAt) : new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
          });
        }
      });
    }
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  return sitemapEntries;
}
