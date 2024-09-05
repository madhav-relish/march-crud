"use client";


import { useRouter } from "next/navigation";
import { Post } from "@/utils/types";
import Layout from "@/components/Layout";
import PostForm from "@/components/PostForm";
import { Loader } from "@mantine/core";
import { usePostContext } from "@/context/PostContext";
import { notifications } from "@mantine/notifications";
import { updatePostData } from "@/utils/api";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { posts, updatePost } = usePostContext();
  const post = posts.find(p => p.id === Number(params.id));

  const handleSubmit = async (data: Omit<Post, 'id'>) => {
    if (!post) return;
    try {
      // Simulate API call
      await updatePostData(post.id, post);

      // Update local state
      const updatedPost: Post = { ...data, id: post.id };
      updatePost(updatedPost);

      notifications.show({
        title: 'Post Updated',
        message: 'The post has been successfully updated.',
        color: 'green',
      });
      router.push('/');
    } catch (error) {
      console.error('Failed to update post:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to update the post. Please try again.',
        color: 'red',
      });
    }
  };

  if (!post)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <Layout title="Edit Post">
      <PostForm initialData={post} onSubmit={handleSubmit} />
    </Layout>
  );
}
