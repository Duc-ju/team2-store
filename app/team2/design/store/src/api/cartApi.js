import axiosClient from './axiosClient';

const cartApi = {
  addCart: (userId) => {
    const url = `/users/${userId}/carts/`;
    return axiosClient.post(url);
  },
  addItemToCart: ({ cartId, ...params }) => {
    const url = `/carts/${cartId}/cart_products/`;
    return axiosClient.post(url, params);
  },
  getCart: (cartId) => {
    const url = `/carts/${cartId}/`;
    return axiosClient.get(url);
  },
  deleteItem: ({ cartId, cartProductId }) => {
    const url = `/carts/${cartId}/cart_products/${cartProductId}/`;
    return axiosClient.delete(url);
  },
  updateItem: ({ cartId, cartProductId, ...params }) => {
    const url = `/carts/${cartId}/cart_products/${cartProductId}/`;
    return axiosClient.patch(url, params);
  },
};
export default cartApi;
