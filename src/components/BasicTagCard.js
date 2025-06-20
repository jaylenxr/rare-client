/* eslint-disable import/no-extraneous-dependencies */

'use client';

import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Link from 'next/link';

function BasicTagCard({ label, id }) {
  return (
    <div className="mb-2">
      <Badge bg="" pill className="fs-6" style={{ backgroundColor: '#6f42c1', color: '#fff' }}>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id={`tooltip-${id}`}>View Tag&apos;s Posts</Tooltip>}>
          <Link href={`/tags/${id}`} passHref className="text-white text-decoration-none">
            #{label}
          </Link>
        </OverlayTrigger>
      </Badge>
    </div>
  );
}

export default BasicTagCard;

BasicTagCard.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
