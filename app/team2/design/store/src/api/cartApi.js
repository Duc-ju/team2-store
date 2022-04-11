import axiosClient from './axiosClient';

const cartApi = {
  addCart: (userId) => {
    const url = `/users/${userId}/carts/`;
    return axiosClient.post(url);
  },
  addItemToCart: ({ cartId, ...params }) => {
    const url = `/carts/${cartId}/cart_book_items/`;
    return axiosClient.post(url, params);
  },
  getCart: (cartId) => {
    const url = `/carts/${cartId}/`;
    return axiosClient.get(url);
  },
  deleteItem: ({ cartId, cartBookItemId }) => {
    const url = `/carts/${cartId}/cart_book_items/${cartBookItemId}/`;
    return axiosClient.delete(url);
  },
  updateItem: ({ cartId, cartBookItemId, ...params }) => {
    const url = `/carts/${cartId}/cart_book_items/${cartBookItemId}/`;
    return axiosClient.patch(url, params);
  },
};
export default cartApi;
