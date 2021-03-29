import axios from 'axios';
import Cookies from 'js-cookie';
import Vue from 'vue';

axios.defaults.baseURL = process.env.VUE_APP_API;
axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    const token = Cookies.get(process.env.VUE_APP_COOKIE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  // response => {
  //   if (response.data.code) {
  //     return response.data.code === 'A00000'
  //       ? Promise.resolve(response.data.result)
  //       : Promise.reject(response);
  //   }
  //   return Promise.resolve(response.data);
  // },
  // error => {
  //   if (error.response.status === 401 || error.response.status === 403) {
  //     Cookies.remove(process.env.VUE_APP_COOKIE_KEY);
  //     window.location.href = process.env.VUE_APP_PUBLIC_PATH || '/';
  //   }
  //   return Promise.reject(error.response);
  // }
);

Vue.prototype.$http = axios;

export default axios;
