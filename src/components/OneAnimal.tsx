import { useParams } from 'react-router-dom';
import { IAnimal } from '../models/IAnimal';
import { useEffect, useState } from 'react';

export interface IOneAnimalProps {
  id: number;
}

export const OneAnimal = () => {
  const { id } = useParams();
  const [currentAnimal, setCurrentAnimal] = useState<IAnimal | null>(null);

  useEffect(() => {
    const dataInLocalStorage: string | null = localStorage.getItem('allAnimals');

    if (dataInLocalStorage !== null) {
      const dataInLocalStorageParsed: IAnimal[] = JSON.parse(dataInLocalStorage);

      const foundAnimalById = dataInLocalStorageParsed.find((animal) => animal.id === Number(id));

      if (foundAnimalById) {
        console.log('Found animal by ID:', foundAnimalById.id);
        setCurrentAnimal(foundAnimalById);
      } else console.log('Error retrieving animal by ID.');
    }
  }, [id]);

  return (
    <>
      {currentAnimal && (
        <div>
          <h1>{currentAnimal.name}</h1>
          <p>{currentAnimal.shortDescription}</p>
          <img src={currentAnimal.imageUrl} alt={currentAnimal.latinName} width='250'></img>
          <p>Född: {currentAnimal.yearOfBirth}</p>
          <p>Mediciner: {currentAnimal.medicine}</p>
          <p>Senast matad: {currentAnimal.lastFed}</p>
          <p>Latinskt namn: {currentAnimal.latinName}</p>
          <p>Fakta: {currentAnimal.longDescription}</p>
        </div>
      )}
    </>
  );
};
