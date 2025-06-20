/* eslint-disable import/no-extraneous-dependencies */

'use client';

import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Link from 'next/link';
import { deleteTag } from '../utils/data/tagData';

function TagCard({ label, id, refreshTags }) {
  const deleteThisTag = () => {
    if (window.confirm(`Are you sure you want to delete the tag #${label}? It will be removed from all posts.`)) {
      deleteTag(id).then(() => {
        refreshTags();
      });
    }
  };

  return (
    <div className="mb-2">
      <Badge bg="" pill className="fs-6" style={{ backgroundColor: '#6f42c1', color: '#fff' }}>
        #{label}
        <OverlayTrigger placement="bottom" overlay={<Tooltip id={`tooltip-${id}`}>Edit Tag</Tooltip>}>
          <Link href={`/tags/edit/${id}`} passHref className="text-white text-decoration-none">
            <FontAwesomeIcon className="ms-4" icon={faPen} />
          </Link>
        </OverlayTrigger>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id={`tooltip-${id}`}>Delete Tag</Tooltip>}>
          <FontAwesomeIcon className="ms-2" icon={faTrash} onClick={deleteThisTag} />
        </OverlayTrigger>
      </Badge>
    </div>
  );
}

export default TagCard;

TagCard.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  refreshTags: PropTypes.func.isRequired,
};
