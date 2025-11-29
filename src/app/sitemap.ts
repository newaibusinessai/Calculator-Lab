import { MetadataRoute } from "next";
import { calculators, categories } from "@/lib/calculators";

// Blog post slugs - keep in sync with blog/[slug]/page.tsx
const blogSlugs = [
  "how-to-calculate-mortgage-payments",
  "understanding-compound-interest",
  "bmi-guide-what-your-number-means",
  "percentage-calculations-made-easy",
];

// Guide slugs - keep in sync with guides/[slug]/page.tsx
const guideSlugs = [
  "financial-formulas",
  "math-reference",
  "health-metrics",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://calculatorlab.org";

  // Use a fixed launch date for initial deployment
  // Update this when you make significant changes to pages
  const launchDate = new Date("2024-11-28");
  const staticPageDate = new Date("2024-11-28");

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: launchDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: staticPageDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: staticPageDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: staticPageDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: staticPageDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/site-map`,
      lastModified: launchDate,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: launchDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // Category pages - these are updated when new calculators are added
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/calculators/${category.id}`,
    lastModified: launchDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Calculator pages - use launch date initially
  // In a more dynamic setup, you could track individual page update times
  const calculatorPages: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.category}/${calc.slug}`,
    lastModified: launchDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: launchDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: launchDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  // Guide pages - linkable reference content
  const guidePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/guides`,
      lastModified: launchDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...guideSlugs.map((slug) => ({
      url: `${baseUrl}/guides/${slug}`,
      lastModified: launchDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...mainPages, ...categoryPages, ...calculatorPages, ...blogPages, ...guidePages];
}
