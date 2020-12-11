import axios from "axios";

const apiNoticias = axios.create({
  baseURL: "http://ec2-18-208-181-242.compute-1.amazonaws.com:3004",
});

export default apiNoticias;

