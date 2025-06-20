'use client';

import React, { useEffect, useState } from 'react';
import { getPosts } from '../../utils/data/postData';
import PostCard from '../../components/PostCard';

function Posts() {
  const [posts, setPosts] = useState([]);

  const getAllThePosts = () => {
    getPosts().then(setPosts);
  };

  useEffect(() => {
    getAllThePosts();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {posts.map((post) => (
        <PostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />
      ))}
    </div>
  );
}

export default Posts;
