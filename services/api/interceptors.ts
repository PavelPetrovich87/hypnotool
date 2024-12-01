import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from '@/types/auth';

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  // We'll add token handling here later
  return config;
};

export const responseInterceptor = {
  success: (response: any) => response.data,
  error: (error: AxiosError<ApiError>) => {
    if (!error.response) {
      // Network error
      throw new Error('Network error - please check your connection');
    }

    // API error with response
    const apiError = error.response.data;
    throw apiError;
  },
}; 