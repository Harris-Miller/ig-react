import axios from 'axios';

const API_HOST = 'http://192.168.0.17:3000';

export default axios.create({
  baseURL: API_HOST
});
