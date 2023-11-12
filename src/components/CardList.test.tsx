import { describe, expect, it } from 'vitest';
import CardList from './CardList';
import {
  PersonsContext,
  } from '../context/PersonsContext';
import { SearchContext } from '../context/SearchContext';
import { render, screen } from '@testing-library/react';
import { mockPersons } from './mockPersons';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

// Test cases
describe('CardList component', () => {
  it('renders the specified number of cards', () => {
    // Render the component with 10 cards per page and current page 1
   const routes = [
     {
       path: '/',
       element: (
         <PersonsContext.Provider value={{ results: mockPersons, count: 10 }}>
           <SearchContext.Provider value={{ searchValue: '', perPage: '10' }}>
             <CardList currentPage={1} />
           </SearchContext.Provider>
         </PersonsContext.Provider>
       ),
     },
   ];
   const router = createMemoryRouter(routes, {
     initialEntries: ['/'],
   });

    render(<RouterProvider router={router} />);
   
    const cards: HTMLElement[] = screen.getAllByRole('link');
    expect(cards).toHaveLength(10);

    // Expect to find the names of the first 5 persons on the cards
    expect(screen.getByText('Luke Skywalker')).toHaveTextContent(
      'Luke Skywalker'
    );
    expect(screen.getByText('C-3PO')).toHaveTextContent('C-3PO');
    expect(screen.getByText('R2-D2')).toHaveTextContent('R2-D2');
    expect(screen.getByText('Darth Vader')).toHaveTextContent('Darth Vader');
    expect(screen.getByText('Leia Organa')).toHaveTextContent('Leia Organa');
  });

  it('renders the appropriate message if there are no cards', () => {
    // Render the component with an empty array of persons
    const routes = [
      {
        path: '/',
        element: (
          <PersonsContext.Provider value={{ results: [], count: 0 }}>
            <SearchContext.Provider value={{ searchValue: '', perPage: '10' }}>
              <CardList currentPage={1} />
            </SearchContext.Provider>
          </PersonsContext.Provider>
        ),
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

   render(<RouterProvider router={router} />);

    // Expect to find the message "No results" on the screen
    const message = screen.getByText('No results');
    expect(message).toHaveTextContent('No results');
  });
});
