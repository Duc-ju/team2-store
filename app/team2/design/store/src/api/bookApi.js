import axiosBase from './axiosBase';

const bookApi = {
    getAll: () => {
        const url = `/book_items/`;
        return axiosBase.get(url);
    },
    get: (id) => {
        const url = `/book_items/${id}/`;
        return axiosBase.get(url);
    }
};

export default bookApi;
