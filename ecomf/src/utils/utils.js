import axios from 'axios';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post('/api/token/refresh/', { refresh: refreshToken });
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Handle the error accordingly, possibly redirecting to login
    throw error;
  }
};

export const admin_email = "chidisolomon80@gmail.com"