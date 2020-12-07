import axios from "axios";

const apiPostagem = axios.create({
  baseURL: "https://vc-usuario-backend.herokuapp.com/",
});

export default apiPostagem;
