'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TagForm from '../../../../components/forms/TagForm';
import { getTagById } from '../../../../utils/data/tagData';

export default function EditTagPage({ params }) {
  const [editTag, setEditTag] = useState({});
  const { id } = params;

  useEffect(() => {
    getTagById(id).then((tag) => {
      setEditTag(tag);
    });
  }, [id]);

  return (
    <div>
      <h2>Edit Tag</h2>
      <TagForm tagObj={editTag} />
    </div>
  );
}

EditTagPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
