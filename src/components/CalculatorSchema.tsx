import { Calculator } from "@/lib/calculators";

interface CalculatorSchemaProps {
  calculator: Calculator;
}

export default function CalculatorSchema({ calculator }: CalculatorSchemaProps) {
  const categoryNames: Record<string, string> = {
    math: "Mathematics",
    financial: "Finance",
    health: "Health & Fitness",
    other: "Utility",
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calculator.name,
    description: calculator.description,
    url: `https://calculatorlab.org/calculators/${calculator.category}/${calculator.slug}`,
    applicationCategory: categoryNames[calculator.category] || "Utility",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Calculator Lab",
      url: "https://calculatorlab.org",
    },
    publisher: {
      "@type": "Organization",
      name: "Calculator Lab",
      url: "https://calculatorlab.org",
    },
    browserRequirements: "Requires JavaScript",
    softwareVersion: "1.0",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb schema for SEO
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ schema for calculator pages with FAQs
export function FAQSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Organization schema for homepage
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Calculator Lab",
    url: "https://calculatorlab.org",
    logo: "https://calculatorlab.org/logo.svg",
    description:
      "Free online calculators for math, finance, health, and everyday calculations.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://calculatorlab.org/contact",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website schema for homepage
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Calculator Lab",
    url: "https://calculatorlab.org",
    description:
      "Free online calculators for math, finance, health, and everyday calculations.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://calculatorlab.org/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
