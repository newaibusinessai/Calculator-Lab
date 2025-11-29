import { Metadata } from "next";
import { Calculator, getCalculatorBySlug } from "./calculators";

const categoryNames: Record<string, string> = {
  math: "Math",
  financial: "Financial",
  health: "Health & Fitness",
  other: "Utility",
};

export function generateCalculatorMetadata(slug: string): Metadata {
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    return {
      title: "Calculator Not Found",
      description: "The calculator you're looking for doesn't exist.",
    };
  }

  const title = `${calculator.name} - Free Online ${categoryNames[calculator.category]} Calculator`;
  const description = `Free online ${calculator.name.toLowerCase()}. ${calculator.description} Easy to use, instant results, no registration required.`;
  const url = `https://calculatorlab.org/calculators/${calculator.category}/${calculator.slug}`;

  return {
    title,
    description,
    keywords: [
      calculator.name.toLowerCase(),
      `${calculator.name.toLowerCase()} online`,
      `free ${calculator.name.toLowerCase()}`,
      `${categoryNames[calculator.category].toLowerCase()} calculator`,
      "online calculator",
      "free calculator",
    ],
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
        "x-default": url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Calculator Lab",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export function generateCategoryMetadata(category: string): Metadata {
  const categoryTitles: Record<string, string> = {
    math: "Math Calculators - Free Online Math Tools | Calculator Lab",
    financial: "Financial Calculators - Free Loan, Mortgage & Investment Tools | Calculator Lab",
    health: "Health & Fitness Calculators - BMI, Calorie, TDEE Tools | Calculator Lab",
    other: "Utility Calculators - Date, Time, GPA & Converter Tools | Calculator Lab",
  };

  const categoryDescriptions: Record<string, string> = {
    math: "Free online math calculators: scientific calculator, percentage calculator, fraction calculator, square root, exponent, quadratic formula, and more.",
    financial: "Free online financial calculators: mortgage calculator, loan calculator, compound interest, retirement planner, investment calculator, and more.",
    health: "Free online health calculators: BMI calculator, calorie calculator, TDEE calculator, BMR calculator, body fat calculator, and more.",
    other: "Free online utility calculators: age calculator, date calculator, time duration, GPA calculator, unit converters, and more.",
  };

  const url = `https://calculatorlab.org/calculators/${category}`;

  return {
    title: categoryTitles[category] || "Calculators | Calculator Lab",
    description: categoryDescriptions[category] || "Free online calculators.",
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
        "x-default": url,
      },
    },
    openGraph: {
      title: categoryTitles[category],
      description: categoryDescriptions[category],
      url,
      type: "website",
      siteName: "Calculator Lab",
    },
  };
}
