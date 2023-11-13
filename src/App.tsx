import { RouterProvider } from 'react-router-dom';

import SearchProvider from './context/SearchContext';
import PersonsProvider from './context/PersonsContext';
import router from './router/router';

const App: React.FC = () => {
  return (
    <SearchProvider>
      <PersonsProvider>
        <div className="max-w-[1100px] mx-auto my-0 p-5">
          <RouterProvider router={router} />
        </div>
      </PersonsProvider>
    </SearchProvider>
  );
};

export default App;
