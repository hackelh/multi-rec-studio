import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://multirecstudio.com/sitemap.xml",
    host: "https://multirecstudio.com",
  };
}
