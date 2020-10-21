import axios from "axios";

const apiNews = axios.create({
  baseURL: "http://172.25.0.7:3004",
});

export default apiNews;