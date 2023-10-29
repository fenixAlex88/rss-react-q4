import React from 'react';
import './Search.css';

interface SearchProps {
  query: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

class Search extends React.Component<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
  }

  render() {
    return (
      <div className="search">
        <h1 className="search-title">Search by Star Wars characters</h1>
        <form className="search-form" onSubmit={this.props.handleSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search by people"
            value={this.props.query}
            onChange={this.props.handleChange}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
