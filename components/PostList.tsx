'use client'

import { useState, useEffect } from 'react';
import { Card, Text, Button, Loader } from '@mantine/core';
import Link from 'next/link';
import { getPosts, deletePost } from '../utils/api';
import { Post } from '@/utils/types';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await getPosts();
    setPosts(response.data);
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    setPosts(posts.filter(post => post.id !== id));
  };

  if(!posts || posts.length === 0) return <div className='h-screen w-full flex justify-center items-center'><Loader/></div>

  return (
    <div className='flex gap-4 flex-wrap w-full'>
      {posts?.map(post => (
        <Card key={post.id} shadow="sm" padding="lg" w={400} radius={'md'} classNames={{
            root: "flex flex-col justify-between"
        }}>
            <div>

          <Text fw={500}>{post.title}</Text>
          <Text size="sm" color="dimmed">{post.body.substring(0, 100)}...</Text>
            </div>
          <div className='flex flex-col '>
          <Button component={Link} href={`/posts/${post.id}`} variant="outline" mt="md">
            View
          </Button>
          <Button color="red" onClick={() => handleDelete(post.id)} mt="md">
            Delete
          </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PostList;