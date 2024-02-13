import axios from "axios";
import { BaseUrl } from "../BaseUrl"
import { getToken } from "../storage/StorageService";

const url = BaseUrl().apiUrl;
const token = getToken()

const getAllSalesTransaction = async () => {
    const response = await axios.get(url + "/sales-transaction", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
}

const createSalesTransaction = async () => {
    const response = await axios.post(url + "/sales-transaction", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
}

const detailSalesTransaction = async (id) => {
    const response = await axios.get(url + "/sales-transaction/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data.data;
}

const updateSalesTransaction = async (id, transaction) => {
    const response = await axios.put(url + "/sales-transaction/" + id, transaction, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data.data;
}

const deleteSalesTransaction = async (id) => {
    const response = await axios.delete(url + "/sales-transaction/" + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data.data;
}

const reportExport = async () => {
    const response = await axios.get(url + "/sales-transaction/report/export-pdf", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data.data;
}


export { getAllSalesTransaction, createSalesTransaction, detailSalesTransaction, updateSalesTransaction, deleteSalesTransaction, reportExport }