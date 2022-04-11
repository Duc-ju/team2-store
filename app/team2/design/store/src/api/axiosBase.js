import axios from 'axios';
import queryString from 'query-string';
const axiosBase = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v1/api`,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosBase.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (err) => {
    throw err;
  }
);
export default axiosBase;
