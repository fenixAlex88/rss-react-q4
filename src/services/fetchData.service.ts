import { IPerson } from '../interfaces/IPerson';
import { BASE_URL } from '../config/api.config';

export interface personsResponse {
  count: number;
  results: IPerson[];
  next: string;
  previous: string;
}

export interface response {
  count: number;
  results: [];
  next: string;
  previous: string;
}

export const fetchPersons = async (
  search: string,
  page: string
): Promise<personsResponse> => {
  const URL = `${BASE_URL}/?search=${search.trim()}&page=${page}`;
  try {
    const response = await fetchDataFromApi(URL);
    return response;
  } catch (error) {
    throw new Error(`Fetching data error: ${error}`);
  }
};

const fetchDataFromApi = async (url: string): Promise<response> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response error');
  }
  return response.json();
};
