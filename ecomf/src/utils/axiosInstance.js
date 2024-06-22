import axios from 'axios';
import { store } from './store';
import { logout } from './redux/actions/userActions';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Update to your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { userLogin: { userInfo } } = store.getState();
    if (userInfo && userInfo.tokens) {
      config.headers.Authorization = `Bearer ${userInfo.tokens.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const { dispatch } = store;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { userLogin: { userInfo } } = store.getState();
      if (userInfo && userInfo.tokens) {
        console.log('Access Token:', userInfo.tokens.access);
        try {
          const response = await axios.post(`${axiosInstance.defaults.baseURL}/api/token/refresh/`, {
            refresh: userInfo.tokens.refresh,
          });
          console.log('Token refreshed successfully');
          userInfo.tokens = response.data;
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${userInfo.tokens.access}`;
          originalRequest.headers['Authorization'] = `Bearer ${userInfo.tokens.access}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          console.error('Error refreshing token:', err);
          dispatch(logout());
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
