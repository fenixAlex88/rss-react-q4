import Button from './UI/Button';
import Input from './UI/Input';
import LimitSelect from './LimitSelect';
import { useSearch, useSearchDispatch } from '../context/SearchContext';

interface SearchProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
const Search: React.FC<SearchProps> = ({ handleSubmit }) => {
  const { searchValue, perPage } = useSearch();
  const { setSearchValue, setPerPage } = useSearchDispatch();
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
