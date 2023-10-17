import { useParams } from 'react-router-dom';
import { IAnimal } from '../models/IAnimal';
import { ReactEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IOneAnimalProps {
  id: number;
}

export const OneAnimal = () => {
  const { id } = useParams();
  const [currentAnimal, setCurrentAnimal] = useState<IAnimal | null>(null);

  useEffect(() => {
    const dataInLocalStorage: string | null = localStorage.getItem('allAnimals');

    if (dataInLocalStorage !== null && id) {
      const dataInLocalStorageParsed: IAnimal[] = JSON.parse(dataInLocalStorage);

      const foundAnimalById = dataInLocalStorageParsed.find((animal) => animal.id === Number(id));

      if (foundAnimalById) {
        setCurrentAnimal(foundAnimalById);
      } else console.log('Error retrieving animal by ID.');
    }
  }, []);

  const handleClick = () => {
    console.log('Button to feed pressed.');
    let animalIndex;
    const now = new Date();

    let updatedCurrentAnimal: IAnimal = {
      id: 0,
      imageUrl: '',
      isFed: false,
      lastFed: '',
      latinName: '',
      longDescription: '',
      medicine: '',
      name: '',
      shortDescription: '',
      yearOfBirth: 0,
    };

    updatedCurrentAnimal = { ...currentAnimal!, isFed: true, lastFed: now.toISOString() };
    setCurrentAnimal(updatedCurrentAnimal);

    const dataInLocalStorage: string | null = localStorage.getItem('allAnimals');

    if (dataInLocalStorage) {
      const dataInLocalStorageParsed: IAnimal[] = JSON.parse(dataInLocalStorage);

      dataInLocalStorageParsed.find((animal, i) => {
        if (animal.id === currentAnimal!.id) {
          animalIndex = i;
        }
      });

      const newAnimalArray = [...dataInLocalStorageParsed!.slice(0, animalIndex!), updatedCurrentAnimal, ...dataInLocalStorageParsed!.slice(animalIndex! + 1)];

      localStorage.removeItem('allAnimals');
      localStorage.setItem('allAnimals', JSON.stringify(newAnimalArray));
    }
  };

  const handleImgError: ReactEventHandler<HTMLImageElement> = (event) => {
    const target = event.target as HTMLImageElement;
    target.src = './images/no-image-available.jpg';
  };

  const navigate = useNavigate();

  const handleGoBackBtnClick = () => {
    navigate('/');
  };

  return (
    <>
      {currentAnimal && (
        <div className='animalInfoWrapper'>
          <h1>{currentAnimal.name}</h1>
          <p>{currentAnimal.shortDescription}</p>
          <img src={currentAnimal.imageUrl} alt={currentAnimal.latinName} width='250' onError={handleImgError} />
          <p>Född: {currentAnimal.yearOfBirth}</p>
          <p>Mediciner: {currentAnimal.medicine}</p>
          <div className={(currentAnimal.isFed ? 'greenFeedingStatus' : 'redFeedingStatus') + ' feedingInfo'}>
            <p>Senast matad: {new Date(currentAnimal.lastFed).toLocaleString('sv-SE')}</p>
            <button className='feedBtn' disabled={currentAnimal.isFed} onClick={handleClick}>
              Mata djur
            </button>
          </div>
          <p>Latinskt namn: {currentAnimal.latinName}</p>
          <p>Fakta: {currentAnimal.longDescription}</p>
          <button className='goBackBtn' onClick={handleGoBackBtnClick}>
            Tillbaka
          </button>
        </div>
      )}
    </>
  );
};
