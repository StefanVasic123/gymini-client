import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://dev-gymini-api.onrender.com/'
      : 'http://localhost:5000',
});

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['adminToken'] = token;
  } else {
    delete axios.defaults.headers.common['adminToken'];
  }
};

export { api, setAuthToken };
