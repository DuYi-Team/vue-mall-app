import Axios from 'axios';
import baseURL, { URLs } from './URLS';

const appkey = 'ding_1596091917877';
const instance = Axios.create({
  baseURL,
  params: {
    appkey,
  },
});

const likeSearch = (value) => instance.get(
  URLs.likeSearch,
  { params: { likeValue: value } },
);
const getSideList = (value) => instance.get(
  URLs.getSide,
  { params: { type: value } },
);
const getGoodsList = (value, page, size, sort = 'all') => instance.get(
  URLs.getGoodsList,
  {
    params: {
      type: value, page, size, sort,
    },
  },
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
