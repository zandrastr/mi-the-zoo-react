import { createBrowserRouter } from 'react-router-dom';
import { AllAnimals } from './components/AllAnimals';
import { OneAnimal } from './components/OneAnimal';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AllAnimals></AllAnimals>,
  },
  {
    path: '/animals/:id',
    element: <OneAnimal></OneAnimal>,
  },
]);
