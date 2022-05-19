import axiosClient from './axiosClient';

const orderApi = {
    addOrder: (customerId, cartId, data) => {
        const url = `customers/${customerId}/carts/${cartId}/orders/`;
        return axiosClient.post(url, data);
    },
    getOrderList: (customerId) => {
        const url = `customers/${customerId}/orders/`;
        return axiosClient.get(url);
    },
    getOrder: (orderId) => {
        const url = `orders/${orderId}/`;
        return axiosClient.get(url);
    }
};
export default orderApi;
