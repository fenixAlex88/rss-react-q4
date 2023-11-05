import { useState } from 'react';

import Button from './UI/Button';
import Input from './UI/Input';

interface SearchProps {
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    searchQuery: string
  ) => void;
}

const Search: React.FC<SearchProps> = ({ handleSubmit }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  return (
    <div className="mx-0 my-5">
      <h1 className="text-center text-gray-800 mb-4 font-bold text-3xl">
        Search by Star Wars characters
      </h1>
      <form
        className="flex items-center justify-center"
        onSubmit={(e) => handleSubmit(e, searchQuery)}
      >
        <Input
          type="text"
          placeholder="Search by people"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
};

export default Search;
