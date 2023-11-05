import Button from './UI/Button';
import Input from './UI/Input';

interface SearchProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
const Search: React.FC<SearchProps> = ({
  searchValue,
  setSearchValue,
  handleSubmit,
}) => {
  return (
    <div className="mx-0 my-5">
      <h1 className="text-center text-gray-800 mb-4 font-bold text-3xl">
        Search by Star Wars characters
      </h1>
      <form
        className="flex items-center justify-center"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder="Search by people"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
};

export default Search;
