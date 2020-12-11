import axios from "axios";

const apiUser = axios.create({
  baseURL: "http://ec2-18-208-181-242.compute-1.amazonaws.com:3000",
});

export default apiUser;

