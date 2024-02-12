import axios from "axios";
import { BaseUrl } from "../BaseUrl"
import { getToken } from "../storage/StorageService";

const url = BaseUrl().apiUrl;
const token = getToken()

const getAllUsers = async () => {
    const response = await axios.get(url + "/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
}

const createUser = async (user) => {
    const response = await axios.post(url + "/users", user, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
}

const updateUser = async (id, user) => {
    const response = await axios.put(url + "/users/" + id, user, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
}

const updateUserBySales = async (user) => {
    const response = await axios.put(url + "/usersBySales", user, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;

}

const deleteUser = async (id) => {
    const response = await axios.delete(url + "/users/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    
    });
    return response.data.data;
}

const deleteUserBySales = async (user) => {
    const response = await axios.delete(url + "/usersDestroyBySales", user, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
}

export { getAllUsers, createUser, updateUser, updateUserBySales, deleteUser, deleteUserBySales };