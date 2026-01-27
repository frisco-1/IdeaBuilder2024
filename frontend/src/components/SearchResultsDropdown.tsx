// components/SearchResultsDropdown.tsx
import { Link } from "react-router-dom";

interface SearchResult {
  type: "category" | "productGroup" | "product";
  name: string;
  url: string;
}

interface Props {
  loading: boolean;
  results: SearchResult[];
  recent: string[];
  query: string;
  onSelectResult: (result: SearchResult) => void;
  onSelectRecent: (term: string) => void;
}

export default function SearchResultsDropdown({
  loading,
  results,
  recent,
  query,
  onSelectResult,
  onSelectRecent
}: Props) {
  // Hide dropdown if nothing to show
  if (!query.trim() && recent.length === 0) return null;

  return (
    <div className="absolute z-50 mt-2 w-full bg-white shadow-lg rounded-lg p-4">
      {/* Loading */}
      {loading && <p className="text-sm text-gray-500">Searching…</p>}

      {/* RECENT SEARCHES */}
      {!loading && !query.trim() && recent.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 mb-1">
            Recent Searches
          </h4>
          <ul className="space-y-1">
            {recent.map((term, i) => (
              <li key={i}>
                <button
                  onClick={() => onSelectRecent(term)}
                  className="text-sm text-gray-700 hover:underline w-full text-left"
                >
                  {term}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* LIVE SEARCH RESULTS */}
      {!loading && query.trim() && results.length > 0 && (
        <div>
          <ul className="space-y-2">
            {results.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.url}
                  onClick={() => onSelectResult(item)}
                  className="text-sm text-blue-600 hover:underline block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* NO RESULTS */}
      {!loading && query.trim() && results.length === 0 && (
        <p className="text-sm text-gray-500">No results found.</p>
      )}
    </div>
  );
}