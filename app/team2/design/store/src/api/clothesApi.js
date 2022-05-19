import axiosBase from './axiosBase';

const clothesApi = {
    get: () => {
        const url = `/clothes_items/`;
        return axiosBase.get(url);
    }
};

export default clothesApi;