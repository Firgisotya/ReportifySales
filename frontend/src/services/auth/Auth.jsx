import axios from "axios";
import { BaseUrl } from "../BaseUrl"

const url = BaseUrl().apiUrl;

const login = async (data) => {
  const response = await axios.post(`${url}/auth/login`, data);
  return response.data;
}

const logout = async () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('role_id');
  return true;
}


export { login, logout };
