import axiosBase from './axiosBase';

const clothesApi = {
    get: () => {
        const url = `/laptop_items/`;
        return axiosBase.get(url);
    }
};

export default clothesApi;