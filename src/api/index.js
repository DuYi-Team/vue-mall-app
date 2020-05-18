import Axios from 'axios';
import URLs from './URLS';

const instance = Axios.create({
  baseURL: URLs.baseURL,
});

const likeSearch = (value) => instance.get(
  URLs.likeSearch,
  { params: { likeValue: value } },
);
const getSideList = (value) => instance.get(
  URLs.getSide,
  { params: { type: value } },
);
const getGoodsList = (value) => instance.get(
  URLs.getGoodsList,
  { params: { type: value } },
);
const Search = (value) => instance.get(
  URLs.search,
  { params: { type: value } },
);
export default {
  likeSearch,
  getSideList,
  getGoodsList,
  Search,
};
