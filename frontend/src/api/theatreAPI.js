import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';

export const fetchTheatres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/theatres`);
    return response.data;
  } catch (error) {
    console.error('Error fetching theatres:', error);
    throw error;
  }
};
