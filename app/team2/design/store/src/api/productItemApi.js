import axiosBase from './axiosBase';

const productItemApi = {
    get: () => {
        const url = `/book_items/`;
        return axiosBase.get(url);
    }
};

export default productItemApi;