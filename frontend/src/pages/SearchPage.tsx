import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

// Custom hook to parse the query parameter from the URL
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

// Define the structure of your search result items
interface SearchResult {
  productName: string;
  productLink: string;
}

const SearchPage = () => {
  const query = useQuery().get('query');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      // Fetch search results from the API using axios
      axios.get(`http://localhost:4000/api/search`, { params: { query } })
        .then(response => {
          setResults(response.data);
        })
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
                <h3>{result.productName}</h3>
                <Link to={result.productLink}>
                  View {result.productName}
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