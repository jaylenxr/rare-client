'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { getSinglePost } from '../../../../utils/data/postData';
import PostForm from '../../../../components/forms/PostForm';

function EditPost({ params }) {
  const [editPostItem, setEditPostItem] = useState({});
  const { id } = params;
  const { user } = useAuth();

  useEffect(() => {
    getSinglePost(id).then(setEditPostItem);
  }, [id]);

  return <PostForm user={user} postObj={editPostItem} />;
}

EditPost.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};

export default EditPost;
