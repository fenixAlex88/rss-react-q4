import { useState } from 'react';

import './Search.css';
import Button from '../UI/Button';
import Input from '../UI/Input';

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
        <Input
          type="text"
          className="search-input"
          placeholder="Search by people"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" className="search-button">
          Search
        </Button>
      </form>
    </div>
  );
};

export default Search;
