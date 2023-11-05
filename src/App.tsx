import { RouterProvider } from 'react-router-dom';

import router from './router/router';

const App: React.FC = () => {
  return (
    <div className="max-w-[1100px] mx-auto my-0 p-5">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
