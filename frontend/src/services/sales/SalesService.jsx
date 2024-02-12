import axios from "axios";
import { BaseUrl } from "../BaseUrl"
import { getToken } from "../storage/StorageService";

const url = BaseUrl().apiUrl;
const token = getToken()

const getAllSales = async () => {
    try {
        const response = await axios.get(`${url}/sales`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching sales data: ", error);
    }
}

const createSales = async (sales) => {
    try {
        const response = await axios.post(`${url}/sales`, sales, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error creating sales data: ", error);
    }
}

const updateSales = async (id, sales) => {
    try {
        const response = await axios.put(`${url}/sales/${id}`, sales, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error updating sales data: ", error);
    }
}

const deleteSales = async (id) => {
    try {
        const response = await axios.delete(`${url}/sales/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error deleting sales data: ", error);
    }
}

export { getAllSales, createSales, updateSales, deleteSales };
