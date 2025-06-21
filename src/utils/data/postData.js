import { clientCredentials } from '../client';

// GET POSTS (lists)
const getPosts = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/posts`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

// GET SINGLE EVENT
const getSinglePost = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/posts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// POST POSTS (create)
const createPost = (post) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
// PUT POST (update)
const updatePost = (post) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then((response) => resolve(response))
      .catch(reject);
  });

// DELETE POST (destroy)
const deletePost = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resolve)
      .catch(reject);
  });

// GET POSTS BY TAG
const getPostsByTag = (tagId) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/posts?tag=${tagId}`)
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });

const getAllPublicPosts = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/posts?public=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });
// GET PRIVATE POSTS BY USER UID
const getUserPrivatePosts = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/posts?user_uid=${uid}&public=false`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

// eslint-disable-next-line import/prefer-default-export
export { getPosts, getSinglePost, createPost, updatePost, deletePost, getPostsByTag, getAllPublicPosts, getUserPrivatePosts };
