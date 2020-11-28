import axios from "axios";

const apiPostagem = axios.create({
  baseURL: "http://localhost:8000",
});

export default apiPostagem;
