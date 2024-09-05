import axios from 'axios';
import { Post } from './types';


const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export const getPosts = () => api.get<Post[]>('/posts');
export const getPost = (id: number) => api.get<Post>(`/posts/${id}`);

export const createPost = async (data: Omit<Post, 'id'>) => {
  const response = await api.post<Post>('/posts', data);
  // Simulate a new ID for the created post
  return { ...response.data, id: Math.floor(Math.random() * 1000) + 100 };
};

export const updatePostData = async (id: number, data: Partial<Post>) => {
  const response = await api.put<Post>(`/posts/${id}`, data);
  // Return the updated data as if it was persisted
  return { ...response.data, ...data };
};

export const deletePost = (id: number) => api.delete(`/posts/${id}`);

export default api;