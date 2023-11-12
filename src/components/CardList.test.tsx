import { userEvent } from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Pagination from './Pagination';
import { SearchContext } from '../context/SearchContext';
import { PersonsContext } from '../context/PersonsContext';

// use userEvent.setup outside the describe block
userEvent.setup();

describe('Pagination', () => {
  const setPage = vi.fn();

  const routes = [
    {
      path: '/',
      element: (
        <PersonsContext.Provider value={{ results: [], count: 20 }}>
          <SearchContext.Provider value={{ searchValue: '', perPage: '10' }}>
            <Pagination currentPage={1} handlePageChange={setPage} />
          </SearchContext.Provider>
        </PersonsContext.Provider>
      ),
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });

  beforeEach(() => {
    act(() => {
      render(<RouterProvider router={router} />);
    });
  });

  describe('Make sure the component updates URL query parameter when page changes', async () => {
    it('change param', async () => {
      // get the button element by its role and text
      const secondButton = screen.getByRole('button', { name: '2' });

      await act(async () => {
        await userEvent.click(secondButton);
      });

      // use router.location.search to check the URL query parameter
      expect(location.search).toBe(`?page=2`);
    });
  });
});
