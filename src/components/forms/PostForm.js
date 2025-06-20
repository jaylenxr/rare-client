/* eslint-disable */

'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { createPost, updatePost } from '../../utils/data/postData';
import { createPostTag, getTags, getPostTagsByPostId } from '../../utils/data/tagData';
import getCategories from '../../utils/data/categoryData';

const initialState = {
  title: '',
  content: '',
  image_url: '',
  publication_date: '',
  category_id: '',
};

function PostForm({ user, postObj = {} }) {
  const [categories, setCategories] = useState([]);
  const [currentPost, setCurrentPost] = useState(initialState);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategories().then(setCategories);
    getTags().then(setTags);
  }, []);

  useEffect(() => {
    if (postObj?.id) {
      setCurrentPost({
        title: postObj.title || '',
        content: postObj.content || '',
        image_url: postObj.image_url || '',
        publication_date: postObj.publication_date || '',
        category: postObj.category?.id ? String(postObj.category.id) : '',
      });

      getPostTagsByPostId(postObj?.id)
        .then((postTags) => {
          const selectedTags = postTags.map((pt) => pt.tag);
          setSelectedTags(selectedTags);
        })
        .catch((error) => {
          console.error('Error fetching post tags:', error);
        });
    }
  }, [postObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = {
      id: postObj.id,
      title: currentPost.title,
      content: currentPost.content,
      image_url: currentPost.image_url,
      publication_date: currentPost.publication_date,
      category_id: Number(currentPost.category),
      user_id: user.id,
    };

    if (postObj?.id) {
      updatePost(post)
        .then(() => {
          selectedTags.forEach((tagId) => {
            console.log('Creating PostTag for:', post.id, tagId);
            createPostTag(post.id, tagId).catch((error) => {
              console.error('Error creating PostTag:', error);
            });
          });
        })
        .then(() => router.push('/posts'));
    } else {
      createPost(post)
        .then((postData) => {
          console.log('Post created:', postData);
          selectedTags.forEach((tagId) => {
            console.log('Creating PostTag for:', postData.id, tagId);
            createPostTag(postData.id, tagId).catch((error) => {
              console.error('Error creating PostTag:', error);
            });
          });
        })
        .then(() => router.push('/posts'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* TITLE */}
      <InputGroup className="mb-3">
        <InputGroup.Text>📝</InputGroup.Text>
        <Form.Control type="text" name="title" required value={currentPost.title} onChange={handleChange} placeholder="Post Title" />
      </InputGroup>

      {/* CONTENT */}
      <InputGroup className="mb-3">
        <InputGroup.Text>✍️</InputGroup.Text>
        <Form.Control as="textarea" name="content" required value={currentPost.content} onChange={handleChange} placeholder="Write your post content here..." style={{ height: '150px' }} />
      </InputGroup>

      {/* IMAGE URL */}
      <InputGroup className="mb-3">
        <InputGroup.Text>🌄</InputGroup.Text>
        <Form.Control type="url" name="image_url" value={currentPost.image_url} onChange={handleChange} placeholder="Image URL" />
      </InputGroup>

      {/* CATEGORY */}
      <InputGroup className="mb-3">
        <InputGroup.Text>📂</InputGroup.Text>
        <Form.Select name="category" required value={currentPost.category} onChange={handleChange}>
          <option value="">Select a Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </Form.Select>
      </InputGroup>

      {/* TAGS */}
      {/* TAGS */}
      <div className="mb-3">
        <label className="form-label">🏷️ Tags</label>
        <div>
          {tags.map((tag) => (
            <Form.Check
              key={tag.id}
              type="checkbox"
              id={`tag-${tag.id}`}
              label={tag.label}
              checked={selectedTags.includes(tag.id)}
              value={tag.id}
              onChange={(e) => {
                const tagId = Number(e.target.value);
                if (e.target.checked) {
                  setSelectedTags((prev) => [...prev, tagId]);
                } else {
                  setSelectedTags((prev) => prev.filter((id) => id !== tagId));
                }
              }}
            />
          ))}
        </div>
      </div>

      <Button variant="success" type="submit">
        {postObj.id ? 'Update' : 'Create'} Post
      </Button>
    </Form>
  );
}

PostForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    image_url: PropTypes.string,
    publication_date: PropTypes.string,
    category: PropTypes.number,
  }),
};

export default PostForm;
