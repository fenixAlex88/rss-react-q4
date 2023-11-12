import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ErrorComponent from './components/ErrorComponent';
import App from './App';

describe('Error page', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    const routes = [
      {
        path: '/wrong-route',
        element: <App />,
        errorElement: <ErrorComponent />,
      },
    ];

    const router = createMemoryRouter(routes);

    render(
        <RouterProvider router={router} />
    );

    expect(
      await screen.getByText('Something went wrong...')
    ).toBeInTheDocument();
  });
});
