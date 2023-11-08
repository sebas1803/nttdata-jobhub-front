import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // SOLO POR PRUEBAS SE COLOCA ACA, NORMALMENTE ESTA RESGUARDADO
});

const getAccessToken = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
        return `Bearer ${token}`;
    }
    return null;
};

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers.Authorization = accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;