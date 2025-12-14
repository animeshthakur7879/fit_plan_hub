import axios from "axios";
import { api } from "../../api/api";

const register = async (userData) => {
    const response = await axios.post(`${api}/auth/register`, userData);
    console.log(response.data)
}

const mauthService = {
    register,
};

export default mauthService;