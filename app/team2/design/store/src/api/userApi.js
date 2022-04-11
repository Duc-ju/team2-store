import axiosBase from './axiosBase';
import axiosClient from './axiosClient';

const userApi = {
  login: (params) => {
    const url = '/token/';
    return axiosBase.post(url, params);
  },
  getInfo: (params) => {
    const url = `/users/${params}/`;
    return axiosClient.get(url);
  },
  register: (params) => {
    const url = '/users/';
    return axiosClient.post(url, params);
  },
};
export default userApi;
