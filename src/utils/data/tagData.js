/* eslint-disable consistent-return */
// import { clientCredentials } from '../utils/client';
import { clientCredentials } from '../client';

const getTags = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/tags`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

// eslint-disable-next-line import/prefer-default-export

const createTag = (tag) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/tags`, {
      method: 'POST',
      body: JSON.stringify(tag),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const updateTag = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/tags/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 204) {
          resolve();
        } else {
          return response.json().then(resolve);
        }
      })
      .catch(reject);
  });

const getTagById = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/tags/${id}`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const deleteTag = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/tags/${id}`, {
      method: 'DELETE',
    })
      .then(resolve)
      .catch(reject);
  });

const removeTagsFromPost = async (postId) => {
  try {
    const res = await fetch(`${clientCredentials.databaseURL}/posttags/?post_id=${postId}`);
    const postTags = await res.json();

    const deletions = postTags.map((pt) =>
      fetch(`${clientCredentials.databaseURL}/posttags/${pt.id}`, {
        method: 'DELETE',
      }),
    );

    await Promise.all(deletions);
    return true;
  } catch (err) {
    throw new Error('Failed to remove tags from post');
  }
};

const getPostTagsByPostId = async (postId) => {
  const res = await fetch(`${clientCredentials.databaseURL}/posttags?post_id=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch PostTags for post');
  }

  return res.json();
};

const createPostTag = async (postId, tagId) => {
  try {
    const response = await fetch(`${clientCredentials.databaseURL}/posttags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post: postId,
        tag: tagId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create PostTag');
    }

    const data = await response.json();
    console.log('PostTag created:', data);
  } catch (error) {
    console.error('Error creating PostTag:', error);
  }
};

export { getTags, createTag, updateTag, getTagById, deleteTag, removeTagsFromPost, createPostTag, getPostTagsByPostId };
