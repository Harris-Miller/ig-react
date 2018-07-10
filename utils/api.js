import axios from 'axios';

const API_HOST = 'http://10.0.0.121:3000';

export default axios.create({
  baseURL: API_HOST
});
