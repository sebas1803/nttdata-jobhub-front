import axiosInstance from '../config/AxiosConfig';

export async function loginEmployee(loginData) {
    try {
        const response = await axiosInstance.post(`/auth/login`, loginData);
        return response.data;
    } catch (error) {
        throw error;
    }
}