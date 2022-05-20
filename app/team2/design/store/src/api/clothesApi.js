import axiosBase from './axiosBase';

const clothesApi = {
    getAll: () => {
        const url = `/clothes_items/`;
        return axiosBase.get(url);
    },
    get: (id) => {
        const url = `/clothes_items/${id}/`;
        return axiosBase.get(url);
    }
};

export default clothesApi;
