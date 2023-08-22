import axios from "axios";
import { IAnimal } from "../models/IAnimal";

export const getAllAnimals = async () => {
    try {
      const response = await axios.get<IAnimal[]>('https://animals.azurewebsites.net/api/animals');
      console.log('api response.data =>', response.data);
      return response.data;

    } catch (error) {
      console.log('Error getting data from API:', error);
    }
};