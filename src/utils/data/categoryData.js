import { clientCredentials } from '../client';

const getCategories = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/categories`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

export default getCategories;
