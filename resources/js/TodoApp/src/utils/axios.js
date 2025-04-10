import axios from 'axios';
import { getDecryptedCookie } from '../utils/cookieUtils';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const data = getDecryptedCookie('data');

    if (data && data.token) 
    {
      config.headers.Authorization = `Bearer ${data.token}`;
    }
  return config;
});

export default instance;
