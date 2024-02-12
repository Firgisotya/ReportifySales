import axios from "axios";
import { BaseUrl } from "../BaseUrl"
import { getToken } from "../storage/StorageService";

const url = BaseUrl().apiUrl;
const token = getToken()

const getAllCustomers = async () => {
    const response = await axios.get(`${url}/customers`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data;
}

const getCustomerById = async (id) => {
    const response = await axios.get(`${url}/customers/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data;
}

const createCustomer = async (data) => {
    const response = await axios.post(`${url}/customers`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data;
}

const updateCustomer = async (id, data) => {
    const response = await axios.put(`${url}/customers/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data;
}

const deleteCustomer = (id) => {
    const response = axios.delete(`${url}/customers/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data;
}

export {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}