import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import RootLayout from '../layouts/RootLayout';
import ErrorComponent from '../components/ErrorComponent';
import CharacterDetails from '../components/CharacterDetails';
import { fetchPersonByID } from '../services/fetchData.service';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorComponent />}>
      <Route
        path="/:id"
        element={<CharacterDetails />}
        loader={async ({ params }) => {
          const data: CharacterDetails = await fetchPersonByID(
            params.id as string
          );
          return data;
        }}
      />
    </Route>
  )
);

export default router;
