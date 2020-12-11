import axios from "axios";

const apiBeneficio = axios.create({
  baseURL: "http://ec2-18-208-181-242.compute-1.amazonaws.com:3003",
});

export default apiBeneficio;
