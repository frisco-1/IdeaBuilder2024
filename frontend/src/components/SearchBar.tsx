import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import SearchResultsDropdown from "./SearchResultsDropdown";
import { useDebounce } from "../hooks/useDebounce";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [recent, setRecent] = useState<string[]>([]);
  const [open, setOpen] = useState(false); // ⭐ dropdown visibility

  const wrapperRef = useRef<HTMLDivElement>(null);

  function loadRecentSearches() {
    const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecent(stored);
  }

  function saveRecentSearch(term: string) {
    if (!term.trim()) return;

    const existing = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    const filtered = existing.filter((item: string) => item !== term);
    const updated = [term, ...filtered].slice(0, 5);

    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setRecent(updated);
  }

  // Fetch search results
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    const backend = import.meta.env.VITE_BACKEND_BASE_URL_TWO;

    axios
      .get(`${backend}/search`, { params: { query: debouncedQuery } })
      .then((res) => setResults(res.data))
      .catch((err) => console.error("Search error:", err))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  // ⭐ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelectResult(result: { name: string; url: string }) {
    saveRecentSearch(result.name);
    setOpen(false);
    window.location.href = result.url;
  }

  function handleSelectRecent(term: string) {
    setQuery(term);
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="flex items-center rounded-full bg-gray-100 px-4 py-2">
        <FaSearch className="text-gray-500 mr-2 text-sm" />

        <input
          type="search"
          placeholder="Search for t-shirts, hoodies, business cards, and more"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            loadRecentSearches();
            setOpen(true); // ⭐ open dropdown on focus
          }}
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
        />
      </div>

      {/* ⭐ Only show dropdown when open */}
      {open && (
        <SearchResultsDropdown
          loading={loading}
          results={results}
          query={query}
          recent={recent}
          onSelectResult={handleSelectResult}
          onSelectRecent={handleSelectRecent}
        />
      )}
    </div>
  );
}