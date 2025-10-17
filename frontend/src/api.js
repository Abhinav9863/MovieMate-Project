import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000', 
  headers: { 'Content-Type': 'application/json' },
});

const api = {
  getMediaItems: () => apiClient.get('/media/'),
  createMediaItem: (itemData) => apiClient.post('/media/', itemData),

};

export default api;