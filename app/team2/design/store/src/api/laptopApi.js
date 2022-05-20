import axiosBase from './axiosBase';

const clothesApi = {
    getAll: () => {
        const url = `/laptop_items/`;
        return axiosBase.get(url);
    },
    get: (id) => {
        const url = `/laptop_items/${id}/`;
        return axiosBase.get(url);
    }
};

export default clothesApi;
