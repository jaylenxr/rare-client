'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import { getPosts } from '../../utils/data/postData';
import PostCard from '../../components/PostCard';

function Posts() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const getAllThePosts = () => {
    getPosts().then(setPosts);
  };

  useEffect(() => {
    getAllThePosts();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center mb-3">
        <Button
          onClick={() => {
            router.push('/posts/new');
          }}
        >
          Create A Post
        </Button>
      </div>
      <h1 className="text-center mt-3">Posts</h1>
      <div className="d-flex flex-wrap">
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />
        ))}
      </div>
    </>
  );
}

export default Posts;
