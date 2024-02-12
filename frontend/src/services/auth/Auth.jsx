import axios from "axios";
import { BaseUrl } from "../BaseUrl"

const url = BaseUrl().apiUrl;

const login = async (data) => {
  const response = await axios.post(`${url}/auth/login`, data);
  return response.data;
}

const logout = async () => {
  localStorage.removeItem('token');

  window.location.reload();
}


export { login, logout };
