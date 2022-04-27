import axios from "axios";

const instance = axios.create({
  withCredentials: false,
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default instance;
