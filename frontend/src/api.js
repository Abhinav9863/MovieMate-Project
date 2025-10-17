import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Your FastAPI backend
  headers: { 'Content-Type': 'application/json' },
});

const api = {
  getMediaItems: () => apiClient.get('/media/'),
  // We'll add create, update, and delete functions here later
};

export default api;     