// components/SearchBar.tsx
import { useState, useEffect } from "react";
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

  
  function loadRecentSearches() {
    const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecent(stored);
  }

  //removes duplicates, adds new search, saves last 5, updates local storage
  function saveRecentSearch(term: string) {
    if (!term.trim()) return;

    const existing = JSON.parse(localStorage.getItem("recentSearches") || "[]");

    // Remove duplicates
    const filtered = existing.filter((item: string) => item !== term);

    // Add new term at the top
    const updated = [term, ...filtered].slice(0, 5);

    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setRecent(updated);
  }

//Fetching results from backend
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

 //handles selecting result from search
  function handleSelectResult(result: { name: string; url: string }) {
    saveRecentSearch(result.name);
    window.location.href = result.url;
  }

  //selecting recent search term
  function handleSelectRecent(term: string) {
    setQuery(term);
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center rounded-full bg-gray-100 px-4 py-2">
        <FaSearch className="text-gray-500 mr-2 text-sm" />

        <input
          type="search"
          placeholder="Search for t-shirts, hoodies, business cards, and more"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={loadRecentSearches}   
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
        />
      </div>

      <SearchResultsDropdown
        loading={loading}
        results={results}
        query={query}
        recent={recent}                     
        onSelectResult={handleSelectResult} 
        onSelectRecent={handleSelectRecent} 
      />
    </div>
  );
}