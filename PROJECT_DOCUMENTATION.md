# Calculator Lab - Project Documentation

## Overview
Calculator Lab is a free online calculator website with 225+ calculators across multiple categories. Built for SEO and ad revenue monetization.

**Live Site:** https://calculatorlab.org
**GitHub Repository:** https://github.com/newaibusinessai/Calculator-Lab
**Local Project Path:** `C:\Users\newai\calchub`

---

## Technical Stack

| Technology | Version/Details |
|------------|-----------------|
| Framework | Next.js 16.0.7 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Hosting | Netlify (auto-deploy from GitHub) |
| Domain Registrar | Hostinger |
| DNS | Netlify DNS |

---

## Accounts & Services

### Hosting & Deployment
- **Netlify**: Connected to GitHub repo, auto-deploys on push
- **GitHub Username**: newaibusinessai
- **Repository Name**: Calculator-Lab

### DNS Configuration
- **Nameservers** (set in Hostinger, pointing to Netlify):
  - dns1.p08.nsone.net
  - dns2.p08.nsone.net
  - dns3.p08.nsone.net
  - dns4.p08.nsone.net

### Analytics & SEO
- **Google Analytics**: Measurement ID `G-E5JWX8XPN1`
- **Google Search Console**: Verified via DNS TXT record (Domain method)
- **Sitemap**: https://calculatorlab.org/sitemap.xml (submitted to Google)

### Contact Information (displayed on site)
- **Contact Email**: contact@freegamehub.org
- **Site Name**: Calculator Lab

---

## Project Structure

```
C:\Users\newai\calchub\
├── public/
│   ├── favicon.svg          # Site favicon
│   ├── favicon.ico           # Fallback favicon
│   ├── logo.svg              # Site logo (CL + Calculator Lab)
│   ├── og-image.png          # Social sharing image (1200x630)
│   ├── og-image.svg          # Source SVG for OG image
│   ├── apple-touch-icon.svg  # iOS home screen icon
│   ├── robots.txt            # Robots file for crawlers
│   └── ads.txt               # AdSense publisher authorization
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout (Analytics, meta tags, Header/Footer)
│   │   ├── page.tsx          # Homepage
│   │   ├── globals.css       # Global styles
│   │   ├── sitemap.ts        # Dynamic sitemap generator
│   │   ├── robots.ts         # Dynamic robots.txt
│   │   ├── manifest.ts       # PWA manifest
│   │   ├── not-found.tsx     # 404 page
│   │   ├── about/            # About page
│   │   ├── contact/          # Contact page
│   │   ├── privacy/          # Privacy policy
│   │   ├── terms/            # Terms of service
│   │   ├── search/           # Search functionality
│   │   ├── site-map/         # HTML sitemap page
│   │   ├── blog/             # Blog section
│   │   │   ├── page.tsx      # Blog listing
│   │   │   └── [slug]/       # Individual blog posts
│   │   ├── guides/           # Educational guides
│   │   │   ├── page.tsx
│   │   │   ├── financial-formulas/
│   │   │   ├── math-reference/
│   │   │   ├── health-metrics/
│   │   │   ├── construction-formulas/
│   │   │   └── statistics-reference/
│   │   └── calculators/
│   │       ├── math/         # 50+ math calculators
│   │       ├── financial/    # 70+ financial calculators
│   │       ├── health/       # 40+ health calculators
│   │       └── other/        # 60+ other calculators
│   ├── components/
│   │   ├── Header.tsx        # Site header with navigation
│   │   ├── Footer.tsx        # Site footer
│   │   ├── HomeCalculator.tsx # Homepage scientific calculator
│   │   ├── CalculatorLayout.tsx # Shared layout for calculator pages
│   │   ├── CalculatorSchema.tsx # Schema.org structured data
│   │   └── CookieConsent.tsx  # Cookie consent banner (GDPR/CCPA)
│   └── lib/
│       ├── calculators.ts    # Calculator definitions and metadata
│       └── metadata.ts       # SEO metadata generation utilities
├── scripts/
│   ├── convert-og-image.js   # SVG to PNG converter
│   ├── generate-assets.js    # Asset generation script
│   ├── fix-tdee-calc.js      # Fix script for TDEE calculator
│   ├── fix-volume-calc.js    # Fix script for Volume calculator
│   └── update-layout.js      # Layout update script
├── netlify.toml              # Netlify deployment configuration
├── package.json              # Dependencies and scripts
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.ts            # Next.js configuration
```

---

## Calculator Categories

### Math Calculators (~50)
- Basic, Scientific, Percentage, Fraction, Square Root
- Statistics (Mean, Median, Mode, Standard Deviation)
- Geometry (Area, Volume, Perimeter, Triangle, Circle)
- Algebra (Quadratic, Slope, Exponent, Logarithm)
- Number Theory (GCF, LCM, Prime Factorization, Factors)

### Financial Calculators (~70)
- Loans (Mortgage, Auto, Personal, Student, Business)
- Investment (Compound Interest, ROI, IRR, Future Value)
- Retirement (401k, IRA, Roth IRA, Pension, Social Security)
- Tax (Income Tax, Sales Tax, VAT, Estate Tax)
- Budgeting (Budget, Debt Payoff, Savings, Tip)

### Health Calculators (~40)
- Body Metrics (BMI, BMR, Body Fat, Ideal Weight)
- Nutrition (Calorie, Macro, Protein, Carbohydrate)
- Fitness (TDEE, Calories Burned, Heart Rate, Pace)
- Pregnancy (Due Date, Ovulation, Conception)

### Other Calculators (~60)
- Date & Time (Age, Date, Countdown, Time Zone)
- Conversion (Unit, Temperature, Length, Weight)
- Construction (Concrete, Tile, Paint, Roofing)
- Tech (IP Subnet, Bandwidth, Password Generator)

---

## SEO Implementation

### Meta Tags (in layout.tsx)
- Title template: `%s | Calculator Lab`
- Default title: `Calculator Lab - Free Online Calculators`
- Description: `Free online calculators for math, finance, fitness, health and more.`
- Keywords: calculator, online calculator, math calculator, etc.

### Open Graph & Twitter Cards
- OG Image: `/og-image.png` (1200x630)
- Twitter Card: `summary_large_image`

### Structured Data (Schema.org)
- Organization schema
- WebSite schema with SearchAction
- Calculator schema on each calculator page
- BreadcrumbList for navigation

### Sitemap
- Dynamic sitemap at `/sitemap.xml`
- Includes all 225+ calculator pages
- Includes blog posts and guides
- Submitted to Google Search Console

### Robots.txt
- Allows all crawlers
- Disallows `/api/` and `/private/`
- References sitemap URL

---

## Deployment Workflow

### Making Changes
```bash
cd C:\Users\newai\calchub
# Make your changes to files
npm run build              # Test build locally (optional)
git add -A
git commit -m "Description of changes"
git push
```
Netlify automatically deploys within 1-2 minutes.

### Running Locally
```bash
cd C:\Users\newai\calchub
npm run dev
# Visit http://localhost:3000
```

### Production Build Test
```bash
npm run build
```

---

## Completed Setup Tasks

- [x] Site rebranded from CalcHub to Calculator Lab
- [x] Domain configured: calculatorlab.org
- [x] All references updated to calculatorlab.org
- [x] Contact email set to: contact@freegamehub.org
- [x] OG Image converted from SVG to PNG (1200x630)
- [x] Netlify deployment configured (netlify.toml)
- [x] @netlify/plugin-nextjs installed
- [x] GitHub repository created and code pushed
- [x] DNS configured via Netlify nameservers
- [x] SSL/HTTPS automatically provisioned
- [x] Google Search Console verified (DNS TXT record method)
- [x] Sitemap submitted to Google
- [x] Google Analytics installed (G-E5JWX8XPN1)
- [x] Homepage search button changed from blue to black

---

## Pending Tasks

### High Priority
- [x] Apply for Google AdSense — Approved, Auto Ads enabled, site status "Getting ready"
- [x] Add ads.txt — Live at https://calculatorlab.org/ads.txt
- [x] Add cookie consent banner — Shows on first visit, persists choice in localStorage
- [x] Add advertising section to Terms of Service
- [ ] Complete AdSense payments setup (action required in AdSense dashboard)
- [ ] Apply for Ezoic as backup ad network (after AdSense revenue stabilizes)
- [ ] Set up Bing Webmaster Tools (submit sitemap there too)

### Medium Priority
- [ ] Monitor Google Search Console for indexing
- [ ] Create social media profiles (Twitter, Facebook, Pinterest)
- [ ] Build backlinks through Reddit, directories
- [ ] Resubmit sitemap in Google Search Console after new content deployment
- [ ] Manually request indexing for new blog posts and guides via URL Inspection tool

### Future Enhancements
- [ ] Add more calculators based on traffic data (consider physics, real-estate, education categories)
- [ ] Improve popular calculators with more features
- [ ] Add more blog content for SEO (aim for 2-4 posts/month)
- [ ] Consider adding user accounts for saving calculations
- [ ] Fix pre-existing ShareButtons hydration mismatch (window.location.href SSR/client difference)

---

## SEO Implementation Details

### Blog Posts (10 total)
All blog posts include: BlogPosting schema, BreadcrumbList schema, canonical URLs, Twitter cards, Open Graph images.

| # | Slug | Category | Date |
|---|------|----------|------|
| 1 | how-to-calculate-compound-interest-step-by-step | Finance | 2026-03-30 |
| 2 | understanding-tdee-guide | Health | 2026-03-30 |
| 3 | loan-vs-mortgage-calculator | Finance | 2026-03-30 |
| 4 | unit-conversion-guide | Math | 2026-03-30 |
| 5 | complete-guide-to-social-security-benefits-2024 | Finance | 2024-12-01 |
| 6 | introducing-calculator-lab-free-online-calculators | Announcements | 2024-11-29 |
| 7 | how-to-calculate-mortgage-payments | Finance | 2024-11-28 |
| 8 | understanding-compound-interest | Finance | 2024-11-28 |
| 9 | bmi-guide-what-your-number-means | Health | 2024-11-28 |
| 10 | percentage-calculations-made-easy | Math | 2024-11-28 |

### Guides (5 total)
| # | Slug | Category |
|---|------|----------|
| 1 | financial-formulas | Finance |
| 2 | math-reference | Math |
| 3 | health-metrics | Health |
| 4 | construction-formulas | Construction (new) |
| 5 | statistics-reference | Math (new) |

### Category Pages SEO
All 4 category pages (math, financial, health, other) include:
- Canonical URLs with language alternates
- Twitter cards (summary_large_image)
- Open Graph tags
- FAQ schema markup
- Breadcrumb schema markup

### Sitemap
- **Total URLs**: 253
- **Dynamic dates**: Per-content lastModified dates (not a single static date)
- Blog/guide slugs with dates maintained in `src/app/sitemap.ts`

---

## Known Issues & Fixes Applied

### Build Errors Fixed
1. **401k Calculator**: Renamed from `401kCalculator` to `Calculator401k` (JS identifiers can't start with numbers)
2. **TDEE Calculator**: Fixed escaped backslash characters (`\!` → `!`)
3. **Volume Calculator**: Fixed escaped backtick characters in template strings

### File Encoding
- Some files had backslash encoding issues from previous sessions
- Fixed using Node.js scripts in `/scripts/` folder

---

## Revenue Strategy

### Target
- 500,000 monthly visitors
- Ad revenue monetization

### Ad Setup
- **Google AdSense**: Approved. Auto Ads + Auto Optimize enabled. Publisher ID: `ca-pub-7143327137200263`
- **Ad mode**: Auto Ads (Google places ads automatically, no manual ad slots)
- **ads.txt**: Live at `/public/ads.txt`
- **Cookie consent**: `CookieConsent.tsx` component in layout, stores preference in localStorage
- **Placeholder ad units removed**: `AdUnit.tsx` component exists but is no longer imported anywhere

### Ad Networks (in order of priority)
1. **Google AdSense** - Approved, Auto Ads enabled
2. **Ezoic** - Higher RPM, AI optimization (10K+ visits required)
3. **Mediavine** - Premium rates (50K+ sessions required)

### Expected Revenue (estimates)
- AdSense: $1-3 RPM → $500-1,500/month at 500K visitors
- Ezoic: $3-8 RPM → $1,500-4,000/month
- Mediavine: $8-15 RPM → $4,000-7,500/month

---

## Useful Commands

```bash
# Navigate to project
cd C:\Users\newai\calchub

# Install dependencies (if needed)
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Check git status
git status

# View recent commits
git log --oneline -10

# Push changes to deploy
git add -A && git commit -m "message" && git push
```

---

## External Links

- **Live Site**: https://calculatorlab.org
- **GitHub Repo**: https://github.com/newaibusinessai/Calculator-Lab
- **Netlify Dashboard**: https://app.netlify.com
- **Google Search Console**: https://search.google.com/search-console
- **Google Analytics**: https://analytics.google.com
- **Google AdSense**: https://adsense.google.com
- **Hostinger**: https://hpanel.hostinger.com

---

## Session History

### Session Date: November 29, 2025

**Completed:**
1. Rebranded site from CalcHub to Calculator Lab
2. Updated all domain references to calculatorlab.org
3. Changed contact email to contact@freegamehub.org
4. Changed homepage search button from blue to black
5. Created PNG version of OG image
6. Created netlify.toml configuration
7. Installed @netlify/plugin-nextjs
8. Fixed build errors (401k, TDEE, Volume calculators)
9. Initialized Git and pushed to GitHub
10. Deployed to Netlify
11. Configured custom domain with Netlify DNS
12. Verified Google Search Console (Domain method)
13. Submitted sitemap to Google
14. Added Google Analytics (G-E5JWX8XPN1)

### Session Date: December 21, 2025

**Completed:**
1. Created launch article: "Introducing Calculator Lab: Your Free Online Calculator Destination"
   - URL: `/blog/introducing-calculator-lab-free-online-calculators`
   - Highlights top 10 calculator types
   - Informational/neutral tone

2. Created comprehensive US Social Security Calculator with 7 tools:
   - URL: `/calculators/financial/social-security-calculator`
   - Quick Benefits Estimator
   - Full Retirement Age (FRA) Calculator
   - Retirement Benefits Estimator (compare 62 vs FRA vs 70)
   - Disability Benefits (SSDI) Calculator
   - Survivors Benefits Calculator
   - Windfall Elimination Provision (WEP) Calculator
   - Government Pension Offset (GPO) Calculator
   - Features: Tabbed interface, detailed explanations, 2024 formulas/bend points

3. SEO Optimization for Social Security Calculator:
   - Custom meta title & description with 27+ targeted keywords
   - JSON-LD structured data (WebApplication, FAQPage, BreadcrumbList schemas)
   - Open Graph and Twitter card optimization
   - Rich FAQ schema for Google featured snippets
   - On-page SEO content section with 2024 facts and strategies

4. Created comprehensive blog post: "Complete Guide to Social Security Benefits 2024"
   - URL: `/blog/complete-guide-to-social-security-benefits-2024`
   - 15-minute read covering all Social Security topics
   - Retirement, SSDI, survivors, spousal benefits
   - When to claim strategies and break-even analysis
   - WEP and GPO explanations
   - Maximizing benefits tips

**New Scripts Created:**
- `scripts/add-launch-article.js` - Adds launch article to blog
- `scripts/add-social-security-blog.js` - Adds SS blog post

**Pages to Manually Index in Google Search Console:**
1. `https://calculatorlab.org/calculators/financial/social-security-calculator`
2. `https://calculatorlab.org/blog/complete-guide-to-social-security-benefits-2024`
3. `https://calculatorlab.org/blog/introducing-calculator-lab-free-online-calculators`

---

## Key Files Modified (December 21, 2025)

| File | Purpose |
|------|---------|
| `src/app/calculators/financial/social-security-calculator/SocialSecurityCalculator.tsx` | Main calculator with 7 tabs + SEO content |
| `src/app/calculators/financial/social-security-calculator/page.tsx` | Custom SEO metadata + JSON-LD schemas |
| `src/lib/calculators.ts` | Updated calculator name/description |
| `src/app/blog/[slug]/page.tsx` | Added 2 new blog posts |
| `src/app/blog/page.tsx` | Updated blog listing |

---

## How to Resume Development

When starting a new Claude session, provide this context:

```
I'm continuing work on Calculator Lab (calculatorlab.org).
Project path: C:\Users\newai\calchub
GitHub: https://github.com/newaibusinessai/Calculator-Lab

Please read PROJECT_DOCUMENTATION.md for full context.

I need help with: [your specific task]
```

---

### Session Date: March 30, 2026

**Completed:**
1. SEO audit and fixes across the entire site
2. Fixed sitemap: added 2 missing blog slugs (social security guide + intro post), updated all dates to be per-content
3. Added BlogPosting + BreadcrumbList schema markup to all blog post pages
4. Added canonical URLs, language alternates, and Twitter cards to all 4 category pages
5. Enhanced blog post metadata: canonical URLs, OG images, Twitter cards
6. Added Twitter card support to `generateCategoryMetadata()` in metadata.ts
7. Removed placeholder Google verification meta tag (already verified via DNS)
8. Created 4 new blog posts:
   - "How to Calculate Compound Interest Step by Step" (Finance)
   - "Understanding Your TDEE: A Complete Guide" (Health)
   - "Loan vs Mortgage Calculator: Which One Do You Need?" (Finance)
   - "Unit Conversion Guide: Quick Reference" (Math)
9. Created 2 new guide pages:
   - "Construction & Home Improvement Formulas" — concrete, tile, paint, roofing, lumber
   - "Statistics Quick Reference" — mean, median, mode, std dev, probability, regression
10. Updated blog listing (10 posts total) and guides listing (5 guides total)
11. Sitemap now has 253 URLs with 4 distinct lastModified dates

**Key Files Modified:**
| File | Purpose |
|------|---------|
| `src/app/sitemap.ts` | Fixed blog slugs, added new content, dynamic dates |
| `src/app/calculators/math/page.tsx` | Added canonical + Twitter cards |
| `src/app/calculators/financial/page.tsx` | Added canonical + Twitter cards |
| `src/app/calculators/health/page.tsx` | Added canonical + Twitter cards |
| `src/app/calculators/other/page.tsx` | Added canonical + Twitter cards |
| `src/lib/metadata.ts` | Added Twitter cards to category metadata |
| `src/components/CalculatorSchema.tsx` | Added BlogPostingSchema component |
| `src/app/blog/[slug]/page.tsx` | Added schema, canonical, Twitter + 4 new posts |
| `src/app/blog/page.tsx` | Added 4 new posts to listing |
| `src/app/guides/page.tsx` | Added 2 new guides to listing |
| `src/app/guides/construction-formulas/page.tsx` | NEW guide page |
| `src/app/guides/statistics-reference/page.tsx` | NEW guide page |
| `src/app/layout.tsx` | Removed placeholder Google verification |

12. Created `ads.txt` file with Google AdSense publisher ID
13. Built cookie consent banner component (`CookieConsent.tsx`) with Accept/Decline, localStorage persistence
14. Added Advertising section to Terms of Service covering third-party ads and Google AdSense
15. Integrated cookie consent banner into root layout
16. Google AdSense approved — enabled Auto Ads and Auto Optimize
17. Removed all placeholder ad units (gray boxes) from homepage, category pages, and calculator layout
18. AdUnit.tsx component kept but no longer imported anywhere (clean for future manual ad slots if needed)

**Additional Files Modified (AdSense readiness):**
| File | Purpose |
|------|---------|
| `public/ads.txt` | NEW — Google AdSense publisher authorization |
| `src/components/CookieConsent.tsx` | NEW — Cookie consent banner component |
| `src/app/layout.tsx` | Added CookieConsent to root layout |
| `src/app/terms/page.tsx` | Added Advertising section |
| `src/components/CalculatorLayout.tsx` | Removed all AdUnit imports and placeholder ads |
| `src/app/page.tsx` | Removed ResponsiveAdUnit import and placeholder |
| `src/app/calculators/math/page.tsx` | Removed ResponsiveAdUnit import and placeholder |
| `src/app/calculators/financial/page.tsx` | Removed ResponsiveAdUnit import and placeholder |
| `src/app/calculators/health/page.tsx` | Removed ResponsiveAdUnit import and placeholder |
| `src/app/calculators/other/page.tsx` | Removed ResponsiveAdUnit import and placeholder |

**Status:**
- Google AdSense: Approved, Auto Ads ON, site status "Getting ready", payments setup pending
- Google Search Console: Verified via DNS, sitemap submitted
- Bing Webmaster Tools: Not yet set up (future task)
- Social media profiles: Not yet created (future task)

---

## Recent Git Commits

```
f2596d9 - Remove placeholder ad units, switch to AdSense Auto Ads
893bdaf - Add AdSense readiness: ads.txt, cookie consent banner, terms update
3ddfe9e - Update project documentation with March 30, 2026 session
235a91e - Add SEO improvements, 4 new blog posts, and 2 new guides
c8f3823 - Add Neuro app privacy policy and terms of service
1085260 - Add Google AdSense verification script
45bc692 - Update project documentation with December 21, 2025 session
0fc5deb - Add SEO optimization for Social Security Calculator and blog post
a473015 - Add comprehensive US Social Security Calculator with 7 tools
```

---

*Last Updated: April 3, 2026*
