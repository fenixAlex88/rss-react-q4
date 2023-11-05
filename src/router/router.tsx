import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import RootLayout from '../layouts/RootLayut';
import Home, { personsLoader } from '../pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} loader={personsLoader} />
    </Route>
  )
);

export default router;
