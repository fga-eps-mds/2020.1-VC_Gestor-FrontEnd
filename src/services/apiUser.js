import axios from "axios";

const apiUser = axios.create({
  baseURL: "http://172.25.0.3:3000",
});

export default apiUser;

