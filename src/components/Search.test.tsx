import { fireEvent, render, screen } from '@testing-library/react';
import Search from './Search';
import SearchProvider from '../context/SearchContext';
import PersonsProvider from '../context/PersonsContext';
import Home from '../pages/Home';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

describe('Search Component', () => {
  it('should render component', async () => {
    render(
      <SearchProvider>
        <PersonsProvider>
          <Search handleSubmit={() => {}} />
        </PersonsProvider>
      </SearchProvider>
    );
    expect(
      await screen.findByPlaceholderText('Search by people')
    ).toBeInTheDocument();
    expect(await screen.findByText('Search')).toBeInTheDocument();
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const routes = [
      {
        path: '/',
        element: (
          <SearchProvider>
            <PersonsProvider value={{}}>
              <Home />
            </PersonsProvider>
          </SearchProvider>
        ),
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    const input = await screen.findByPlaceholderText('Search by people');
    const button = await screen.findByText('Search');

    fireEvent.input(input, {
      target: { value: 'Luke Skywalker' },
    });

    fireEvent.click(button);

    expect(localStorage.getItem('search')).toBe('Luke Skywalker');
  });
  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    localStorage.setItem('search', 'Luke Skywalker');

    const routes = [
      {
        path: '/',
        element: (
          <SearchProvider>
            <PersonsProvider>
              <Home />
            </PersonsProvider>
          </SearchProvider>
        ),
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    const input: HTMLInputElement = await screen.findByPlaceholderText(
      'Search by people'
    );

    expect(input.value).toBe('Luke Skywalker');
  });
});
