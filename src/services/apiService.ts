const BASE_URL = 'https://swapi.dev/api';

interface Film {
  title: string;
  director: string;
}

interface ApiResponse<T> {
  results: T[];
}

export const fetchFilms = async (searchTerm = ''): Promise<Film[]> => {
  let url = `${BASE_URL}/films/`;

  if (searchTerm.trim() !== '') {
    url += `?search=${encodeURIComponent(searchTerm.trim())}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch films');
    }
    const data: ApiResponse<Film> = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching films:', error);
    return [] as Film[];
  }
};

export const fetchAllFilms = async (): Promise<Film[]> => {
  const url = `${BASE_URL}/films/`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch all films');
    }
    const data: ApiResponse<Film> = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching all films:', error);
    return [] as Film[];
  }
};
