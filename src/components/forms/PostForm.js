'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { createPost, updatePost } from '../../utils/data/postData';
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
  const router = useRouter();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (postObj?.id) {
      setCurrentPost({
        title: postObj.title || '',
        content: postObj.content || '',
        image_url: postObj.image_url || '',
        publication_date: postObj.publication_date || '',
        category_id: String(postObj.category_id || ''),
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
      category_id: Number(currentPost.category_id),
      user_id: user.id,
    };

    if (postObj?.id) {
      updatePost(post).then(() => router.push('/posts'));
    } else {
      createPost(post).then(() => router.push('/posts'));
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

      {/* PUBLICATION DATE */}
      <InputGroup className="mb-3">
        <InputGroup.Text>📅</InputGroup.Text>
        <Form.Control type="date" name="publication_date" required value={currentPost.publication_date} onChange={handleChange} />
      </InputGroup>

      {/* CATEGORY */}
      <InputGroup className="mb-3">
        <InputGroup.Text>📂</InputGroup.Text>
        <Form.Select name="category_id" required value={currentPost.category_id} onChange={handleChange}>
          <option value="">Select a Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </Form.Select>
      </InputGroup>

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
    category_id: PropTypes.number,
  }),
};

export default PostForm;
