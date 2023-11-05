import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import RootLayout from '../layouts/RootLayout';
import Home, { personsLoader } from '../pages/Home';
import ErrorComponent from '../components/ErrorComponent';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      loader={personsLoader}
      errorElement={<ErrorComponent />}
    >
      <Route path=":id" element={<CharacterDetails>} />
    </Route>
  )
);

export default router;
