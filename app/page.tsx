'use client';

import { useEffect } from 'react';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { Button, Loader } from '@mantine/core';
import Link from 'next/link';
import { usePostContext } from '../context/PostContext';

const HomePage: React.FC = () => {
  const { posts, fetchPosts } = usePostContext();

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [posts.length, fetchPosts]);

  if(!posts || posts.length === 0) return <div className='h-screen w-full flex justify-center items-center'><Loader/></div>

  return (
    <Layout title="Posts">
      <Button component={Link} href="/posts/create" mb="md">
        Create New Post
      </Button>
      <PostList />
    </Layout>
  );
};

export default HomePage;