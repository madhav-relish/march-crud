import Layout from "@/components/Layout";
import PostList from "@/components/PostList";
import { Button } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
  
    <Layout title="Posts">
    <Button component={Link} href="/posts/create" mb="md">
      Create New Post
    </Button>
    <PostList />
  </Layout>
   
  );
}
