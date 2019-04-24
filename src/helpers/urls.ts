import axios from 'axios'

const urlExists = url =>
  axios
    .head(url, { maxRedirects: 0 })
    .then(() => true)
    .catch(() => false)

export {
  urlExists,
}
