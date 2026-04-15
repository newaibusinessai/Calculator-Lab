import { Metadata } from "next";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Calculator Guides & Tips - Calculator Lab Blog",
  description:
    "Learn how to use calculators effectively with our guides, tips, and tutorials on math, finance, health calculations, and more.",
  openGraph: {
    title: "Calculator Guides & Tips - Calculator Lab Blog",
    description:
      "Learn how to use calculators effectively with our guides, tips, and tutorials.",
    url: "https://calculatorlab.org/blog",
  },
};

// Blog posts data - in production, this could come from a CMS or markdown files
const blogPosts = [
  {
    slug: "how-to-calculate-your-gpa",
    title: "How to Calculate Your GPA: Complete Guide for Students",
    excerpt:
      "Learn how to calculate your GPA step by step, including weighted and unweighted GPA, how to convert letter grades to grade points, and tips for improving your GPA.",
    category: "Math",
    date: "2026-04-08",
    readTime: "8 min read",
  },
  {
    slug: "retirement-planning-basics",
    title: "Retirement Planning Basics: How Much Do You Need to Save?",
    excerpt:
      "A practical guide to retirement planning fundamentals. Learn how to estimate your retirement needs, understand the key factors that affect your savings goal, and use calculators to plan your future.",
    category: "Finance",
    date: "2026-04-08",
    readTime: "10 min read",
  },
  {
    slug: "understanding-body-fat-percentage",
    title: "Understanding Body Fat Percentage: Methods, Ranges, and Tips",
    excerpt:
      "Learn what body fat percentage is, how it is measured, what healthy ranges look like for men and women, and why it matters more than weight alone for assessing your health.",
    category: "Health",
    date: "2026-04-08",
    readTime: "9 min read",
  },
  {
    slug: "how-to-use-a-scientific-calculator",
    title: "How to Use a Scientific Calculator: A Beginner's Guide",
    excerpt:
      "A beginner-friendly guide to using a scientific calculator. Learn the essential functions, common buttons explained, order of operations, and practical examples.",
    category: "Math",
    date: "2026-04-08",
    readTime: "8 min read",
  },
  {
    slug: "home-improvement-math-calculating-materials",
    title: "Home Improvement Math: Calculating Materials for Your Next Project",
    excerpt:
      "A practical guide to calculating materials for common home improvement projects. Learn how to estimate concrete, tile, paint, and flooring with formulas and examples.",
    category: "Other",
    date: "2026-04-08",
    readTime: "9 min read",
  },
  {
    slug: "how-to-calculate-compound-interest-step-by-step",
    title: "How to Calculate Compound Interest Step by Step",
    excerpt:
      "Learn how to calculate compound interest with easy step-by-step instructions. Understand the formula, see worked examples, and discover how compounding frequency affects your savings and investments.",
    category: "Finance",
    date: "2026-03-30",
    readTime: "8 min read",
  },
  {
    slug: "understanding-tdee-guide",
    title: "Understanding Your TDEE: A Complete Guide to Total Daily Energy Expenditure",
    excerpt:
      "Learn what TDEE is, how it is calculated, and why it matters for weight loss, muscle gain, and maintaining a healthy weight. Includes activity level breakdowns and practical tips.",
    category: "Health",
    date: "2026-03-30",
    readTime: "9 min read",
  },
  {
    slug: "loan-vs-mortgage-calculator",
    title: "Loan vs Mortgage Calculator: Which One Do You Need?",
    excerpt:
      "Confused about when to use a loan calculator vs a mortgage calculator? This guide explains the key differences, when to use each, and how to get accurate results for your financial planning.",
    category: "Finance",
    date: "2026-03-30",
    readTime: "7 min read",
  },
  {
    slug: "unit-conversion-guide",
    title: "Unit Conversion Guide: Quick Reference for Common Conversions",
    excerpt:
      "A practical reference guide for the most common unit conversions in length, weight, temperature, volume, and speed. Includes formulas, quick tips, and conversion tables.",
    category: "Math",
    date: "2026-03-30",
    readTime: "6 min read",
  },
  {
    slug: "complete-guide-to-social-security-benefits-2024",
    title: "Complete Guide to Social Security Benefits 2024: Everything You Need to Know",
    excerpt:
      "Comprehensive guide to Social Security benefits in 2024. Learn about retirement benefits, disability (SSDI), survivors benefits, when to claim, and how to maximize your lifetime benefits.",
    category: "Finance",
    date: "2024-12-01",
    readTime: "15 min read",
  },
  {
    slug: "introducing-calculator-lab-free-online-calculators",
    title: "Introducing Calculator Lab: Your Free Online Calculator Destination",
    excerpt:
      "Discover Calculator Lab, a newly launched website offering over 225 free online calculators for math, finance, health, and everyday calculations.",
    category: "Announcements",
    date: "2024-11-29",
    readTime: "5 min read",
  },
  {
    slug: "how-to-calculate-mortgage-payments",
    title: "How to Calculate Mortgage Payments: A Complete Guide",
    excerpt:
      "Learn the mortgage payment formula and understand how principal, interest, taxes, and insurance affect your monthly payment.",
    category: "Finance",
    date: "2024-11-28",
    readTime: "8 min read",
  },
  {
    slug: "understanding-compound-interest",
    title: "Understanding Compound Interest: The Power of Time",
    excerpt:
      "Discover how compound interest works and why Einstein allegedly called it the eighth wonder of the world.",
    category: "Finance",
    date: "2024-11-28",
    readTime: "6 min read",
  },
  {
    slug: "bmi-guide-what-your-number-means",
    title: "BMI Guide: What Your Number Really Means",
    excerpt:
      "Learn how BMI is calculated, what the categories mean, and the limitations of this popular health metric.",
    category: "Health",
    date: "2024-11-28",
    readTime: "7 min read",
  },
  {
    slug: "percentage-calculations-made-easy",
    title: "Percentage Calculations Made Easy: Tips & Tricks",
    excerpt:
      "Master percentage calculations with simple mental math tricks for discounts, tips, and everyday calculations.",
    category: "Math",
    date: "2024-11-28",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Blog</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Calculator Guides & Tips
        </h1>
        <p className="text-lg text-gray-600">
          Learn how to make the most of our calculators with in-depth guides,
          tutorials, and tips for math, finance, health, and more.
        </p>
      </div>

      {/* Blog posts grid */}
      <div className="space-y-6">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-blue-600"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-3">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>

      {/* Ad unit */}
      <div className="mt-12 print:hidden">
        <AdUnit />
      </div>

      {/* Coming soon note */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6 text-center">
        <h3 className="font-semibold text-gray-800 mb-2">More guides coming soon!</h3>
        <p className="text-gray-600 text-sm">
          We&apos;re working on more in-depth guides to help you with your calculations.
          Check back regularly for new content.
        </p>
      </div>

      {/* SEO content */}
      <section className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          About Our Calculator Guides
        </h2>
        <div className="text-gray-600 space-y-4">
          <p>
            Our blog provides detailed guides on how to use various calculators
            effectively. Whether you&apos;re trying to understand mortgage payments,
            calculate your BMI, or master percentage calculations, we&apos;ve got you covered.
          </p>
          <p>
            Each guide explains not just how to use the calculator, but the underlying
            formulas and concepts so you truly understand your calculations. We believe
            that understanding the math makes you more confident in your financial,
            health, and academic decisions.
          </p>
        </div>
      </section>
    </div>
  );
}
