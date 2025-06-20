'use client';

/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import TagCard from '@/components/tagCard';
import { getTags } from '@/utils/data/tagData';
import TagForm from '../../components/forms/TagForm';

export default function TagsPage() {
  const [tags, setTags] = useState([]);

  const refreshTags = () => {
    getTags().then(setTags);
  };

  useEffect(() => {
    getTags().then(setTags);
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-5">Tags</h1>

      <div className="d-flex gap-5 align-start">
        {/* Tag list (left) */}
        <div className="flex-grow-1">
          {tags.map((tag) => (
            <TagCard key={tag.id} label={tag.label} id={tag.id} refreshTags={refreshTags} />
          ))}
        </div>

        {/* Tag form (right) */}
        <div style={{ minWidth: '300px', marginRight: '400px' }}>
          <h3>Create a new tag</h3>
          <TagForm refreshTags={refreshTags} />
        </div>
      </div>
    </div>
  );
}
