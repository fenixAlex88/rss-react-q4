import { BASE_URL } from '../config/api.config';
import { IPerson } from '../interfaces/IPerson';

export interface ApiResponse {
  count: number;
  results: IPerson[];
  next: string;
  previous: string;
}

export const fetchPeoples = async (query: string, page: number) => {
  const URL = `${BASE_URL}/?${query && `search=${query.trim()}&`}page=${page}`;
  try {
    const response = await fetchDataFromApi(URL);
    return response;
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};

const fetchDataFromApi = async (url: string): Promise<ApiResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
