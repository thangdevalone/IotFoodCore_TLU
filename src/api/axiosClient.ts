import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { STATIC_HOST } from '../constants/common';

const axiosClient = axios.create({
    baseURL: `${STATIC_HOST}`,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add a request interceptor
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response: { data: any; }) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error: { response: { data: any; }; }) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error.response.data);
    }
);

export default axiosClient;