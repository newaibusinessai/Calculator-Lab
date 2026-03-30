import { MetadataRoute } from "next";
import { calculators, categories } from "@/lib/calculators";

// Blog post slugs with dates - keep in sync with blog/[slug]/page.tsx
const blogSlugs: { slug: string; date: string }[] = [
  { slug: "how-to-calculate-compound-interest-step-by-step", date: "2026-03-30" },
  { slug: "understanding-tdee-guide", date: "2026-03-30" },
  { slug: "loan-vs-mortgage-calculator", date: "2026-03-30" },
  { slug: "unit-conversion-guide", date: "2026-03-30" },
  { slug: "complete-guide-to-social-security-benefits-2024", date: "2024-12-01" },
  { slug: "introducing-calculator-lab-free-online-calculators", date: "2024-11-29" },
  { slug: "how-to-calculate-mortgage-payments", date: "2024-11-28" },
  { slug: "understanding-compound-interest", date: "2024-11-28" },
  { slug: "bmi-guide-what-your-number-means", date: "2024-11-28" },
  { slug: "percentage-calculations-made-easy", date: "2024-11-28" },
];

// Guide slugs with dates - keep in sync with guides/
const guideSlugs: { slug: string; date: string }[] = [
  { slug: "construction-formulas", date: "2026-03-30" },
  { slug: "statistics-reference", date: "2026-03-30" },
  { slug: "financial-formulas", date: "2024-11-28" },
  { slug: "math-reference", date: "2024-11-28" },
  { slug: "health-metrics", date: "2024-11-28" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://calculatorlab.org";

  const launchDate = new Date("2024-11-28");
  const staticPageDate = new Date("2024-11-28");
  const latestUpdate = new Date("2026-03-30");

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: latestUpdate,
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

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/calculators/${category.id}`,
    lastModified: latestUpdate,
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
      lastModified: latestUpdate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...blogSlugs.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  // Guide pages - linkable reference content
  const guidePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/guides`,
      lastModified: latestUpdate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...guideSlugs.map((guide) => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: new Date(guide.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...mainPages, ...categoryPages, ...calculatorPages, ...blogPages, ...guidePages];
}
