import { useEffect, useState } from 'react';
import { IAnimal } from '../models/IAnimal';
import { getAllAnimals } from '../services/ApiResponseService';

export const AllAnimals = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  useEffect(() => {
    const getAnimals = async () => {
      try {
        const allAnimalsData: IAnimal[] | undefined = await getAllAnimals();
        if (allAnimalsData) {
          setAnimals(allAnimalsData);
        }
      } catch (error) {
        console.log('Error getting data from API:', error);
      }
    };
    getAnimals();
  }, []);

  const animalsArrayToString = JSON.stringify(animals);
  localStorage.setItem('allAnimals', animalsArrayToString);

  return (
    <>
      <h1>Alla djur</h1>
      {animals.map((oneAnimal) => (
        <div key={oneAnimal.id}>
          <h2>{oneAnimal.name}</h2>
          <img src={oneAnimal.imageUrl} alt={oneAnimal.shortDescription} width='250' />
        </div>
      ))}
    </>
  );
};
