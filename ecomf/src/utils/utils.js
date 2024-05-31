import axios from 'axios';

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post('/token/refresh/', { refresh: refreshToken });
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Handle the error accordingly, possibly redirecting to login
    throw error;
  }
};
