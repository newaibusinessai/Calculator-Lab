"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { calculators, categories } from "@/lib/calculators";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const searchTerms = query.toLowerCase().split(" ").filter(term => term.length > 0);

  const results = calculators.filter((calc) => {
    const searchText = `${calc.name} ${calc.description} ${calc.category}`.toLowerCase();
    return searchTerms.every(term => searchText.includes(term));
  });

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || categoryId;
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.icon || "";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Search Results</h1>

      {query && (
        <p className="text-gray-600 mb-6">
          {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
        </p>
      )}

      {!query && (
        <p className="text-gray-600 mb-6">
          Enter a search term to find calculators.
        </p>
      )}

      {/* Search box */}
      <form action="/search" method="GET" className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search calculators..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results */}
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((calc) => (
            <div
              key={calc.slug}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
            >
              <Link
                href={`/calculators/${calc.category}/${calc.slug}`}
                className="block"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getCategoryIcon(calc.category)}</span>
                  <div>
                    <h2 className="text-lg font-semibold text-blue-600 hover:text-blue-800">
                      {calc.name}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">{calc.description}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Category: {getCategoryName(calc.category)}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No calculators found for "{query}"</p>
          <p className="text-gray-400">Try searching for terms like "mortgage", "BMI", "percentage", or "age"</p>
        </div>
      ) : null}

      {/* Popular searches */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Searches</h3>
        <div className="flex flex-wrap gap-2">
          {["mortgage", "loan", "BMI", "percentage", "age", "tip", "compound interest", "calories", "GPA", "time"].map((term) => (
            <Link
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>

      {/* Browse by category */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/calculators/${category.id}`}
              className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">{category.icon}</span>
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Search Results</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
