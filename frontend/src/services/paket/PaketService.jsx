import axios from "axios";
import { BaseUrl } from "../BaseUrl"
import { getToken } from "../storage/StorageService";

const url = BaseUrl().apiUrl;
const token = getToken()

const getAllPaket = async () => {
    const response = await axios.get(url + "/paket", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
}

const createPaket = async (paket) => {
    const response = await axios.post(url + "/paket", paket, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
}

const updatePaket = async (id, paket) => {
    const response = await axios.put(url + "/paket/" + id, paket, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
}

const deletePaket = async (id) => {
    const response = await axios.delete(url + "/paket/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    
    });
    return response.data.data;
}

export { getAllPaket, createPaket, updatePaket, deletePaket };
