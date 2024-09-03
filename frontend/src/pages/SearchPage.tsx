import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';

// Custom hook to parse the query parameter from the URL
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

// Define the structure of your search result items
interface SearchResult {
  name: string;
  code: string;
  collection: string;
  // Add other relevant fields if needed
}

const SearchPage = () => {
  const query = useQuery().get('query');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      // Fetch search results from the API
      fetch(`/api/search?query=${query}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => setResults(data))
        .catch(err => {
          console.error('Error fetching search results:', err);
          setError('Failed to fetch search results. Please try again later.');
        });
    }
  }, [query]);

  return (
    <div>
      <Container>
        <h1>Search Results for "{query}"</h1>
        {error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <h3>{result.name}</h3>
                <p>Code: {result.code}</p>
                <p>Collection: {result.collection}</p>
                <Link to={`/product/${result.collection}/${result.code}`}>
                  View Product
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
};

export default SearchPage;