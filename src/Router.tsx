import { createBrowserRouter } from 'react-router-dom';
import { Home } from './components/Home';
import { AllAnimals } from './components/AllAnimals';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: '/animals',
    element: <AllAnimals></AllAnimals>,
  },
]);
