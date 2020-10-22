import axios from "axios";

const apiPostagem = axios.create({
  baseURL: "http://172.25.0.4:3002",
});

export default apiPostagem;
