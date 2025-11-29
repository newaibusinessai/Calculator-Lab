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
| Framework | Next.js 16.0.5 |
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
│   └── robots.txt            # Robots file for crawlers
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
│   │   │   └── health-metrics/
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
│   │   └── CalculatorSchema.tsx # Schema.org structured data
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
- [ ] Apply for Google AdSense (https://adsense.google.com)
- [ ] Apply for Ezoic as backup ad network
- [ ] Set up Bing Webmaster Tools

### Medium Priority
- [ ] Monitor Google Search Console for indexing (check after 1 week)
- [ ] Create social media profiles (Twitter, Facebook, Pinterest)
- [ ] Build backlinks through Reddit, directories

### Future Enhancements
- [ ] Add more calculators based on traffic data
- [ ] Improve popular calculators with more features
- [ ] Add more blog content for SEO
- [ ] Consider adding user accounts for saving calculations

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

### Ad Networks (in order of priority)
1. **Google AdSense** - Apply first, baseline revenue
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

*Last Updated: November 29, 2025*
