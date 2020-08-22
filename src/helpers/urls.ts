import axios from 'axios';

const urlExists = (url: string): Promise<boolean> =>
  axios
    .head(url, { maxRedirects: 0 })
    .then(() => true)
    .catch(() => false);

export {
  urlExists,
};
