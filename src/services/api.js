import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.25.0.3:3002',
});

export default api;
