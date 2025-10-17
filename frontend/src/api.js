import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000', 
  headers: { 'Content-Type': 'application/json' },
});

const api = {
  getMediaItems: () => apiClient.get('/media/'),
  createMediaItem: (itemData) => apiClient.post('/media/', itemData),
deleteMediaItem: (id) => apiClient.delete(`/media/${id}`),
getMediaItemById: (id) => apiClient.get(`/media/${id}`),
  updateMediaItem: (id, itemData) => apiClient.put(`/media/${id}`, itemData),
};

export default api;