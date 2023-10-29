import React, { Component } from 'react';
import './App.css';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import Pagination from './components/Pagination/Pagination';
import { IPerson } from './interfaces/IPerson';

interface SearchState {
  query: string;
  results: IPerson[];
  error: string;
  page: number;
  total: number;
  loading: boolean;
}

interface SearchProps {}

class App extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);

    this.state = {
      query: localStorage.getItem('search') || '',
      results: [],
      error: '',
      page: 1,
      total: 0,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchPeople = this.fetchPeople.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const value: string = event.target.value;
    this.setState({
      query: value,
      page: 1,
    });
  }

  handlePageChange(event: React.MouseEvent<HTMLButtonElement>): void {
    const page = Number(event.currentTarget.dataset.page);
    this.setState({ page }, this.fetchPeople);
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    this.fetchPeople();
  }

  async fetchPeople(): Promise<void> {
    try {
      this.setState({ loading: true });
      const response = await fetch(
        `https://swapi.dev/api/people/?${
          this.state.query && `search=${this.state.query.trim()}&`
        }page=${this.state.page}`
      );
      const { results, count }: { results: IPerson[]; count: number } =
        await response.json();
      this.setState({
        results: results,
        error: '',
        total: count,
      });
      localStorage.setItem('search', this.state.query);
    } catch (error) {
      this.setState({
        results: [],
        error: error instanceof Error ? error.message : 'Unexpected error',
        total: 0,
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidMount(): void {
    this.fetchPeople();
  }

  componentDidUpdate(): void {
    if (this.state.page < 0) throw new Error('Test error');
  }

  render() {
    return (
      <div className="container">
        <Search
          query={this.state.query}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <hr />
        {this.state.loading ? (
          <div className="loader" />
        ) : (
          <CardList results={this.state.results} error={this.state.error} />
        )}
        <Pagination
          currentPage={this.state.page}
          total={this.state.total}
          handlePageChange={this.handlePageChange}
        />
        <button
          type="button"
          onClick={() => {
            this.setState({ page: -1 });
          }}
          className="error-button"
        >
          Create an error
        </button>
      </div>
    );
  }
}

export default App;
