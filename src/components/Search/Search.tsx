import { useState } from 'react';

import './Search.css';

interface SearchProps {
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    searchQuery: string
  ) => void;
}

const Search: React.FC<SearchProps> = ({ handleSubmit }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  return (
    <div className="search">
      <h1 className="search-title">Search by Star Wars characters</h1>
      <form
        className="search-form"
        onSubmit={(e) => handleSubmit(e, searchQuery)}
      >
        <input
          type="text"
          className="search-input"
          placeholder="Search by people"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
