import Axios from 'axios';
import URLs from './URLS';

const instance = Axios.create({
  baseURL: URLs.baseURL,
});

function likeSearch(value) {
  return instance.get(URLs.likeSearch, { params: { likeValue: value } });
}

export default {
  likeSearch,
};
