'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';
import { deletePost } from '../utils/data/postData';
import { useAuth } from '../utils/context/authContext';

function PostCard({ postObj, onUpdate }) {
  const deleteSinglePost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };

  const { user } = useAuth();

  return (
    <Card className="h-100" style={{ maxWidth: '400px', maxHeight: '600px', overflow: 'hidden' }}>
      <Card.Img variant="top" src={postObj.image_url} alt={postObj.title} style={{ height: '250px', objectFit: 'contain', width: '100%' }} />
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          {postObj.category && (
            <Badge bg="secondary" className="mb-2">
              {postObj.category.label}
            </Badge>
          )}
        </div>

        <Card.Title>{postObj.title}</Card.Title>

        <Card.Text className="text-muted">
          By {postObj.user.first_name} {postObj.user.last_name}
        </Card.Text>

        <Card.Text className="flex-grow-1 text-truncate" style={{ maxWidth: '400px', maxHeight: '600px', overflow: 'hidden' }}>
          {postObj.content}
        </Card.Text>

        <div className="mt-auto">
          <Link href={`/posts/${postObj.id}`} passHref>
            <Button variant="primary" className="me-2">
              VIEW
            </Button>
          </Link>

          {/* only shows the edit/delete btns if user owns the post */}
          {user && user.uid === postObj.user.uid && (
            <>
              <Link href={`/posts/edit/${postObj.id}`} passHref>
                <Button variant="warning" className="me-2">
                  EDIT
                </Button>
              </Link>
              <Button variant="danger" onClick={deleteSinglePost} className="me-2">
                DELETE
              </Button>
            </>
          )}
        </div>
      </Card.Body>

      <Card.Footer>
        <small className="text-muted">Published on {postObj.publication_date}</small>
      </Card.Footer>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image_url: PropTypes.string,
    publication_date: PropTypes.string.isRequired,
    approved: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      uid: PropTypes.string.isRequired,
    }).isRequired,
    category: PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
