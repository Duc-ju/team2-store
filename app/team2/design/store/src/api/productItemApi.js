import axiosBase from './axiosBase';

const productItemApi = {
  get: (params) => {
    const url = `/product_items/${params}/`;
    return axiosBase.get(url);
  },
};

export default productItemApi;