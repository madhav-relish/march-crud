import axios from 'axios';
import { Post } from './types';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export const getPosts = () => api.get('/posts');
export const getPost = (id: number) => api.get(`/posts/${id}`);
export const createPost = (data: Omit<Post, 'id'>) => api.post('/posts', data);
export const updatePost = (id: number, data: Partial<Post>) => api.put(`/posts/${id}`, data);
export const deletePost = (id: number) => api.delete(`/posts/${id}`);

export default api;