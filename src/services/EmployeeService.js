import axiosInstance from '../config/AxiosConfig';

export async function getAllEmployees() {
    try {
        const response = await axiosInstance.get(`/employees`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getEmployeeById(employeeId) {
    try {
        const response = await axiosInstance.get(`/employees/${employeeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateEmployee(employeeId, employeeData) {
    try {
        const response = await axiosInstance.patch(`/employees/${employeeId}`, employeeData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteEmployee(employeeId) {
    try {
        const response = await axiosInstance.delete(`/employees/${employeeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}