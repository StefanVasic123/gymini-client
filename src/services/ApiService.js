import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-gymini-api.onrender.com/',
});

export default api;
