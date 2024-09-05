'use client'

import { useRouter } from 'next/navigation';
import Layout from '../../../components/Layout';
import PostForm from '../../../components/PostForm';
import { createPost } from '../../../utils/api';
import { Post } from '@/utils/types';
import { usePostContext } from '@/context/PostContext';
import { notifications } from '@mantine/notifications';

const CreatePostPage: React.FC = () => {
  const router = useRouter();

  const { addPost } = usePostContext();

  const handleSubmit = async(data: Omit<Post, 'id'>) => {
    try {
      // Simulate API call
      await createPost(data);
      
      const newPost: Post = { ...data, id: Date.now() };

      // Update local state
      addPost(newPost);

      notifications.show({
        title: 'Post Created',
        message: 'The post has been successfully created.',
        color: 'green',
      });
      router.push('/');
    } catch (error) {
      console.error('Failed to create post:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to create the post. Please try again.',
        color: 'red',
      });
    }
  };

  return (
    <Layout title="Create Post">
      <PostForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default CreatePostPage;