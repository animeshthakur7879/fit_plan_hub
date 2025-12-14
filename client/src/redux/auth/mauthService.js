import axios from "axios";
import { api } from "../../api/api";

const register = async (userData) => {
    const response = await axios.post(`${api}/auth/register`, userData);
    localStorage.setItem("user", JSON.stringify(response.data));
    // console.log(response.data)
    return response.data;
}

const login = async (userData) => {
    const response = await axios.post(`${api}/auth/login`, userData);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
    
    // console.log(response.data)
}

const logout = () => {
    localStorage.removeItem("user");
}

const mauthService = {
    register,
    login ,
    logout
};

export default mauthService;