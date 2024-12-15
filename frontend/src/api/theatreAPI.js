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

export const fetchSpectaclesByBorough = async (borough) => {
  try {
    const response = await axios.get(`${BASE_URL}/spectacles/${borough}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching spectacles:', error);
    throw error;
  }
};

export const fetchSallesByBorough = async (borough) => {
  try {
    const response = await axios.get(`${BASE_URL}/salles/${borough}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching spectacles:', error);
    throw error;
  }
};

export const fetchSpectaclesByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/spectacles-en-cours/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching spectacles:', error);
    throw error;
  }
};