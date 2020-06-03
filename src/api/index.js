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
const getGoodsList = (value, page, size) => instance.get(
  URLs.getGoodsList,
  { params: { type: value, page, size } },
);
const Search = (value, page, size) => instance.get(
  URLs.search,
  { params: { type: value, page, size } },
);
const getGoodsByIds = (value) => instance.get(
  URLs.getGoodsByIds,
  { params: { value } },
);
export default {
  likeSearch,
  getSideList,
  getGoodsList,
  Search,
  getGoodsByIds,
};
