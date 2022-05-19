import axiosBase from './axiosBase';

const bookApi = {
    get: () => {
        const url = `/book_items/`;
        return axiosBase.get(url);
    }
};

export default bookApi;
