# Calculator Lab - Technical Documentation

**Website:** https://calculatorlab.org
**Repository:** newaibusinessai/Calculator-Lab

---

## Overview

Calculator Lab is a web-based calculator platform built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. The site provides 225+ calculators organized into four categories: Math, Financial, Health, and Other.

---

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js (App Router) | 16.0.5 |
| UI Library | React | 19.2.0 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Hosting | Netlify | - |
| Domain Registrar | Hostinger | - |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with meta tags
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles
│   ├── sitemap.ts              # Dynamic sitemap generator
│   ├── robots.ts               # Dynamic robots.txt
│   ├── calculators/
│   │   ├── math/               # 52 math calculators
│   │   ├── financial/          # 74 financial calculators
│   │   ├── health/             # 36 health calculators
│   │   └── other/              # 63 other calculators
│   ├── blog/                   # Blog posts
│   ├── guides/                 # Educational guides
│   ├── about/                  # About page
│   ├── contact/                # Contact page
│   ├── privacy/                # Privacy policy
│   └── terms/                  # Terms of service
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Site footer
│   ├── CalculatorLayout.tsx    # Shared calculator template
│   ├── CalculatorSchema.tsx    # Schema.org structured data
│   ├── HomeCalculator.tsx      # Homepage scientific calculator
│   ├── AdUnit.tsx              # Advertisement component
│   └── ShareButtons.tsx        # Social sharing
└── lib/
    ├── calculators.ts          # Calculator metadata (225+ entries)
    └── metadata.ts             # SEO metadata utilities
```

---

## Calculator Inventory

### Math Calculators (52)

Basic arithmetic, scientific functions, algebra, geometry, statistics, and number systems.

| Calculator | Description |
|------------|-------------|
| Basic Calculator | Addition, subtraction, multiplication, division |
| Scientific Calculator | Trigonometry, logarithms, exponents |
| Percentage Calculator | Percentage calculations and conversions |
| Fraction Calculator | Fraction arithmetic with step-by-step solutions |
| Square Root Calculator | Square root computations |
| Standard Deviation Calculator | Statistical analysis |
| Quadratic Formula Calculator | Solve ax² + bx + c = 0 |
| Binary/Hex Calculator | Number system conversions |
| Matrix Calculator | Matrix operations |
| Probability Calculator | Probability computations |

*Plus 42 additional math calculators*

### Financial Calculators (74)

Loans, mortgages, investments, retirement, taxes, and budgeting.

| Calculator | Description |
|------------|-------------|
| Mortgage Calculator | Monthly payments, amortization |
| Compound Interest Calculator | Investment growth |
| Loan Calculator | Loan payments and interest |
| ROI Calculator | Return on investment |
| Retirement Calculator | Retirement planning |
| 401K Calculator | Retirement savings |
| Tax Calculator | Income tax estimates |
| Budget Calculator | Monthly budgeting |
| Credit Card Payoff Calculator | Debt payoff planning |
| Inflation Calculator | Purchasing power |

*Plus 64 additional financial calculators*

### Health & Fitness Calculators (36)

Body metrics, nutrition, fitness, and pregnancy.

| Calculator | Description |
|------------|-------------|
| BMI Calculator | Body mass index |
| Calorie Calculator | Daily calorie needs |
| TDEE Calculator | Total daily energy expenditure |
| Macro Calculator | Macronutrient ratios |
| Body Fat Calculator | Body fat percentage |
| BMR Calculator | Basal metabolic rate |
| Due Date Calculator | Pregnancy due date |
| Ideal Weight Calculator | Target weight ranges |
| Pace Calculator | Running/walking pace |
| Heart Rate Zone Calculator | Training zones |

*Plus 26 additional health calculators*

### Other Calculators (63)

Utilities, converters, construction, and everyday tools.

| Calculator | Description |
|------------|-------------|
| Age Calculator | Age from birth date |
| Date Calculator | Date arithmetic |
| GPA Calculator | Grade point average |
| Unit Converter | Unit conversions |
| Time Calculator | Time arithmetic |
| Password Generator | Secure password creation |
| Concrete Calculator | Construction materials |
| Tile Calculator | Flooring estimates |
| Fuel Cost Calculator | Trip fuel costs |
| IP Subnet Calculator | Network calculations |

*Plus 53 additional utility calculators*

---

## Technical Implementation Details

### Calculator Architecture

Each calculator follows a consistent pattern:

```typescript
// page.tsx - Route and metadata
export const metadata: Metadata = {
  title: "Calculator Name | Calculator Lab",
  description: "...",
};

export default function Page() {
  return <CalculatorComponent />;
}

// CalculatorComponent.tsx - Client component
"use client";
import { useState } from "react";

export default function CalculatorComponent() {
  const [inputs, setInputs] = useState({...});
  const [result, setResult] = useState(null);

  const calculate = () => {
    // Calculation logic
  };

  return (
    // UI with inputs, calculate button, results
  );
}
```

### State Management

- React `useState` hooks for local calculator state
- Real-time calculations on input change (where appropriate)
- Input validation with error handling

### Calculation Formulas

Calculators implement standard formulas:

**Compound Interest:**
```
A = P(1 + r/n)^(nt)
```

**Mortgage Payment:**
```
M = P × [r(1+r)^n] / [(1+r)^n - 1]
```

**BMI:**
```
BMI = weight(kg) / height(m)²
```

### Input Handling

- Number formatting using `Intl.NumberFormat`
- Unit conversion support (metric/imperial)
- Input validation and sanitization
- NaN and edge case handling

---

## SEO Implementation

### Meta Tags

Each page includes:
- Dynamic title and description
- Open Graph tags (og:title, og:description, og:image)
- Twitter Card metadata
- Canonical URLs
- Language alternates (en-US, x-default)

### Structured Data

Schema.org markup for:
- WebApplication (each calculator)
- BreadcrumbList (navigation)
- FAQPage (FAQ sections)
- Organization (site identity)
- WebSite with SearchAction

### Sitemap & Robots

- Dynamic `sitemap.xml` generated from calculator metadata
- Dynamic `robots.txt` with crawl directives
- All calculator pages indexed

---

## Routing

| Route Pattern | Description |
|---------------|-------------|
| `/` | Homepage |
| `/calculators/[category]` | Category listing |
| `/calculators/[category]/[slug]` | Individual calculator |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post |
| `/guides/[category]` | Guide category |
| `/search` | Calculator search |
| `/about`, `/contact`, `/privacy`, `/terms` | Static pages |

---

## Build & Deployment

### Development

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Deployment

- Automatic deployment via Netlify
- Connected to GitHub repository
- Build command: `next build`

---

## Analytics

- Google Analytics (G-E5JWX8XPN1)
- Google Search Console integration
- Conversion tracking setup

---

## File Counts

| Category | Files |
|----------|-------|
| Math Calculators | 52 |
| Financial Calculators | 74 |
| Health Calculators | 36 |
| Other Calculators | 63 |
| **Total Calculators** | **225** |
| Components | ~15 |
| Pages (non-calculator) | ~10 |
