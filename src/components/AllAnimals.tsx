import { ReactEventHandler, useEffect, useState } from 'react';
import { IAnimal } from '../models/IAnimal';
import { getAllAnimals } from '../services/ApiResponseService';
import { useNavigate } from 'react-router-dom';

export const AllAnimals = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAnimals = async () => {
      const animalsFromLocalStorage = localStorage.getItem('allAnimals');

      if (!animalsFromLocalStorage) {
        try {
          const animalsFromApi: IAnimal[] | undefined = await getAllAnimals();
          if (animalsFromApi) {
            const allAnimals = JSON.stringify(animalsFromApi);
            localStorage.setItem('allAnimals', allAnimals);
            setAnimals(animalsFromApi);
          }
        } catch (error) {
          console.log('Error getting data from API:', error);
        }
      } else {
        const allAnimals = JSON.parse(animalsFromLocalStorage);
        setAnimals(allAnimals);
      }
    };
    getAnimals();
  }, []);

  const handleImgError: ReactEventHandler<HTMLImageElement> = (event) => {
    const target = event.target as HTMLImageElement;
    target.src = './../src/images/no-image-available.jpg';
  };

  const handleClick = (id: number) => {
    navigate(`/animals/${id}`);
  };

  return (
    <>
      <h1 className='pageTitle'>The Zoo</h1>
      <div className='allAnimalsWrapper'>
        {animals.map((oneAnimal) => (
          <div className={(oneAnimal.isFed ? 'greenFeedingStatus' : 'redFeedingStatus') + ' oneAnimalWrapper'} key={oneAnimal.id} onClick={() => handleClick(oneAnimal.id)}>
            <h2>{oneAnimal.name}</h2>
            <p>{oneAnimal.shortDescription}</p>
            <img src={oneAnimal.imageUrl} alt={oneAnimal.latinName} width='250' onError={handleImgError} />
          </div>
        ))}
      </div>
    </>
  );
};
