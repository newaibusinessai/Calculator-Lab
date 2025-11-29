import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="text-2xl font-bold text-gray-800">
              <span className="text-blue-600">Calculator</span> Lab
            </div>
          </Link>

          {/* Navigation for SEO */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/calculators/math" className="text-gray-600 hover:text-blue-600 transition-colors">
              Math
            </Link>
            <Link href="/calculators/financial" className="text-gray-600 hover:text-blue-600 transition-colors">
              Financial
            </Link>
            <Link href="/calculators/health" className="text-gray-600 hover:text-blue-600 transition-colors">
              Health
            </Link>
            <Link href="/calculators/other" className="text-gray-600 hover:text-blue-600 transition-colors">
              Other
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link href="/search" className="text-gray-600 hover:text-blue-600 transition-colors">
              🔍 Search
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link href="/search" className="text-gray-600 hover:text-blue-600">
              🔍
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        <nav className="md:hidden flex items-center gap-4 pb-3 text-xs overflow-x-auto">
          <Link href="/calculators/math" className="text-gray-600 hover:text-blue-600 whitespace-nowrap">
            📐 Math
          </Link>
          <Link href="/calculators/financial" className="text-gray-600 hover:text-blue-600 whitespace-nowrap">
            💰 Financial
          </Link>
          <Link href="/calculators/health" className="text-gray-600 hover:text-blue-600 whitespace-nowrap">
            ❤️ Health
          </Link>
          <Link href="/calculators/other" className="text-gray-600 hover:text-blue-600 whitespace-nowrap">
            🔧 Other
          </Link>
        </nav>
      </div>
    </header>
  );
}
