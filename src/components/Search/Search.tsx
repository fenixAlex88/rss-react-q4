import './Search.css';

interface SearchProps {
  query: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Search: React.FC<SearchProps> = ({
  query,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="search">
      <h1 className="search-title">Search by Star Wars characters</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search by people"
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
