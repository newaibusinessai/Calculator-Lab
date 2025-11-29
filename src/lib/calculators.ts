export interface Calculator {
  name: string;
  slug: string;
  description: string;
  category: "math" | "financial" | "health" | "other";
}

export const calculators: Calculator[] = [
  {
    "name": "Basic Calculator",
    "slug": "basic-calculator",
    "description": "Perform addition, subtraction, multiplication, and division with this simple online calculator.",
    "category": "math"
  },
  {
    "name": "Scientific Calculator",
    "slug": "scientific-calculator",
    "description": "Advanced calculator with trigonometry, logarithms, exponents, and scientific functions for students and professionals.",
    "category": "math"
  },
  {
    "name": "Percentage Calculator",
    "slug": "percentage-calculator",
    "description": "Find percentages, calculate what percent one number is of another, or determine percentage increase and decrease.",
    "category": "math"
  },
  {
    "name": "Fraction Calculator",
    "slug": "fraction-calculator",
    "description": "Add, subtract, multiply, and divide fractions with step-by-step solutions and simplified results.",
    "category": "math"
  },
  {
    "name": "Square Root Calculator",
    "slug": "square-root-calculator",
    "description": "Calculate square roots of any number instantly, including perfect squares and decimals.",
    "category": "math"
  },
  {
    "name": "Triangle Calculator",
    "slug": "triangle-calculator",
    "description": "Find missing sides, angles, area, and perimeter of any triangle using known values.",
    "category": "math"
  },
  {
    "name": "Volume Calculator",
    "slug": "volume-calculator",
    "description": "Calculate the volume of cubes, spheres, cylinders, cones, and other 3D geometric shapes.",
    "category": "math"
  },
  {
    "name": "Standard Deviation Calculator",
    "slug": "standard-deviation-calculator",
    "description": "Compute standard deviation, variance, and mean for any data set with detailed statistical analysis.",
    "category": "math"
  },
  {
    "name": "Random Number Generator",
    "slug": "random-number-generator",
    "description": "Generate random numbers within any range for games, statistics, raffles, or decision making.",
    "category": "math"
  },
  {
    "name": "Exponent Calculator",
    "slug": "exponent-calculator",
    "description": "Calculate powers and exponents including negative exponents, fractions, and large numbers.",
    "category": "math"
  },
  {
    "name": "Binary Calculator",
    "slug": "binary-calculator",
    "description": "Perform binary arithmetic and convert between binary, decimal, octal, and hexadecimal numbers.",
    "category": "math"
  },
  {
    "name": "Hex Calculator",
    "slug": "hex-calculator",
    "description": "Calculate hexadecimal operations and convert hex to decimal, binary, and other number systems.",
    "category": "math"
  },
  {
    "name": "Quadratic Formula Calculator",
    "slug": "quadratic-formula-calculator",
    "description": "Solve quadratic equations ax² + bx + c = 0 and find real or complex roots with step-by-step solutions.",
    "category": "math"
  },
  {
    "name": "Slope Calculator",
    "slug": "slope-calculator",
    "description": "Find the slope, y-intercept, and equation of a line from two points or point-slope form.",
    "category": "math"
  },
  {
    "name": "Log Calculator",
    "slug": "log-calculator",
    "description": "Calculate natural logarithms (ln), common logarithms (log10), and logarithms of any base.",
    "category": "math"
  },
  {
    "name": "Area Calculator",
    "slug": "area-calculator",
    "description": "Calculate the area of rectangles, circles, triangles, trapezoids, and other 2D shapes.",
    "category": "math"
  },
  {
    "name": "Probability Calculator",
    "slug": "probability-calculator",
    "description": "Calculate probability of single events, multiple events, conditional probability, and odds.",
    "category": "math"
  },
  {
    "name": "Statistics Calculator",
    "slug": "statistics-calculator",
    "description": "Analyze data sets with mean, median, mode, range, quartiles, and other statistical measures.",
    "category": "math"
  },
  {
    "name": "Mean Median Mode Calculator",
    "slug": "mean-median-mode-calculator",
    "description": "Find the mean, median, and mode of any number set to understand central tendency in data.",
    "category": "math"
  },
  {
    "name": "Permutation Calculator",
    "slug": "permutation-calculator",
    "description": "Calculate permutations (nPr) and combinations (nCr) for probability and counting problems.",
    "category": "math"
  },
  {
    "name": "Z-Score Calculator",
    "slug": "z-score-calculator",
    "description": "Convert raw scores to z-scores and find probabilities using the standard normal distribution.",
    "category": "math"
  },
  {
    "name": "Confidence Interval Calculator",
    "slug": "confidence-interval-calculator",
    "description": "Calculate confidence intervals for population means and proportions at various confidence levels.",
    "category": "math"
  },
  {
    "name": "Ratio Calculator",
    "slug": "ratio-calculator",
    "description": "Simplify ratios, solve proportions, and scale ratios up or down for recipes, maps, and more.",
    "category": "math"
  },
  {
    "name": "Distance Calculator",
    "slug": "distance-calculator",
    "description": "Calculate the distance between two points in 2D or 3D space using the distance formula.",
    "category": "math"
  },
  {
    "name": "Circle Calculator",
    "slug": "circle-calculator",
    "description": "Find the circumference, area, diameter, and radius of a circle from any known value.",
    "category": "math"
  },
  {
    "name": "Surface Area Calculator",
    "slug": "surface-area-calculator",
    "description": "Calculate surface area of spheres, cubes, cylinders, cones, pyramids, and prisms.",
    "category": "math"
  },
  {
    "name": "Pythagorean Theorem Calculator",
    "slug": "pythagorean-theorem-calculator",
    "description": "Find the missing side of a right triangle using the Pythagorean theorem a² + b² = c².",
    "category": "math"
  },
  {
    "name": "Right Triangle Calculator",
    "slug": "right-triangle-calculator",
    "description": "Solve right triangles by finding all sides, angles, area, and perimeter from known values.",
    "category": "math"
  },
  {
    "name": "Root Calculator",
    "slug": "root-calculator",
    "description": "Calculate any nth root including cube roots, fourth roots, and roots of decimal numbers.",
    "category": "math"
  },
  {
    "name": "LCM Calculator",
    "slug": "lcm-calculator",
    "description": "Find the least common multiple (LCM) of two or more numbers for fraction operations.",
    "category": "math"
  },
  {
    "name": "GCF Calculator",
    "slug": "gcf-calculator",
    "description": "Find the greatest common factor (GCF) of two or more numbers to simplify fractions.",
    "category": "math"
  },
  {
    "name": "Factor Calculator",
    "slug": "factor-calculator",
    "description": "Find all factors and factor pairs of any positive integer, including prime factorization.",
    "category": "math"
  },
  {
    "name": "Rounding Calculator",
    "slug": "rounding-calculator",
    "description": "Round numbers to the nearest whole number, decimal place, or significant figure.",
    "category": "math"
  },
  {
    "name": "Matrix Calculator",
    "slug": "matrix-calculator",
    "description": "Perform matrix addition, subtraction, multiplication, determinants, and inverse operations.",
    "category": "math"
  },
  {
    "name": "Scientific Notation Calculator",
    "slug": "scientific-notation-calculator",
    "description": "Convert numbers to and from scientific notation and perform calculations in scientific form.",
    "category": "math"
  },
  {
    "name": "Big Number Calculator",
    "slug": "big-number-calculator",
    "description": "Perform arithmetic with extremely large numbers that exceed normal calculator limits.",
    "category": "math"
  },
  {
    "name": "Prime Factorization Calculator",
    "slug": "prime-factorization-calculator",
    "description": "Break down any number into its prime factors with a factor tree and exponential form.",
    "category": "math"
  },
  {
    "name": "Long Division Calculator",
    "slug": "long-division-calculator",
    "description": "Solve long division problems with step-by-step work, quotients, and remainders shown.",
    "category": "math"
  },
  {
    "name": "Average Calculator",
    "slug": "average-calculator",
    "description": "Calculate the arithmetic mean, weighted average, or moving average of any number set.",
    "category": "math"
  },
  {
    "name": "P-Value Calculator",
    "slug": "p-value-calculator",
    "description": "Calculate p-values for t-tests, z-tests, and chi-square tests for statistical significance.",
    "category": "math"
  },
  {
    "name": "Percent Error Calculator",
    "slug": "percent-error-calculator",
    "description": "Calculate the percent error between experimental and theoretical values in science experiments.",
    "category": "math"
  },
  {
    "name": "Half-Life Calculator",
    "slug": "half-life-calculator",
    "description": "Calculate radioactive decay, remaining substance, or time elapsed using half-life formulas.",
    "category": "math"
  },
  {
    "name": "Sample Size Calculator",
    "slug": "sample-size-calculator",
    "description": "Determine the required sample size for surveys and studies based on confidence level and margin of error.",
    "category": "math"
  },
  {
    "name": "Number Sequence Calculator",
    "slug": "number-sequence-calculator",
    "description": "Find patterns in arithmetic, geometric, and Fibonacci sequences and predict next terms.",
    "category": "math"
  },
  {
    "name": "Percent Increase Calculator",
    "slug": "percent-increase-calculator",
    "description": "Calculate the percentage increase from an original value to a new higher value.",
    "category": "math"
  },
  {
    "name": "Percent Decrease Calculator",
    "slug": "percent-decrease-calculator",
    "description": "Calculate the percentage decrease from an original value to a new lower value.",
    "category": "math"
  },
  {
    "name": "Percentage Change Calculator",
    "slug": "percentage-change-calculator",
    "description": "Find the percentage difference between two values, whether increase or decrease.",
    "category": "math"
  },
  {
    "name": "Proportion Calculator",
    "slug": "proportion-calculator",
    "description": "Solve proportions and find missing values in equivalent ratios like a/b = c/d.",
    "category": "math"
  },
  {
    "name": "Mixed Fraction Calculator",
    "slug": "mixed-fraction-calculator",
    "description": "Add, subtract, multiply, and divide mixed numbers and improper fractions with solutions.",
    "category": "math"
  },
  {
    "name": "Decimal to Fraction Calculator",
    "slug": "decimal-to-fraction-calculator",
    "description": "Convert any decimal number to a fraction in lowest terms, including repeating decimals.",
    "category": "math"
  },
  {
    "name": "Midpoint Calculator",
    "slug": "midpoint-calculator",
    "description": "Find the midpoint between two coordinates in 2D or 3D space using the midpoint formula.",
    "category": "math"
  },
  {
    "name": "Perimeter Calculator",
    "slug": "perimeter-calculator",
    "description": "Calculate the perimeter of rectangles, squares, triangles, circles, and irregular polygons.",
    "category": "math"
  },
  {
    "name": "Loan Calculator",
    "slug": "loan-calculator",
    "description": "Calculate monthly loan payments, total interest, and payoff schedule for any loan amount and term.",
    "category": "financial"
  },
  {
    "name": "Mortgage Calculator",
    "slug": "mortgage-calculator",
    "description": "Estimate monthly mortgage payments including principal, interest, taxes, and insurance (PITI).",
    "category": "financial"
  },
  {
    "name": "Interest Calculator",
    "slug": "interest-calculator",
    "description": "Calculate simple or compound interest earned on savings, investments, or loans over time.",
    "category": "financial"
  },
  {
    "name": "Investment Calculator",
    "slug": "investment-calculator",
    "description": "Project investment growth with regular contributions, compound interest, and various return rates.",
    "category": "financial"
  },
  {
    "name": "Salary Calculator",
    "slug": "salary-calculator",
    "description": "Convert between hourly, weekly, monthly, and annual salary with overtime and bonus calculations.",
    "category": "financial"
  },
  {
    "name": "US Salary Calculator",
    "slug": "us-salary-calculator",
    "description": "Calculate take-home pay after federal and state taxes, Social Security, Medicare, and deductions.",
    "category": "financial"
  },
  {
    "name": "UK Salary Calculator",
    "slug": "uk-salary-calculator",
    "description": "Calculate take-home pay after Income Tax, National Insurance, Student Loans, and Pension contributions.",
    "category": "financial"
  },
  {
    "name": "Auto Loan Calculator",
    "slug": "auto-loan-calculator",
    "description": "Calculate monthly car payments, total cost, and compare financing options for vehicle purchases.",
    "category": "financial"
  },
  {
    "name": "Payment Calculator",
    "slug": "payment-calculator",
    "description": "Find the monthly payment needed to pay off any debt at a given interest rate and term.",
    "category": "financial"
  },
  {
    "name": "Retirement Calculator",
    "slug": "retirement-calculator",
    "description": "Plan for retirement by calculating how much to save monthly to reach your retirement income goals.",
    "category": "financial"
  },
  {
    "name": "Amortization Calculator",
    "slug": "amortization-calculator",
    "description": "Generate a complete amortization schedule showing principal and interest breakdown for each payment.",
    "category": "financial"
  },
  {
    "name": "Currency Calculator",
    "slug": "currency-calculator",
    "description": "Convert between world currencies using current exchange rates for travel and international business.",
    "category": "financial"
  },
  {
    "name": "Inflation Calculator",
    "slug": "inflation-calculator",
    "description": "Calculate the impact of inflation on purchasing power and adjust prices between different years.",
    "category": "financial"
  },
  {
    "name": "Finance Calculator",
    "slug": "finance-calculator",
    "description": "Solve for any loan variable including payment, principal, interest rate, or number of payments.",
    "category": "financial"
  },
  {
    "name": "Mortgage Payoff Calculator",
    "slug": "mortgage-payoff-calculator",
    "description": "See how extra payments can shorten your mortgage term and save thousands in interest.",
    "category": "financial"
  },
  {
    "name": "Income Tax Calculator",
    "slug": "income-tax-calculator",
    "description": "Estimate your federal and state income tax liability based on filing status and deductions.",
    "category": "financial"
  },
  {
    "name": "Compound Interest Calculator",
    "slug": "compound-interest-calculator",
    "description": "See how your money grows with compound interest over time with daily, monthly, or annual compounding.",
    "category": "financial"
  },
  {
    "name": "401K Calculator",
    "slug": "401k-calculator",
    "description": "Project your 401(k) balance at retirement based on contributions, employer match, and investment growth.",
    "category": "financial"
  },
  {
    "name": "Interest Rate Calculator",
    "slug": "interest-rate-calculator",
    "description": "Calculate the interest rate on a loan when you know the payment, principal, and loan term.",
    "category": "financial"
  },
  {
    "name": "Sales Tax Calculator",
    "slug": "sales-tax-calculator",
    "description": "Calculate sales tax for any purchase or find the pre-tax price from a total with tax included.",
    "category": "financial"
  },
  {
    "name": "House Affordability Calculator",
    "slug": "house-affordability-calculator",
    "description": "Determine how much house you can afford based on your income, debts, down payment, and interest rates.",
    "category": "financial"
  },
  {
    "name": "Savings Calculator",
    "slug": "savings-calculator",
    "description": "Calculate how your savings will grow over time with regular deposits and compound interest.",
    "category": "financial"
  },
  {
    "name": "Rent Calculator",
    "slug": "rent-calculator",
    "description": "Determine how much rent you can afford based on your income using the 30% rule and other methods.",
    "category": "financial"
  },
  {
    "name": "Marriage Tax Calculator",
    "slug": "marriage-tax-calculator",
    "description": "Compare taxes filing jointly vs separately to find the marriage penalty or bonus for couples.",
    "category": "financial"
  },
  {
    "name": "Estate Tax Calculator",
    "slug": "estate-tax-calculator",
    "description": "Estimate federal and state estate taxes on inherited assets and plan for estate tax liability.",
    "category": "financial"
  },
  {
    "name": "Pension Calculator",
    "slug": "pension-calculator",
    "description": "Estimate your pension benefits based on years of service, final salary, and pension formula.",
    "category": "financial"
  },
  {
    "name": "Social Security Calculator",
    "slug": "social-security-calculator",
    "description": "Estimate your Social Security retirement benefits based on earnings history and claiming age.",
    "category": "financial"
  },
  {
    "name": "Annuity Calculator",
    "slug": "annuity-calculator",
    "description": "Calculate the present or future value of an annuity based on payment amount and interest rate.",
    "category": "financial"
  },
  {
    "name": "Annuity Payout Calculator",
    "slug": "annuity-payout-calculator",
    "description": "Determine monthly income from an annuity based on your investment amount and payout period.",
    "category": "financial"
  },
  {
    "name": "Credit Card Calculator",
    "slug": "credit-card-calculator",
    "description": "Calculate how long to pay off credit card debt and total interest paid with minimum payments.",
    "category": "financial"
  },
  {
    "name": "Credit Card Payoff Calculator",
    "slug": "credit-card-payoff-calculator",
    "description": "Create a debt payoff plan showing how much to pay monthly to become debt-free by a target date.",
    "category": "financial"
  },
  {
    "name": "Debt Payoff Calculator",
    "slug": "debt-payoff-calculator",
    "description": "Compare debt snowball and avalanche methods to find the fastest way to eliminate your debts.",
    "category": "financial"
  },
  {
    "name": "Debt Consolidation Calculator",
    "slug": "debt-consolidation-calculator",
    "description": "See if consolidating debts into one loan will save money on interest and lower monthly payments.",
    "category": "financial"
  },
  {
    "name": "Repayment Calculator",
    "slug": "repayment-calculator",
    "description": "Calculate loan repayment schedules and compare different payment strategies to save on interest.",
    "category": "financial"
  },
  {
    "name": "Student Loan Calculator",
    "slug": "student-loan-calculator",
    "description": "Calculate student loan payments under standard, graduated, and income-driven repayment plans.",
    "category": "financial"
  },
  {
    "name": "College Cost Calculator",
    "slug": "college-cost-calculator",
    "description": "Estimate total college costs including tuition, room and board, and how much to save for education.",
    "category": "financial"
  },
  {
    "name": "Simple Interest Calculator",
    "slug": "simple-interest-calculator",
    "description": "Calculate simple interest earned or owed using the formula I = P × R × T for loans and investments.",
    "category": "financial"
  },
  {
    "name": "CD Calculator",
    "slug": "cd-calculator",
    "description": "Calculate Certificate of Deposit earnings and compare CD rates across different terms and APYs.",
    "category": "financial"
  },
  {
    "name": "Bond Calculator",
    "slug": "bond-calculator",
    "description": "Calculate bond prices, yields, and returns for Treasury, municipal, and corporate bonds.",
    "category": "financial"
  },
  {
    "name": "Roth IRA Calculator",
    "slug": "roth-ira-calculator",
    "description": "Project tax-free Roth IRA growth and compare with traditional IRA for retirement planning.",
    "category": "financial"
  },
  {
    "name": "IRA Calculator",
    "slug": "ira-calculator",
    "description": "Calculate traditional IRA growth with tax-deferred contributions and estimate retirement savings.",
    "category": "financial"
  },
  {
    "name": "RMD Calculator",
    "slug": "rmd-calculator",
    "description": "Calculate Required Minimum Distributions from retirement accounts based on age and account balance.",
    "category": "financial"
  },
  {
    "name": "VAT Calculator",
    "slug": "vat-calculator",
    "description": "Calculate Value Added Tax for any amount, add VAT to a price, or extract VAT from a total.",
    "category": "financial"
  },
  {
    "name": "Cash Back Calculator",
    "slug": "cash-back-calculator",
    "description": "Compare credit card cash back rewards and calculate annual earnings from different spending categories.",
    "category": "financial"
  },
  {
    "name": "Auto Lease Calculator",
    "slug": "auto-lease-calculator",
    "description": "Calculate monthly car lease payments based on vehicle price, residual value, and money factor.",
    "category": "financial"
  },
  {
    "name": "Depreciation Calculator",
    "slug": "depreciation-calculator",
    "description": "Calculate asset depreciation using straight-line, declining balance, or sum-of-years methods.",
    "category": "financial"
  },
  {
    "name": "Average Return Calculator",
    "slug": "average-return-calculator",
    "description": "Calculate average annual return (CAGR) on investments accounting for deposits and withdrawals.",
    "category": "financial"
  },
  {
    "name": "Margin Calculator",
    "slug": "margin-calculator",
    "description": "Calculate profit margin, markup percentage, and gross margin for pricing and business analysis.",
    "category": "financial"
  },
  {
    "name": "Discount Calculator",
    "slug": "discount-calculator",
    "description": "Calculate sale prices, discount amounts, and savings percentages for single or multiple discounts.",
    "category": "financial"
  },
  {
    "name": "Business Loan Calculator",
    "slug": "business-loan-calculator",
    "description": "Calculate monthly payments and total cost for SBA loans, term loans, and business lines of credit.",
    "category": "financial"
  },
  {
    "name": "Debt to Income Calculator",
    "slug": "debt-to-income-calculator",
    "description": "Calculate your debt-to-income ratio to assess borrowing capacity for mortgages and loans.",
    "category": "financial"
  },
  {
    "name": "Real Estate Calculator",
    "slug": "real-estate-calculator",
    "description": "Analyze real estate investments with cap rate, cash-on-cash return, and ROI calculations.",
    "category": "financial"
  },
  {
    "name": "Take Home Pay Calculator",
    "slug": "take-home-pay-calculator",
    "description": "Calculate your net paycheck after taxes, insurance, retirement contributions, and other deductions.",
    "category": "financial"
  },
  {
    "name": "Personal Loan Calculator",
    "slug": "personal-loan-calculator",
    "description": "Calculate monthly payments and total interest for unsecured personal loans at various rates.",
    "category": "financial"
  },
  {
    "name": "Boat Loan Calculator",
    "slug": "boat-loan-calculator",
    "description": "Calculate monthly payments for boat and marine financing with various loan terms and rates.",
    "category": "financial"
  },
  {
    "name": "Lease Calculator",
    "slug": "lease-calculator",
    "description": "Calculate lease payments for equipment, vehicles, or property with residual value and interest.",
    "category": "financial"
  },
  {
    "name": "Refinance Calculator",
    "slug": "refinance-calculator",
    "description": "Determine if refinancing your mortgage will save money by comparing rates, terms, and closing costs.",
    "category": "financial"
  },
  {
    "name": "Budget Calculator",
    "slug": "budget-calculator",
    "description": "Create a personal budget using the 50/30/20 rule to allocate income to needs, wants, and savings.",
    "category": "financial"
  },
  {
    "name": "Rental Property Calculator",
    "slug": "rental-property-calculator",
    "description": "Analyze rental property investments with cash flow, cap rate, and return on investment calculations.",
    "category": "financial"
  },
  {
    "name": "IRR Calculator",
    "slug": "irr-calculator",
    "description": "Calculate the Internal Rate of Return for investments with irregular cash flows over time.",
    "category": "financial"
  },
  {
    "name": "ROI Calculator",
    "slug": "roi-calculator",
    "description": "Calculate Return on Investment percentage to measure the profitability of any investment.",
    "category": "financial"
  },
  {
    "name": "APR Calculator",
    "slug": "apr-calculator",
    "description": "Calculate the true Annual Percentage Rate including fees and points for accurate loan comparison.",
    "category": "financial"
  },
  {
    "name": "FHA Loan Calculator",
    "slug": "fha-loan-calculator",
    "description": "Calculate FHA mortgage payments including mortgage insurance premiums for low down payment loans.",
    "category": "financial"
  },
  {
    "name": "VA Mortgage Calculator",
    "slug": "va-mortgage-calculator",
    "description": "Calculate VA loan payments for veterans with no down payment and no private mortgage insurance.",
    "category": "financial"
  },
  {
    "name": "Down Payment Calculator",
    "slug": "down-payment-calculator",
    "description": "Calculate how much to save for a home down payment and see how it affects your monthly mortgage.",
    "category": "financial"
  },
  {
    "name": "Rent vs Buy Calculator",
    "slug": "rent-vs-buy-calculator",
    "description": "Compare the total cost of renting versus buying a home over time to make the right housing decision.",
    "category": "financial"
  },
  {
    "name": "Payback Period Calculator",
    "slug": "payback-period-calculator",
    "description": "Calculate how long it takes for an investment to pay for itself through cash flow or savings.",
    "category": "financial"
  },
  {
    "name": "Present Value Calculator",
    "slug": "present-value-calculator",
    "description": "Calculate the current worth of future cash flows using time value of money principles.",
    "category": "financial"
  },
  {
    "name": "Future Value Calculator",
    "slug": "future-value-calculator",
    "description": "Calculate what an investment or savings will be worth in the future with compound growth.",
    "category": "financial"
  },
  {
    "name": "Commission Calculator",
    "slug": "commission-calculator",
    "description": "Calculate sales commissions for flat rate, tiered, or percentage-based compensation structures.",
    "category": "financial"
  },
  {
    "name": "Tip Calculator",
    "slug": "tip-calculator",
    "description": "Calculate restaurant tips at various percentages and split the bill evenly among multiple people.",
    "category": "financial"
  },
  {
    "name": "Percent Off Calculator",
    "slug": "percent-off-calculator",
    "description": "Calculate the final price after applying percentage discounts for sales and special offers.",
    "category": "financial"
  },
  {
    "name": "BMI Calculator",
    "slug": "bmi-calculator",
    "description": "Calculate your Body Mass Index to determine if you're underweight, normal, overweight, or obese.",
    "category": "health"
  },
  {
    "name": "Calorie Calculator",
    "slug": "calorie-calculator",
    "description": "Calculate daily calorie needs for weight loss, maintenance, or muscle gain based on your activity level.",
    "category": "health"
  },
  {
    "name": "BMR Calculator",
    "slug": "bmr-calculator",
    "description": "Calculate your Basal Metabolic Rate - the calories your body burns at rest using Mifflin-St Jeor formula.",
    "category": "health"
  },
  {
    "name": "Body Fat Calculator",
    "slug": "body-fat-calculator",
    "description": "Estimate body fat percentage using multiple methods including Navy, skinfold, and circumference measurements.",
    "category": "health"
  },
  {
    "name": "Ideal Weight Calculator",
    "slug": "ideal-weight-calculator",
    "description": "Find your ideal body weight range based on height, gender, and frame size using multiple formulas.",
    "category": "health"
  },
  {
    "name": "Macro Calculator",
    "slug": "macro-calculator",
    "description": "Calculate optimal protein, carbohydrate, and fat intake based on your goals and activity level.",
    "category": "health"
  },
  {
    "name": "Pregnancy Calculator",
    "slug": "pregnancy-calculator",
    "description": "Calculate pregnancy milestones, due date, and track fetal development week by week.",
    "category": "health"
  },
  {
    "name": "Pregnancy Weight Gain Calculator",
    "slug": "pregnancy-weight-gain-calculator",
    "description": "Track healthy pregnancy weight gain based on pre-pregnancy BMI and trimester guidelines.",
    "category": "health"
  },
  {
    "name": "Conception Calculator",
    "slug": "conception-calculator",
    "description": "Estimate conception date from due date or last menstrual period for pregnancy planning.",
    "category": "health"
  },
  {
    "name": "Due Date Calculator",
    "slug": "due-date-calculator",
    "description": "Calculate your baby's expected due date based on last menstrual period or conception date.",
    "category": "health"
  },
  {
    "name": "Pace Calculator",
    "slug": "pace-calculator",
    "description": "Calculate running or walking pace per mile or kilometer and predict race finish times.",
    "category": "health"
  },
  {
    "name": "Army Body Fat Calculator",
    "slug": "army-body-fat-calculator",
    "description": "Calculate body fat percentage using U.S. Army tape test standards for military fitness requirements.",
    "category": "health"
  },
  {
    "name": "Carbohydrate Calculator",
    "slug": "carbohydrate-calculator",
    "description": "Calculate daily carb needs for low-carb, keto, moderate, or high-carb diets based on your goals.",
    "category": "health"
  },
  {
    "name": "Lean Body Mass Calculator",
    "slug": "lean-body-mass-calculator",
    "description": "Calculate lean body mass and fat-free mass to track muscle gains and body composition changes.",
    "category": "health"
  },
  {
    "name": "Healthy Weight Calculator",
    "slug": "healthy-weight-calculator",
    "description": "Find your healthy weight range based on BMI guidelines and get personalized recommendations.",
    "category": "health"
  },
  {
    "name": "Calories Burned Calculator",
    "slug": "calories-burned-calculator",
    "description": "Calculate calories burned during exercise, sports, and daily activities based on duration and intensity.",
    "category": "health"
  },
  {
    "name": "One Rep Max Calculator",
    "slug": "one-rep-max-calculator",
    "description": "Calculate your one-rep max for any lift based on weight and reps to plan strength training.",
    "category": "health"
  },
  {
    "name": "Target Heart Rate Calculator",
    "slug": "target-heart-rate-calculator",
    "description": "Find your target heart rate zones for fat burning, cardio, and peak performance training.",
    "category": "health"
  },
  {
    "name": "Protein Calculator",
    "slug": "protein-calculator",
    "description": "Calculate daily protein requirements for muscle building, weight loss, or athletic performance.",
    "category": "health"
  },
  {
    "name": "Fat Intake Calculator",
    "slug": "fat-intake-calculator",
    "description": "Calculate optimal daily fat intake including saturated, unsaturated, and omega fatty acids.",
    "category": "health"
  },
  {
    "name": "TDEE Calculator",
    "slug": "tdee-calculator",
    "description": "Calculate Total Daily Energy Expenditure to know exactly how many calories you burn each day.",
    "category": "health"
  },
  {
    "name": "Ovulation Calculator",
    "slug": "ovulation-calculator",
    "description": "Predict ovulation dates and fertile window to maximize chances of conception or avoid pregnancy.",
    "category": "health"
  },
  {
    "name": "Period Calculator",
    "slug": "period-calculator",
    "description": "Track menstrual cycles and predict next period dates based on your average cycle length.",
    "category": "health"
  },
  {
    "name": "GFR Calculator",
    "slug": "gfr-calculator",
    "description": "Calculate Glomerular Filtration Rate to assess kidney function and chronic kidney disease stage.",
    "category": "health"
  },
  {
    "name": "Body Type Calculator",
    "slug": "body-type-calculator",
    "description": "Determine your body type - ectomorph, mesomorph, or endomorph - for personalized diet and training.",
    "category": "health"
  },
  {
    "name": "Body Surface Area Calculator",
    "slug": "body-surface-area-calculator",
    "description": "Calculate body surface area (BSA) for medical dosing, burn assessment, and metabolic calculations.",
    "category": "health"
  },
  {
    "name": "BAC Calculator",
    "slug": "bac-calculator",
    "description": "Estimate blood alcohol content based on drinks consumed, weight, gender, and time elapsed.",
    "category": "health"
  },
  {
    "name": "Water Intake Calculator",
    "slug": "water-intake-calculator",
    "description": "Calculate how much water you should drink daily based on weight, activity level, and climate.",
    "category": "health"
  },
  {
    "name": "Sleep Calculator",
    "slug": "sleep-calculator",
    "description": "Calculate optimal bedtime and wake times based on sleep cycles to wake up refreshed.",
    "category": "health"
  },
  {
    "name": "Height Calculator",
    "slug": "height-calculator",
    "description": "Predict a child's adult height based on parents' heights and current age using growth charts.",
    "category": "health"
  },
  {
    "name": "VO2 Max Calculator",
    "slug": "vo2-max-calculator",
    "description": "Estimate your VO2 max and cardiovascular fitness level using various test protocols.",
    "category": "health"
  },
  {
    "name": "Heart Rate Zone Calculator",
    "slug": "heart-rate-zone-calculator",
    "description": "Calculate five heart rate training zones from recovery to maximum effort for optimal workouts.",
    "category": "health"
  },
  {
    "name": "Steps to Calories Calculator",
    "slug": "steps-to-calories-calculator",
    "description": "Convert daily step count to calories burned based on your weight, pace, and stride length.",
    "category": "health"
  },
  {
    "name": "Marathon Pace Calculator",
    "slug": "marathon-pace-calculator",
    "description": "Calculate marathon, half marathon, 10K, and 5K pace and finish time predictions for race planning.",
    "category": "health"
  },
  {
    "name": "Cycling Calorie Calculator",
    "slug": "cycling-calorie-calculator",
    "description": "Calculate calories burned cycling based on speed, duration, weight, and terrain type.",
    "category": "health"
  },
  {
    "name": "Running Calorie Calculator",
    "slug": "running-calorie-calculator",
    "description": "Calculate calories burned running or jogging based on distance, pace, weight, and incline.",
    "category": "health"
  },
  {
    "name": "Age Calculator",
    "slug": "age-calculator",
    "description": "Calculate your exact age in years, months, days, hours, and minutes from your birth date.",
    "category": "other"
  },
  {
    "name": "Date Calculator",
    "slug": "date-calculator",
    "description": "Add or subtract days, weeks, months, or years from any date and find days between two dates.",
    "category": "other"
  },
  {
    "name": "Time Calculator",
    "slug": "time-calculator",
    "description": "Add or subtract hours, minutes, and seconds to calculate elapsed time and time differences.",
    "category": "other"
  },
  {
    "name": "Unit Converter",
    "slug": "unit-converter",
    "description": "Convert between units of length, weight, volume, temperature, area, speed, and more.",
    "category": "other"
  },
  {
    "name": "GPA Calculator",
    "slug": "gpa-calculator",
    "description": "Calculate your cumulative GPA and semester GPA with support for weighted and unweighted grades.",
    "category": "other"
  },
  {
    "name": "Hours Calculator",
    "slug": "hours-calculator",
    "description": "Calculate hours and minutes between two times for work schedules and time tracking.",
    "category": "other"
  },
  {
    "name": "Grade Calculator",
    "slug": "grade-calculator",
    "description": "Calculate your class grade and determine what scores you need on remaining assignments.",
    "category": "other"
  },
  {
    "name": "Concrete Calculator",
    "slug": "concrete-calculator",
    "description": "Calculate cubic yards of concrete needed for slabs, footings, columns, and steps.",
    "category": "other"
  },
  {
    "name": "IP Subnet Calculator",
    "slug": "ip-subnet-calculator",
    "description": "Calculate IP subnet masks, network addresses, broadcast addresses, and host ranges.",
    "category": "other"
  },
  {
    "name": "Bra Size Calculator",
    "slug": "bra-size-calculator",
    "description": "Find your correct bra size using band and bust measurements with US, UK, and EU sizing.",
    "category": "other"
  },
  {
    "name": "Password Generator",
    "slug": "password-generator",
    "description": "Generate strong, random passwords with customizable length, symbols, and character types.",
    "category": "other"
  },
  {
    "name": "Dice Roller",
    "slug": "dice-roller",
    "description": "Roll virtual dice for board games, RPGs, and gambling simulations with any number of sides.",
    "category": "other"
  },
  {
    "name": "Conversion Calculator",
    "slug": "conversion-calculator",
    "description": "Convert between common units including metric to imperial for length, weight, and volume.",
    "category": "other"
  },
  {
    "name": "Fuel Cost Calculator",
    "slug": "fuel-cost-calculator",
    "description": "Calculate fuel costs for road trips based on distance, gas price, and vehicle MPG.",
    "category": "other"
  },
  {
    "name": "Voltage Drop Calculator",
    "slug": "voltage-drop-calculator",
    "description": "Calculate voltage drop in electrical circuits based on wire gauge, length, and current.",
    "category": "other"
  },
  {
    "name": "BTU Calculator",
    "slug": "btu-calculator",
    "description": "Calculate BTU requirements for heating and cooling a room based on size and insulation.",
    "category": "other"
  },
  {
    "name": "Square Footage Calculator",
    "slug": "square-footage-calculator",
    "description": "Calculate square footage of rooms, yards, and irregular shapes for flooring and landscaping.",
    "category": "other"
  },
  {
    "name": "Time Card Calculator",
    "slug": "time-card-calculator",
    "description": "Calculate weekly work hours, overtime, and pay from time clock entries and punch times.",
    "category": "other"
  },
  {
    "name": "Time Zone Calculator",
    "slug": "time-zone-calculator",
    "description": "Convert times between world time zones and find the best meeting times across locations.",
    "category": "other"
  },
  {
    "name": "Gas Mileage Calculator",
    "slug": "gas-mileage-calculator",
    "description": "Calculate miles per gallon (MPG) for your vehicle based on distance traveled and fuel used.",
    "category": "other"
  },
  {
    "name": "Horsepower Calculator",
    "slug": "horsepower-calculator",
    "description": "Calculate engine horsepower from torque and RPM or using quarter-mile time and weight.",
    "category": "other"
  },
  {
    "name": "Electricity Calculator",
    "slug": "electricity-calculator",
    "description": "Calculate electricity usage costs for appliances based on wattage, hours used, and kWh rates.",
    "category": "other"
  },
  {
    "name": "Ohms Law Calculator",
    "slug": "ohms-law-calculator",
    "description": "Calculate voltage, current, resistance, and power using Ohm's Law for electrical circuits.",
    "category": "other"
  },
  {
    "name": "Resistor Calculator",
    "slug": "resistor-calculator",
    "description": "Decode resistor color bands and calculate parallel and series resistance values.",
    "category": "other"
  },
  {
    "name": "Shoe Size Converter",
    "slug": "shoe-size-converter",
    "description": "Convert shoe sizes between US, UK, EU, and CM for men, women, and children's footwear.",
    "category": "other"
  },
  {
    "name": "Mileage Calculator",
    "slug": "mileage-calculator",
    "description": "Calculate driving distance and mileage reimbursement for business travel expenses.",
    "category": "other"
  },
  {
    "name": "Speed Calculator",
    "slug": "speed-calculator",
    "description": "Calculate speed, distance, or time using the formula speed = distance / time.",
    "category": "other"
  },
  {
    "name": "Density Calculator",
    "slug": "density-calculator",
    "description": "Calculate density, mass, or volume using the formula density = mass / volume for materials.",
    "category": "other"
  },
  {
    "name": "Mass Calculator",
    "slug": "mass-calculator",
    "description": "Calculate mass from density and volume or convert between mass units for science projects.",
    "category": "other"
  },
  {
    "name": "Weight Calculator",
    "slug": "weight-calculator",
    "description": "Convert between weight units including pounds, kilograms, ounces, grams, and stones.",
    "category": "other"
  },
  {
    "name": "Molarity Calculator",
    "slug": "molarity-calculator",
    "description": "Calculate molar concentration, moles, or volume for chemistry solutions and dilutions.",
    "category": "other"
  },
  {
    "name": "Molecular Weight Calculator",
    "slug": "molecular-weight-calculator",
    "description": "Calculate the molecular weight of chemical compounds from their molecular formulas.",
    "category": "other"
  },
  {
    "name": "Roman Numeral Converter",
    "slug": "roman-numeral-converter",
    "description": "Convert between Arabic numbers and Roman numerals for dates, outlines, and clock faces.",
    "category": "other"
  },
  {
    "name": "Golf Handicap Calculator",
    "slug": "golf-handicap-calculator",
    "description": "Calculate your golf handicap index using recent scores, course rating, and slope rating.",
    "category": "other"
  },
  {
    "name": "Tire Size Calculator",
    "slug": "tire-size-calculator",
    "description": "Compare tire sizes and calculate diameter, width, sidewall, circumference, and speedometer error.",
    "category": "other"
  },
  {
    "name": "Roofing Calculator",
    "slug": "roofing-calculator",
    "description": "Calculate roofing squares, shingles, and materials needed based on roof dimensions and pitch.",
    "category": "other"
  },
  {
    "name": "Tile Calculator",
    "slug": "tile-calculator",
    "description": "Calculate how many tiles you need for floors or walls including waste and grout coverage.",
    "category": "other"
  },
  {
    "name": "Mulch Calculator",
    "slug": "mulch-calculator",
    "description": "Calculate cubic yards of mulch needed for landscaping beds based on area and depth.",
    "category": "other"
  },
  {
    "name": "Gravel Calculator",
    "slug": "gravel-calculator",
    "description": "Calculate tons or cubic yards of gravel, stone, or aggregate for driveways and landscaping.",
    "category": "other"
  },
  {
    "name": "Wind Chill Calculator",
    "slug": "wind-chill-calculator",
    "description": "Calculate wind chill temperature based on actual temperature and wind speed for cold weather safety.",
    "category": "other"
  },
  {
    "name": "Heat Index Calculator",
    "slug": "heat-index-calculator",
    "description": "Calculate how hot it feels based on temperature and humidity to assess heat-related health risks.",
    "category": "other"
  },
  {
    "name": "Dew Point Calculator",
    "slug": "dew-point-calculator",
    "description": "Calculate dew point temperature from air temperature and relative humidity for weather and HVAC.",
    "category": "other"
  },
  {
    "name": "Bandwidth Calculator",
    "slug": "bandwidth-calculator",
    "description": "Calculate download times, data transfer rates, and bandwidth requirements for files and streaming.",
    "category": "other"
  },
  {
    "name": "Time Duration Calculator",
    "slug": "time-duration-calculator",
    "description": "Calculate the duration between two times or dates in hours, minutes, days, and weeks.",
    "category": "other"
  },
  {
    "name": "Day Counter",
    "slug": "day-counter",
    "description": "Count the number of days between two dates including or excluding weekends and holidays.",
    "category": "other"
  },
  {
    "name": "Day of Week Calculator",
    "slug": "day-of-week-calculator",
    "description": "Find what day of the week any date falls on for past, present, or future dates.",
    "category": "other"
  },
  {
    "name": "Stair Calculator",
    "slug": "stair-calculator",
    "description": "Calculate stair dimensions including rise, run, number of steps, and stringer length for building.",
    "category": "other"
  },
  {
    "name": "Paint Calculator",
    "slug": "paint-calculator",
    "description": "Calculate how many gallons of paint you need based on wall area, doors, windows, and coats.",
    "category": "other"
  },
  {
    "name": "Drywall Calculator",
    "slug": "drywall-calculator",
    "description": "Calculate drywall sheets needed for walls and ceilings including waste allowance and joint compound.",
    "category": "other"
  },
  {
    "name": "Carpet Calculator",
    "slug": "carpet-calculator",
    "description": "Calculate square yards of carpet needed for rooms including seams, pattern matching, and waste.",
    "category": "other"
  },
  {
    "name": "Lumber Calculator",
    "slug": "lumber-calculator",
    "description": "Calculate board feet, linear feet, and lumber costs for construction and woodworking projects.",
    "category": "other"
  },
  {
    "name": "Week Number Calculator",
    "slug": "week-number-calculator",
    "description": "Find the ISO week number for any date and convert between week numbers and calendar dates.",
    "category": "other"
  },
  {
    "name": "Countdown Calculator",
    "slug": "countdown-calculator",
    "description": "Count down days, hours, and minutes until a special event, birthday, or deadline.",
    "category": "other"
  },
  {
    "name": "Split Bill Calculator",
    "slug": "split-bill-calculator",
    "description": "Split restaurant bills equally or by item among friends including tax and tip calculations.",
    "category": "other"
  },
  {
    "name": "Length Converter",
    "slug": "length-converter",
    "description": "Convert between inches, feet, yards, miles, centimeters, meters, and kilometers instantly.",
    "category": "other"
  },
  {
    "name": "Weight Converter",
    "slug": "weight-converter",
    "description": "Convert between ounces, pounds, tons, grams, kilograms, and stones for cooking and shipping.",
    "category": "other"
  },
  {
    "name": "Temperature Converter",
    "slug": "temperature-converter",
    "description": "Convert between Fahrenheit, Celsius, and Kelvin for weather, cooking, and science.",
    "category": "other"
  },
  {
    "name": "Volume Converter",
    "slug": "volume-converter",
    "description": "Convert between gallons, liters, cups, tablespoons, milliliters, and fluid ounces.",
    "category": "other"
  },
  {
    "name": "Area Converter",
    "slug": "area-converter",
    "description": "Convert between square feet, square meters, acres, hectares, and square yards.",
    "category": "other"
  },
  {
    "name": "Pressure Converter",
    "slug": "pressure-converter",
    "description": "Convert between PSI, bar, pascal, atmospheres, and mmHg for tires, weather, and science.",
    "category": "other"
  },
  {
    "name": "Energy Converter",
    "slug": "energy-converter",
    "description": "Convert between joules, calories, BTU, kilowatt-hours, and electronvolts for physics.",
    "category": "other"
  },
  {
    "name": "Power Converter",
    "slug": "power-converter",
    "description": "Convert between watts, kilowatts, horsepower, and BTU/hour for electrical and mechanical power.",
    "category": "other"
  },
  {
    "name": "Speed Converter",
    "slug": "speed-converter",
    "description": "Convert between mph, km/h, meters per second, knots, and Mach number for vehicles and wind.",
    "category": "other"
  },
  {
    "name": "Paycheck Calculator",
    "slug": "paycheck-calculator",
    "description": "Calculate your take-home pay from gross salary after taxes, deductions, and withholdings.",
    "category": "financial"
  },
  {
    "name": "Tax Calculator",
    "slug": "tax-calculator",
    "description": "Estimate federal and state income taxes based on income, filing status, and deductions.",
    "category": "financial"
  }
];

export const categories = [
  { id: "math", name: "Math Calculators", description: "Basic and advanced mathematical calculations", icon: "📐" },
  { id: "financial", name: "Financial Calculators", description: "Loan, mortgage, investment, and salary calculations", icon: "💰" },
  { id: "health", name: "Fitness & Health Calculators", description: "BMI, calorie, and body composition calculations", icon: "❤️" },
  { id: "other", name: "Other Calculators", description: "Date, time, age, and conversion tools", icon: "🔧" },
];

export function getCalculatorsByCategory(category: string): Calculator[] {
  return calculators.filter((calc) => calc.category === category);
}

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find((calc) => calc.slug === slug);
}
