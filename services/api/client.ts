import axios from 'axios';
import { ENV } from '@/config/env';
import { requestInterceptor, responseInterceptor } from './interceptors';

const api = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Add interceptors
api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(
  responseInterceptor.success,
  responseInterceptor.error
);

export default api; 