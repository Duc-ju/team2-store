import axiosClient from './axiosClient';

const cartApi = {
    addCart: (userId) => {
        const url = `/users/${userId}/carts/`;
        return axiosClient.post(url);
    },
    addItemToCart: ({ cartId, itemId, type }) => {
        const url = `carts/${cartId}/${type}_items/${itemId}/add/`;
        return axiosClient.patch(url);
    },
    getCart: (userId) => {
        const url = `/users/${userId}/carts/get/`;
        return axiosClient.get(url);
    },
    deleteItem: ({ cartId, itemId, type }) => {
        const url = `carts/${cartId}/${type}_items/${itemId}/delete/`;
        return axiosClient.patch(url);
    }
    // updateItem: ({ cartProductId, ...params }) => {
    //     const url = `/cart_products/${cartProductId}/`;
    //     return axiosClient.patch(url, params);
    // }
};
export default cartApi;
