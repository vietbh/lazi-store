import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lazistore.xyz/api',
  // baseURL: 'http://127.0.0.1:8000/api',
  // cache:true,
  timeout: 30000, // Thời gian chờ tối đa cho mỗi yêu cầu (tính bằng mili giây)
  // withCredentials: true,
});

export default api;