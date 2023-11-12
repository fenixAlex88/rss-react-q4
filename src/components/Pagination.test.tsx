import { userEvent } from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Pagination from './Pagination';
import { SearchContext } from '../context/SearchContext';
import { PersonsContext } from '../context/PersonsContext';

describe('Pagination', () => {
  userEvent.setup();

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
      const secondButton = screen.getByText('2');

      await act(async () => {
        await userEvent.click(secondButton);
      });

      expect(location.search).toBe(`?page=2`);
    });
  });
});
