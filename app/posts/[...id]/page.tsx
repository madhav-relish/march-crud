'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Post } from '@/utils/types';
import { getPost, updatePost } from '@/utils/api';
import Layout from '@/components/Layout';
import PostForm from '@/components/PostForm';
import { Loader } from '@mantine/core';


const EditPostPage: React.FC = () => {
 const { id } = useParams()

 const router = useRouter()
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    const response = await getPost(Number(id));
    setPost(response.data);
  };

  const handleSubmit = async (data: Partial<Post>) => {
    await updatePost(Number(id), data);
    router.push('/');
  };

  if (!post) return <div className='h-screen w-full flex justify-center items-center'>
    <Loader />
  </div>;

  return (
    <Layout title="Edit Post">
      <PostForm initialData={post} onSubmit={handleSubmit} />
    </Layout>
  );
};

export default EditPostPage;