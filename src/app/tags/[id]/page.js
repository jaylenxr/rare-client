/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getTagById } from '../../../utils/data/tagData';
import { getPostsByTag } from '../../../utils/data/postData';
import PostCard from '../../../components/PostCard';

export default function ViewTagPage({ params }) {
  const [viewTag, setViewTag] = useState({});
  const { id } = params;
  const [tagPosts, setTagPosts] = useState([]);

  useEffect(() => {
    getTagById(id).then((tag) => {
      setViewTag(tag);
    });
  }, [id]);

  useEffect(() => {
    getPostsByTag(id).then(setTagPosts);
  }, [id]);

  return (
    <div>
      <Link style={{ marginLeft: '0px' }} href="/tags" passHref>
        <Button style={{ marginTop: '20px' }}>
          <FontAwesomeIcon pill className="me-2" icon={faArrowLeft} />
          Back to All Tags
        </Button>
      </Link>

      <h1 className="text-center mt-4">#{viewTag.label}</h1>

      {/* loop thru tagPosts */}
      <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">{tagPosts.length > 0 ? tagPosts.map((post) => <PostCard postObj={post} />) : <p className="text-center">No posts found for this tag.</p>}</div>
    </div>
  );
}

ViewTagPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
