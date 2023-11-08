import axiosInstance from '../config/AxiosConfig';

export async function getAllOffices() {
    try {
        const response = await axiosInstance.get(`/offices`);
        return response.data;
    } catch (error) {
        throw error;
    }
}