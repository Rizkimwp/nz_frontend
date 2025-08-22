import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://nazeera.my.id/',
});

export default axiosInstance;
