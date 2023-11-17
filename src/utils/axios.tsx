import axios from 'axios';
import { config } from '../utils/config';
import { AxiosInstance } from 'axios';


const axiosInstance: AxiosInstance = axios.create({
    baseURL: config.API_URL,
});


axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

export default axiosInstance;
