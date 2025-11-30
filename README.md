# Calculator Lab

A free online calculator platform with 225+ calculators for math, finance, health, and everyday tasks.

**Live Site:** https://calculatorlab.org

---

## Overview

Calculator Lab provides browser-based calculators that run entirely client-side. No downloads, registration, or data collection required.

### Categories

| Category | Count | Examples |
|----------|-------|----------|
| **Math** | 52 | Scientific calculator, percentage, fractions, statistics, geometry |
| **Financial** | 74 | Mortgage, compound interest, retirement, tax, loans |
| **Health** | 36 | BMI, calories, macros, body fat, pregnancy |
| **Other** | 63 | Age calculator, unit converters, GPA, construction |

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Hosting:** Netlify

---

## Project Structure

```
src/
├── app/
│   ├── calculators/
│   │   ├── math/           # 52 calculators
│   │   ├── financial/      # 74 calculators
│   │   ├── health/         # 36 calculators
│   │   └── other/          # 63 calculators
│   ├── blog/
│   ├── guides/
│   └── [static pages]
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CalculatorLayout.tsx
│   └── [other components]
└── lib/
    ├── calculators.ts      # Calculator metadata
    └── metadata.ts         # SEO utilities
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/newaibusinessai/Calculator-Lab.git
cd Calculator-Lab

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 to view the site.

### Build for Production

```bash
npm run build
npm start
```

---

## Adding a New Calculator

1. Create a folder in the appropriate category:
   ```
   src/app/calculators/[category]/[calculator-slug]/
   ```

2. Add two files:
   - `page.tsx` - Route metadata and component import
   - `CalculatorName.tsx` - Calculator component with "use client" directive

3. Add the calculator to `src/lib/calculators.ts`:
   ```typescript
   {
     name: "Calculator Name",
     slug: "calculator-slug",
     description: "Brief description of what the calculator does.",
     category: "math" // or "financial", "health", "other"
   }
   ```

4. The sitemap updates automatically.

---

## Features

- **Real-time calculations** - Results update as users type
- **Unit conversion** - Many calculators support metric/imperial toggle
- **Responsive design** - Works on desktop, tablet, and mobile
- **SEO optimized** - Schema.org markup, dynamic sitemap, meta tags
- **No tracking** - Calculations stay in the browser

---

## Documentation

- [Technical Documentation](./TECHNICAL-DOCUMENTATION.md) - Architecture and implementation details
- [Calculator Descriptions](./CALCULATOR-DESCRIPTIONS.md) - Detailed descriptions of all calculators

---

## Deployment

The site deploys automatically to Netlify when changes are pushed to the main branch.

### Environment

- **Domain:** calculatorlab.org (via Hostinger)
- **DNS:** Netlify nameservers
- **SSL:** Automatic HTTPS

---

## License

Proprietary - All rights reserved.

---

## Contact

For questions or feedback, visit the [contact page](https://calculatorlab.org/contact).
