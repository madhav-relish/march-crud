import React, { createContext, useContext, useState, useEffect } from 'react';

import { getPosts } from '../utils/api';
import { Post } from '@/utils/types';

interface PostContextType {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  addPost: (post: Post) => void;
  updatePost: (updatedPost: Post) => void;
  deletePost: (id: number) => void;
  fetchPosts: () => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const response = await getPosts();
    setPosts(response.data);
    localStorage.setItem('posts', JSON.stringify(response.data));
  };

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      fetchPosts();
    }
  }, []);

  const addPost = (post: Post) => {
    setPosts(prevPosts => {
      const newPosts = [post, ...prevPosts];
      localStorage.setItem('posts', JSON.stringify(newPosts));
      return newPosts;
    });
  };

  const updatePost = (updatedPost: Post) => {
    setPosts(prevPosts => {
      const newPosts = prevPosts.map(post => 
        post.id === updatedPost.id ? updatedPost : post
      );
      localStorage.setItem('posts', JSON.stringify(newPosts));
      return newPosts;
    });
  };

  const deletePost = (id: number) => {
    setPosts(prevPosts => {
      const newPosts = prevPosts.filter(post => post.id !== id);
      localStorage.setItem('posts', JSON.stringify(newPosts));
      return newPosts;
    });
  };

  return (
    <PostContext.Provider value={{ posts, setPosts, addPost, updatePost, deletePost, fetchPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};