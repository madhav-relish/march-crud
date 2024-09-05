'use client'

import { useRouter } from 'next/navigation';
import Layout from '../../../components/Layout';
import PostForm from '../../../components/PostForm';
import { createPost } from '../../../utils/api';
import { Post } from '@/utils/types';

const CreatePostPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: Partial<Post>) => {
    await createPost(data as Omit<Post, 'id'>);
    router.push('/');
  };

  return (
    <Layout title="Create Post">
      <PostForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default CreatePostPage;