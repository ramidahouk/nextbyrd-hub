import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const routes = [
  "",
  "/website-cost-calculator",
  "/website-builder-comparison",
  "/website-speed-calculator",
  "/website-grader",
  "/website-design-extractor",
  "/design-library",
  "/learn",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://hub.nextbyrd.com${route}`,
    lastModified: new Date("2026-05-24"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/website-cost-calculator" ? 0.9 : 0.5,
  }));
}
