import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${query}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center rounded-full bg-gray-100 px-4 py-2 shrink"
    >
      <FaSearch className="text-gray-500 mr-2 text-sm" />
      <input
        type="search"
        placeholder="Search for t-shirts, hoodies, business cards, and more"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
      />
    </form>
  );
}