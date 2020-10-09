import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.25.0.4:3002',
});

export default api;

