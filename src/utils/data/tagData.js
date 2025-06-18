/* eslint-disable consistent-return */
// import { clientCredentials } from '../utils/client';
import { clientCredentials } from '../client';

const getTags = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/tags`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

// eslint-disable-next-line import/prefer-default-export

const createTag = (tag) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/tags`, {
      method: 'POST',
      body: JSON.stringify(tag),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const updateTag = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/tags/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 204) {
          resolve();
        } else {
          return response.json().then(resolve);
        }
      })
      .catch(reject);
  });

const getTagById = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/tags/${id}`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const deleteTag = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/tags/${id}`, {
      method: 'DELETE',
    })
      .then(resolve)
      .catch(reject);
  });

export { getTags, createTag, updateTag, getTagById, deleteTag };
