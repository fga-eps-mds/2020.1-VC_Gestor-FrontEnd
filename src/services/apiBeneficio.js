import axios from "axios";

const apiBeneficio = axios.create({
  baseURL: "https://172.25.0.6:3003",
});

export default apiBeneficio;
