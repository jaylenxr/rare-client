'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSinglePost } from '../../../utils/data/postData';
import { getPostTagsByPostId } from '../../../utils/data/tagData';
import BasicTagCard from '../../../components/BasicTagCard';

const initialState = {
  title: '',
  category_id: '',
  content: '',
  // tags: [],
};

function ViewPost({ params }) {
  const { id } = params;
  const [postDetails, setPostDetails] = useState(initialState);
  const [postTags, setPostTags] = useState([]);

  const getThePost = () => {
    getSinglePost(id).then(setPostDetails);
  };

  useEffect(() => {
    getThePost();
    getPostTagsByPostId(id).then((tags) => {
      console.warn('Post Tags:', tags);
      setPostTags(tags);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="view-post-container">
      <div className="view-post-card">
        <h2 className="post-title">{postDetails.title}</h2>

        {/* POST'S TAGS */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          {postTags.map((tag) => (
            <BasicTagCard key={tag.tag.id} label={tag.tag.label} id={tag.tag.id} />
          ))}
        </div>

        {/* <div className="post-cat">
          <p className="post-category">Category: {postDetails.category_id}</p>
        </div> */}

        <div className="post-content">
          <h3>Content</h3>

          <p>{postDetails.content}</p>
        </div>

        {/* <p>{postDetails.tags?.map((tag, index) => (index === postDetails.tags.length - 1 ? tag.label : `${tag.label}, `))}</p> */}
      </div>
    </div>
  );
}

ViewPost.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  postDetails: PropTypes.shape({
    title: PropTypes.string,
    // category_id: PropTypes.string,
    content: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }),
};
ViewPost.defaultProps = {
  postDetails: initialState,
};

export default ViewPost;
