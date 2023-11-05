import { IPerson } from '../interfaces/IPerson';
import { BASE_URL } from '../config/api.config';

export interface personsResponse {
  count: number;
  results: IPerson[];
  next: string;
  previous: string;
}

export interface personResponse {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: [];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}

export const fetchPersonByID = async (id: string): Promise<personResponse> => {
  const URL = `${BASE_URL}/${id}/`;
  try {
    const response = await fetchData(URL);
    return response;
  } catch (error) {
    throw new Error(`Fetching data error: ${error}`);
  }
};

export const fetchPersons = async (
  search: string,
  page: string
): Promise<personsResponse> => {
  const URL = `${BASE_URL}/?search=${search.trim()}&page=${page}`;
  try {
    const response = await fetchData(URL);
    return response;
  } catch (error) {
    throw new Error(`Fetching data error: ${error}`);
  }
};

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Unknown network error');
  }
  return response.json();
};
