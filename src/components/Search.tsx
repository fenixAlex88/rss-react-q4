import Button from './UI/Button';
import Input from './UI/Input';
import LimitSelect from './LimitSelect';

interface SearchProps {
  searchValue: string;
  perPage: string;
  setPerPage: (value: string) => void;
  setSearchValue: (value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
const Search: React.FC<SearchProps> = ({
  searchValue,
  setSearchValue,
  handleSubmit,
  perPage,
  setPerPage,
}) => {
  const values = ['5', '10'];
  return (
    <div className="mx-0 my-5">
      <h1 className="text-center text-gray-800 mb-4 font-bold text-3xl">
        Search by Star Wars characters
      </h1>
      <form
        className="max-w-2xl mx-auto flex items-center justify-between"
        onSubmit={handleSubmit}
      >
        <div>
          <Input
          type="text"
          placeholder="Search by people"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button type="submit">Search</Button>
        </div>
        
        <LimitSelect
          perPage={perPage}
          onSelect={(e) => setPerPage(e.target.value)}
          values={values}
        />
      </form>
    </div>
  );
};

export default Search;
