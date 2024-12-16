import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';

// 1
export const fetchTheatres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/theatres`);
    return response.data;
  } catch (error) {
    console.error('Error fetching theatres:', error);
    throw error;
  }
};

// 2
export const fetchSpectaclesByBorough = async (borough) => {
  try {
    const response = await axios.get(`${BASE_URL}/spectacles/${borough}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching spectacles:', error);
    throw error;
  }
};

// 3
export const fetchSallesByBorough = async (borough) => {
  try {
    const response = await axios.get(`${BASE_URL}/salles/${borough}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching spectacles:', error);
    throw error;
  }
};

// 4
export const fetchSpectaclesByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/spectacles-en-cours/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching spectacles:', error);
    throw error;
  }
};

// 5
export const fetchSpectacleCounts = async () => {
  try {
  const response = await axios.get(`${BASE_URL}/nb-spectacles`); 
  return response.data;
} catch (error) {
  console.error('Error fetching spectacles:', error);
  throw error;
}
};

// 6
export const fetchSpectacleDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/spectacle/${id}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching spectacle details:', err);
    throw err;
  }
};