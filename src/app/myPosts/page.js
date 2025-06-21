/* eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import { getPosts } from '../../utils/data/postData';
import PostCard from '../../components/PostCard';
import { useAuth } from '../../utils/context/authContext';
import { getUserPrivatePosts } from '../../utils/data/postData';

function Posts() {
  const [userPosts, setUserPosts] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getAllThePosts = () => {
    getUserPrivatePosts(user.uid).then(setUserPosts);
    getPosts().then((allPosts) => {
      const filteredPosts = allPosts.filter((post) => post.user.first_name === user.first_name && post.user.last_name === user.last_name && post.is_public === false);
      setUserPosts(filteredPosts);
    });
  };

  useEffect(() => {
    getAllThePosts();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center mb-3 mt-3">
        <Button
          onClick={() => {
            router.push('/posts/new');
          }}
        >
          Create A Post
        </Button>
      </div>
      <h1 className="text-center mt-3">My Posts</h1>
      <div className="d-flex flex-wrap">
        {userPosts.map((postItem) => (
          <PostCard key={postItem.id} postObj={postItem} onUpdate={getAllThePosts} />
        ))}
      </div>
    </>
  );
}

export default Posts;
