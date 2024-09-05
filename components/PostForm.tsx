import React, { useState } from 'react';
import { TextInput, Textarea, Button, Stack } from '@mantine/core';
import { Post } from '@/utils/types';

interface PostFormProps {
  initialData?: Partial<Post>;
  onSubmit: (data: Omit<Post, 'id'>) => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialData = {}, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [body, setBody] = useState(initialData.body || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, body, userId: initialData.userId || 1 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          required
        />
        <Textarea
          label="Body"
          value={body}
          onChange={(e) => setBody(e.currentTarget.value)}
          required
        />
        <Button type="submit" color="blue">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default PostForm;