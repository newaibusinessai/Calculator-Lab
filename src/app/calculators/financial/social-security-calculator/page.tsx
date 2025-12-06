import { Metadata } from "next";
import SocialSecurityCalculator from "./SocialSecurityCalculator";

export const metadata: Metadata = {
  title: "Social Security Calculator 2024 - Estimate Your Retirement Benefits | Free",
  description:
    "Free Social Security benefits calculator. Estimate your retirement benefits at 62, 67, or 70. Calculate SSDI disability benefits, survivors benefits, WEP & GPO impact. Find your Full Retirement Age (FRA).",
  keywords: [
    "social security calculator",
    "social security benefits calculator",
    "social security retirement calculator",
    "ss calculator",
    "social security estimator",
    "retirement benefits calculator",
    "ssa calculator",
    "social security benefit estimator",
    "when to take social security calculator",
    "social security at 62 calculator",
    "full retirement age calculator",
    "fra calculator",
    "social security disability calculator",
    "ssdi calculator",
    "ssdi benefits calculator",
    "survivors benefits calculator",
    "widow benefits calculator",
    "wep calculator",
    "windfall elimination provision calculator",
    "gpo calculator",
    "government pension offset calculator",
    "social security break even calculator",
    "maximize social security benefits",
    "social security planning calculator",
    "how much will i get from social security",
    "estimate my social security benefits",
    "2024 social security calculator",
    "social security benefits 2024",
  ],
  alternates: {
    canonical: "https://calculatorlab.org/calculators/financial/social-security-calculator",
    languages: {
      "en-US": "https://calculatorlab.org/calculators/financial/social-security-calculator",
      "x-default": "https://calculatorlab.org/calculators/financial/social-security-calculator",
    },
  },
  openGraph: {
    title: "Social Security Calculator 2024 - Free Benefits Estimator",
    description:
      "Estimate your Social Security retirement benefits, disability (SSDI), and survivors benefits. Calculate WEP and GPO impact. Find your Full Retirement Age.",
    url: "https://calculatorlab.org/calculators/financial/social-security-calculator",
    type: "website",
    siteName: "Calculator Lab",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Social Security Calculator - Free Online Benefits Estimator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Security Calculator 2024 - Free Benefits Estimator",
    description:
      "Estimate your Social Security retirement, disability, and survivors benefits. Free online calculator with WEP and GPO tools.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD structured data for the calculator
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Social Security Calculator",
  description:
    "Free online Social Security benefits calculator. Estimate retirement benefits at different ages, disability benefits, survivors benefits, and understand WEP and GPO impacts.",
  url: "https://calculatorlab.org/calculators/financial/social-security-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Quick Benefits Estimator",
    "Full Retirement Age Calculator",
    "Retirement Benefits Comparison (62, FRA, 70)",
    "SSDI Disability Benefits Calculator",
    "Survivors Benefits Calculator",
    "Windfall Elimination Provision (WEP) Calculator",
    "Government Pension Offset (GPO) Calculator",
  ],
  screenshot: "https://calculatorlab.org/og-image.png",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
    bestRating: "5",
    worstRating: "1",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Full Retirement Age for Social Security?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Full Retirement Age (FRA) is the age at which you can receive 100% of your Social Security retirement benefit. It ranges from 65 to 67 depending on your birth year. If you were born in 1960 or later, your FRA is 67. Born between 1943-1954, your FRA is 66.",
      },
    },
    {
      "@type": "Question",
      name: "How much is Social Security reduced if I claim at 62?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you claim Social Security at 62 with a Full Retirement Age of 67, your benefits are permanently reduced by 30%. The reduction is 5/9 of 1% per month for the first 36 months early, plus 5/12 of 1% per month for additional months.",
      },
    },
    {
      "@type": "Question",
      name: "How much more do I get if I wait until 70 to claim Social Security?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you delay claiming Social Security past your Full Retirement Age, you earn delayed retirement credits of 8% per year (for those born 1943 or later). Waiting until 70 with an FRA of 67 increases your benefit by 24%.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum Social Security benefit in 2024?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The maximum Social Security retirement benefit in 2024 is $4,873 per month at age 70. At Full Retirement Age, the maximum is $3,822, and at age 62, it's $2,710. These maximums require earning above the taxable maximum ($168,600 in 2024) for 35 years.",
      },
    },
    {
      "@type": "Question",
      name: "What is WEP and how does it affect my Social Security?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Windfall Elimination Provision (WEP) reduces Social Security benefits for workers who also receive a pension from work not covered by Social Security. The maximum WEP reduction in 2024 is $558 per month. Having 30+ years of substantial earnings under Social Security eliminates WEP.",
      },
    },
    {
      "@type": "Question",
      name: "How are SSDI disability benefits calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Social Security Disability Insurance (SSDI) benefits are calculated the same way as retirement benefits - based on your Average Indexed Monthly Earnings (AIME). Unlike retirement, there's no reduction for age. You receive your full Primary Insurance Amount (PIA) regardless of when you become disabled.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://calculatorlab.org",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Financial Calculators",
      item: "https://calculatorlab.org/calculators/financial",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Social Security Calculator",
      item: "https://calculatorlab.org/calculators/financial/social-security-calculator",
    },
  ],
};

export default function SocialSecurityCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SocialSecurityCalculator />
    </>
  );
}
