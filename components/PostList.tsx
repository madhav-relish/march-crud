'use client'

import { Card, Text, Button } from '@mantine/core';
import Link from 'next/link';
import { notifications } from '@mantine/notifications';
import { usePostContext } from '@/context/PostContext';

const PostList: React.FC = () => {
    const { posts, deletePost } = usePostContext();

  const handleDelete = (id: number) => {
    deletePost(id);
    notifications.show({
      title: 'Post Deleted',
      message: 'The post has been successfully deleted.',
      color: 'green',
      position: "bottom-right"
    });
  };


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