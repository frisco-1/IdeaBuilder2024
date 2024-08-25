import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const query = useQuery().get('query');
  const [results, setResults] = useState<{ id: number; name: string; }[]>([]);

  useEffect(() => {
    if (query) {
      // Fetch search results based on the query
      fetch(`/api/search?query=${query}`)
        .then(response => response.json())
        .then(data => setResults(data));
    }
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;