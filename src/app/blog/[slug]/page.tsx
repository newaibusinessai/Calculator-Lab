import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Blog post content - in production, this could come from a CMS or markdown files
const blogPosts: Record<
  string,
  {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    content: string[];
    relatedCalculators: { name: string; slug: string; category: string }[];
  }
> = {
  "how-to-calculate-mortgage-payments": {
    title: "How to Calculate Mortgage Payments: A Complete Guide",
    excerpt:
      "Learn the mortgage payment formula and understand how principal, interest, taxes, and insurance affect your monthly payment.",
    category: "Finance",
    date: "2024-11-28",
    readTime: "8 min read",
    content: [
      "Understanding how mortgage payments are calculated is essential for anyone looking to buy a home. Whether you're a first-time homebuyer or refinancing an existing loan, knowing the math behind your monthly payment helps you make informed financial decisions.",
      "## The Mortgage Payment Formula",
      "The standard formula for calculating a fixed-rate mortgage payment is:",
      "**M = P × [r(1+r)^n] / [(1+r)^n - 1]**",
      "Where:",
      "- **M** = Monthly payment",
      "- **P** = Principal (loan amount)",
      "- **r** = Monthly interest rate (annual rate ÷ 12)",
      "- **n** = Total number of payments (loan term in years × 12)",
      "## Breaking Down PITI",
      "Your total monthly housing payment typically includes four components, known as PITI:",
      "**Principal**: The portion of your payment that reduces your loan balance. In the early years of your mortgage, most of your payment goes toward interest, but over time, more goes toward principal.",
      "**Interest**: The cost of borrowing money. This is calculated as a percentage of your remaining loan balance. With a fixed-rate mortgage, your interest rate stays the same throughout the loan term.",
      "**Taxes**: Property taxes are typically collected monthly and held in an escrow account. Your lender pays the tax bill when it comes due. Property tax rates vary significantly by location.",
      "**Insurance**: Homeowners insurance protects your property against damage and liability. If you put less than 20% down, you'll also pay Private Mortgage Insurance (PMI) until you build sufficient equity.",
      "## Example Calculation",
      "Let's calculate the monthly payment for a $300,000 home loan at 6.5% interest over 30 years:",
      "- Principal (P) = $300,000",
      "- Monthly rate (r) = 0.065 ÷ 12 = 0.00542",
      "- Number of payments (n) = 30 × 12 = 360",
      "Using the formula: M = $300,000 × [0.00542(1.00542)^360] / [(1.00542)^360 - 1]",
      "**Monthly payment = $1,896.20** (principal and interest only)",
      "Add approximately $250/month for property taxes and $150/month for insurance, and your total PITI payment would be around **$2,296.20**.",
      "## How Interest Rate Affects Your Payment",
      "Even small changes in interest rate significantly impact your monthly payment and total interest paid:",
      "| Interest Rate | Monthly P&I | Total Interest (30 yr) |",
      "|--------------|-------------|----------------------|",
      "| 5.5% | $1,703 | $313,212 |",
      "| 6.0% | $1,799 | $347,515 |",
      "| 6.5% | $1,896 | $382,633 |",
      "| 7.0% | $1,996 | $418,527 |",
      "A 1% difference in rate on a $300,000 loan means about $200 more per month and over $100,000 more in total interest over 30 years.",
      "## Tips for Lower Payments",
      "1. **Improve your credit score**: Higher scores qualify for lower rates",
      "2. **Make a larger down payment**: Reduces both principal and potentially eliminates PMI",
      "3. **Choose a shorter term**: 15-year mortgages have lower rates than 30-year",
      "4. **Shop multiple lenders**: Rates can vary significantly between lenders",
      "5. **Consider buying points**: Paying upfront for a lower rate can save money long-term",
      "## Use Our Free Mortgage Calculator",
      "Rather than doing the math by hand, use our free mortgage calculator to instantly see your monthly payment, amortization schedule, and total interest paid. You can adjust the loan amount, interest rate, and term to see how different scenarios affect your payment.",
    ],
    relatedCalculators: [
      { name: "Mortgage Calculator", slug: "mortgage-calculator", category: "financial" },
      { name: "Amortization Calculator", slug: "amortization-calculator", category: "financial" },
      { name: "Down Payment Calculator", slug: "down-payment-calculator", category: "financial" },
    ],
  },
  "understanding-compound-interest": {
    title: "Understanding Compound Interest: The Power of Time",
    excerpt:
      "Discover how compound interest works and why Einstein allegedly called it the eighth wonder of the world.",
    category: "Finance",
    date: "2024-11-28",
    readTime: "6 min read",
    content: [
      "Compound interest is often called the most powerful force in finance. Whether you're saving for retirement, paying off debt, or investing for the future, understanding how compound interest works is crucial to building wealth.",
      "## What Is Compound Interest?",
      "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, which only earns interest on the original amount, compound interest allows your money to grow exponentially.",
      "## The Compound Interest Formula",
      "**A = P(1 + r/n)^(nt)**",
      "Where:",
      "- **A** = Final amount",
      "- **P** = Principal (initial investment)",
      "- **r** = Annual interest rate (decimal)",
      "- **n** = Number of times interest compounds per year",
      "- **t** = Number of years",
      "## Simple vs. Compound Interest: A Comparison",
      "Let's compare $10,000 invested at 7% annual interest over 30 years:",
      "**Simple Interest:**",
      "- Interest earned each year: $10,000 × 0.07 = $700",
      "- Total after 30 years: $10,000 + ($700 × 30) = **$31,000**",
      "**Compound Interest (annual):**",
      "- After 30 years: $10,000 × (1.07)^30 = **$76,123**",
      "That's a difference of $45,123—more than four times your original investment!",
      "## The Rule of 72",
      "A quick way to estimate how long it takes to double your money is the Rule of 72. Simply divide 72 by your annual interest rate:",
      "- At 6% interest: 72 ÷ 6 = **12 years** to double",
      "- At 8% interest: 72 ÷ 8 = **9 years** to double",
      "- At 10% interest: 72 ÷ 10 = **7.2 years** to double",
      "## How Compounding Frequency Matters",
      "$10,000 at 10% interest for 10 years with different compounding frequencies:",
      "| Frequency | Final Amount | Total Interest |",
      "|-----------|-------------|----------------|",
      "| Annual | $25,937 | $15,937 |",
      "| Quarterly | $26,851 | $16,851 |",
      "| Monthly | $27,070 | $17,070 |",
      "| Daily | $27,179 | $17,179 |",
      "More frequent compounding earns more, but the difference diminishes as frequency increases.",
      "## The Power of Starting Early",
      "Consider two investors:",
      "**Investor A** starts at age 25, invests $5,000/year for 10 years, then stops (total invested: $50,000)",
      "**Investor B** starts at age 35, invests $5,000/year for 30 years (total invested: $150,000)",
      "At 8% annual return, by age 65:",
      "- Investor A: **$787,176**",
      "- Investor B: **$611,729**",
      "Investor A invested $100,000 less but ends up with $175,000 more! This is the power of starting early.",
      "## Compound Interest Working Against You",
      "The same principles apply to debt. Credit card debt at 20% APR compounds monthly:",
      "- $5,000 balance, minimum payments only",
      "- Could take 20+ years to pay off",
      "- Total paid: Over $12,000 (more than double the original debt)",
      "This is why paying off high-interest debt quickly is so important.",
      "## Maximizing Compound Interest",
      "1. **Start early**: Time is your greatest asset",
      "2. **Reinvest dividends**: Let your earnings compound",
      "3. **Increase contributions**: Even small increases add up",
      "4. **Choose tax-advantaged accounts**: 401(k)s and IRAs let you compound without annual taxes",
      "5. **Minimize fees**: A 1% difference in fees can cost hundreds of thousands over time",
      "## Calculate Your Own Compound Growth",
      "Use our free compound interest calculator to see how your savings can grow. Experiment with different rates, timeframes, and contribution amounts to plan your financial future.",
    ],
    relatedCalculators: [
      { name: "Compound Interest Calculator", slug: "compound-interest-calculator", category: "financial" },
      { name: "Investment Calculator", slug: "investment-calculator", category: "financial" },
      { name: "Savings Calculator", slug: "savings-calculator", category: "financial" },
    ],
  },
  "bmi-guide-what-your-number-means": {
    title: "BMI Guide: What Your Number Really Means",
    excerpt:
      "Learn how BMI is calculated, what the categories mean, and the limitations of this popular health metric.",
    category: "Health",
    date: "2024-11-28",
    readTime: "7 min read",
    content: [
      "Body Mass Index (BMI) is one of the most widely used health metrics in the world. But what does your BMI actually mean, and should you rely on it? This guide explains everything you need to know about BMI.",
      "## What Is BMI?",
      "BMI is a simple calculation that uses your height and weight to estimate whether you're at a healthy weight. It was developed in the early 19th century by Belgian mathematician Adolphe Quetelet as a quick way to measure the degree of obesity in populations.",
      "## The BMI Formula",
      "**BMI = weight (kg) / height (m)²**",
      "Or in imperial units:",
      "**BMI = [weight (lb) / height (in)²] × 703**",
      "## BMI Categories",
      "The World Health Organization defines these BMI categories:",
      "| BMI Range | Category |",
      "|-----------|----------|",
      "| Below 18.5 | Underweight |",
      "| 18.5 - 24.9 | Normal weight |",
      "| 25.0 - 29.9 | Overweight |",
      "| 30.0 - 34.9 | Obesity Class I |",
      "| 35.0 - 39.9 | Obesity Class II |",
      "| 40.0 and above | Obesity Class III |",
      "## What Each Category Means",
      "**Underweight (BMI < 18.5)**",
      "Being underweight can indicate malnutrition, eating disorders, or underlying health conditions. Health risks include weakened immune system, osteoporosis, and fertility issues.",
      "**Normal Weight (BMI 18.5-24.9)**",
      "This range is associated with the lowest health risks for most people. However, health is multifaceted—fitness, diet, and other factors also matter.",
      "**Overweight (BMI 25-29.9)**",
      "Increased risk of heart disease, type 2 diabetes, and high blood pressure. However, some people in this range are metabolically healthy.",
      "**Obese (BMI 30+)**",
      "Significantly elevated health risks. The higher the BMI, the greater the risk. Medical intervention and lifestyle changes are typically recommended.",
      "## Limitations of BMI",
      "BMI is a useful screening tool, but it has significant limitations:",
      "**1. Doesn't Distinguish Fat from Muscle**",
      "A muscular athlete might have a high BMI despite having low body fat. A bodybuilder with 8% body fat could be classified as \"obese\" by BMI.",
      "**2. Doesn't Account for Fat Distribution**",
      "Where you carry fat matters. Belly fat (visceral fat) is more dangerous than fat in other areas. Someone with a \"normal\" BMI but high belly fat may have elevated health risks.",
      "**3. Age and Gender Differences**",
      "Older adults tend to have more body fat and less muscle. Women naturally carry more fat than men. BMI doesn't account for these differences.",
      "**4. Ethnic Variations**",
      "Health risks at certain BMI levels vary by ethnicity. For example, Asian populations may have higher health risks at lower BMI levels.",
      "**5. Doesn't Measure Health**",
      "You can have a \"healthy\" BMI but be unfit, eat poorly, and have high blood pressure. Conversely, someone \"overweight\" by BMI could be metabolically healthy.",
      "## Better Health Metrics",
      "Consider using these alongside BMI:",
      "**Waist Circumference**: Men over 40 inches and women over 35 inches have increased health risks",
      "**Waist-to-Hip Ratio**: Measures fat distribution; higher ratios indicate more belly fat",
      "**Body Fat Percentage**: More accurate measure of body composition",
      "**Blood Pressure, Cholesterol, Blood Sugar**: Direct health indicators",
      "## When to Use BMI",
      "BMI is most useful for:",
      "- Quick population-level health assessments",
      "- Initial screening in medical settings",
      "- Tracking weight changes over time",
      "- General guidance when combined with other metrics",
      "## The Bottom Line",
      "BMI is a simple, free screening tool—not a definitive measure of health. If you're concerned about your weight or health, consult a healthcare provider who can consider your complete picture: BMI, body composition, fitness level, diet, family history, and other factors.",
      "## Calculate Your BMI",
      "Use our free BMI calculator to find your score, see where you fall on the categories, and get personalized recommendations for your health goals.",
    ],
    relatedCalculators: [
      { name: "BMI Calculator", slug: "bmi-calculator", category: "health" },
      { name: "Body Fat Calculator", slug: "body-fat-calculator", category: "health" },
      { name: "Calorie Calculator", slug: "calorie-calculator", category: "health" },
    ],
  },
  "percentage-calculations-made-easy": {
    title: "Percentage Calculations Made Easy: Tips & Tricks",
    excerpt:
      "Master percentage calculations with simple mental math tricks for discounts, tips, and everyday calculations.",
    category: "Math",
    date: "2024-11-28",
    readTime: "5 min read",
    content: [
      "Percentages are everywhere—discounts, tips, taxes, grades, statistics. Yet many people struggle with percentage calculations. This guide will teach you quick mental math tricks that make percentages easy.",
      "## Understanding Percentages",
      "\"Percent\" means \"per hundred.\" So 25% means 25 per 100, or 25/100, or 0.25. This understanding is the key to all percentage calculations.",
      "## The Three Basic Percentage Problems",
      "Most percentage questions fall into three categories:",
      "**1. What is X% of Y?**",
      "Example: What is 20% of 80?",
      "Solution: Multiply Y by X/100 → 80 × 0.20 = 16",
      "**2. X is what percent of Y?**",
      "Example: 16 is what percent of 80?",
      "Solution: Divide X by Y, multiply by 100 → (16 ÷ 80) × 100 = 20%",
      "**3. X is Y% of what?**",
      "Example: 16 is 20% of what?",
      "Solution: Divide X by Y/100 → 16 ÷ 0.20 = 80",
      "## Mental Math Tricks",
      "### The 10% Rule",
      "Finding 10% is easy—just move the decimal point one place left:",
      "- 10% of 80 = 8",
      "- 10% of 256 = 25.6",
      "- 10% of 1,250 = 125",
      "From there, you can build other percentages:",
      "- 5% = Half of 10%",
      "- 15% = 10% + 5%",
      "- 20% = 10% × 2",
      "- 25% = 10% × 2 + 5%",
      "### Example: Calculate a 15% Tip on $64",
      "1. Find 10% of $64 = $6.40",
      "2. Find 5% (half of 10%) = $3.20",
      "3. Add them: $6.40 + $3.20 = **$9.60**",
      "### The Flip Trick",
      "Percentages are reversible: X% of Y = Y% of X",
      "Struggling with 4% of 75? Flip it!",
      "4% of 75 = 75% of 4 = 3",
      "This works because multiplication is commutative: 0.04 × 75 = 0.75 × 4",
      "### The 1% Method",
      "Find 1%, then multiply:",
      "1% of 350 = 3.50",
      "Therefore:",
      "- 2% = 3.50 × 2 = 7",
      "- 7% = 3.50 × 7 = 24.50",
      "- 23% = 3.50 × 23 = 80.50",
      "## Common Percentage Scenarios",
      "### Calculating Discounts",
      "A $80 item is 25% off. What's the sale price?",
      "**Method 1**: Calculate the discount, then subtract",
      "- 25% of 80 = 20",
      "- Sale price: 80 - 20 = $60",
      "**Method 2**: Calculate what you pay (faster)",
      "- You pay 100% - 25% = 75%",
      "- 75% of 80 = $60",
      "### Calculating Tax",
      "A $50 item with 8% sales tax:",
      "- Tax: 50 × 0.08 = $4",
      "- Total: 50 + 4 = $54",
      "Or: 50 × 1.08 = $54",
      "### Percentage Increase/Decrease",
      "A stock went from $40 to $50. What's the percent increase?",
      "- Change: 50 - 40 = 10",
      "- Percent change: (10 ÷ 40) × 100 = 25% increase",
      "Formula: **% Change = (New - Old) / Old × 100**",
      "### Finding Original Price After Discount",
      "You paid $60 after a 25% discount. What was the original price?",
      "- You paid 75% of the original (100% - 25%)",
      "- Original = 60 ÷ 0.75 = $80",
      "## Common Percentage Equivalents",
      "Memorizing these makes calculations faster:",
      "| Percentage | Fraction | Decimal |",
      "|------------|----------|---------|",
      "| 10% | 1/10 | 0.1 |",
      "| 20% | 1/5 | 0.2 |",
      "| 25% | 1/4 | 0.25 |",
      "| 33.3% | 1/3 | 0.333 |",
      "| 50% | 1/2 | 0.5 |",
      "| 66.7% | 2/3 | 0.667 |",
      "| 75% | 3/4 | 0.75 |",
      "## Practice Makes Perfect",
      "The best way to master percentages is practice. Our percentage calculator lets you solve any percentage problem instantly, and you can use it to check your mental math as you improve.",
    ],
    relatedCalculators: [
      { name: "Percentage Calculator", slug: "percentage-calculator", category: "math" },
      { name: "Discount Calculator", slug: "discount-calculator", category: "financial" },
      { name: "Tip Calculator", slug: "tip-calculator", category: "financial" },
    ],
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://calculatorlab.org/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{post.title}</span>
      </nav>

      <article className="prose prose-lg max-w-none">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">{post.title}</h1>

        <div className="text-gray-700 space-y-4">
          {post.content.map((paragraph, index) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={index} className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
              return (
                <p key={index} className="font-semibold text-gray-800">
                  {paragraph.replace(/\*\*/g, "")}
                </p>
              );
            }
            if (paragraph.startsWith("|")) {
              // Simple table rendering
              const rows = paragraph.split("\n").filter((r) => r.startsWith("|"));
              return (
                <div key={index} className="overflow-x-auto my-4">
                  <table className="min-w-full border border-gray-300">
                    <tbody>
                      {rows.map((row, rowIndex) => {
                        const cells = row.split("|").filter((c) => c.trim());
                        if (cells.every((c) => c.trim().match(/^-+$/))) return null;
                        return (
                          <tr key={rowIndex} className={rowIndex === 0 ? "bg-gray-100" : ""}>
                            {cells.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="border border-gray-300 px-4 py-2 text-sm"
                              >
                                {cell.trim()}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={index} className="list-disc pl-6 space-y-1">
                  <li>{paragraph.replace("- ", "")}</li>
                </ul>
              );
            }
            if (paragraph.match(/^\d+\.\s/)) {
              return (
                <ol key={index} className="list-decimal pl-6 space-y-1">
                  <li>{paragraph.replace(/^\d+\.\s/, "")}</li>
                </ol>
              );
            }
            // Handle inline bold
            const parts = paragraph.split(/(\*\*[^*]+\*\*)/);
            return (
              <p key={index}>
                {parts.map((part, partIndex) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                      <strong key={partIndex} className="font-semibold">
                        {part.replace(/\*\*/g, "")}
                      </strong>
                    );
                  }
                  return part;
                })}
              </p>
            );
          })}
        </div>
      </article>

      {/* Related Calculators */}
      <section className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Related Calculators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {post.relatedCalculators.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.category}/${calc.slug}`}
              className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="text-blue-600 font-medium hover:underline">
                {calc.name}
              </span>
              <span className="block text-sm text-gray-500 mt-1">
                Try it free →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Back to Blog */}
      <div className="mt-8">
        <Link href="/blog" className="text-blue-600 hover:underline">
          ← Back to all articles
        </Link>
      </div>
    </div>
  );
}
