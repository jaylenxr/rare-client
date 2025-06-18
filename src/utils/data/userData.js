import { clientCredentials } from '../client';

// GET USERS (lists)
const getUsers = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/users`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

// GET SINGLE EVENT
const getSingleUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/users/${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// USER USERS (create)
const createUser = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

// PUT USER (update)
const updateUser = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/users/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => resolve(response))
      .catch(reject);
  });

// DELETE USER (destroy)
const deleteUser = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resolve)
      .catch(reject);
  });

// eslint-disable-next-line import/prefer-default-export
export { getUsers, getSingleUser, createUser, updateUser, deleteUser };
