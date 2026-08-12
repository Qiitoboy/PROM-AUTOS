import axios from "axios";

const api = axios.create({
  baseURL: "https://prom-autos-backend.onrender.com/api/",
});

export default api;
