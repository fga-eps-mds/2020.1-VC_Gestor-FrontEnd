import axios from "axios";

const apiNoticias = axios.create({
  baseURL: "https://172.25.0.7:3004",
});

export default apiNoticias;

