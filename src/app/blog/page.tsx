import { Metadata } from "next";
import Link from "next/link";

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
