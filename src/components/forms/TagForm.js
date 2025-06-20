'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { createTag, updateTag } from '../../utils/data/tagData';

const initalState = {
  label: '',
};

export default function TagForm({ tagObj = initalState, refreshTags }) {
  const router = useRouter();
  const [currentTag, setCurrentTag] = useState(initalState);

  useEffect(() => {
    if (tagObj) {
      setCurrentTag(tagObj);
    }
  }, [tagObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTag((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tag = {
      id: currentTag.id,
      label: currentTag.label,
    };

    if (tag?.id) {
      // updateTag(tag).then(() => {refreshTags()});
      updateTag(tag).then(() => router.push('/tags'));
    } else {
      createTag(tag).then(() => {
        refreshTags();
        setCurrentTag(initalState);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3 d-flex align-items-center">
        <div className="fs-3 me-2">#</div>
        <Form.Control type="text" name="label" value={currentTag.label} onChange={handleChange} placeholder="Enter tag" required />
      </Form.Group>

      <Button variant="primary" type="submit">
        {currentTag.id ? 'Update Tag' : 'Create Tag'}
      </Button>
    </Form>
  );
}

TagForm.propTypes = {
  tagObj: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }),
  refreshTags: PropTypes.func.isRequired,
};
