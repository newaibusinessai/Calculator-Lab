import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-8">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Footer links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-4">
          <Link href="/about" className="hover:text-gray-800">
            About
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/site-map" className="hover:text-gray-800">
            Sitemap
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/terms" className="hover:text-gray-800">
            Terms of Use
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/privacy" className="hover:text-gray-800">
            Privacy Policy
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/contact" className="hover:text-gray-800">
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Calculator Lab. All rights reserved.</p>
          <p className="mt-1">
            Free online calculators for math, finance, health, and more.
          </p>
        </div>
      </div>
    </footer>
  );
}
