import axios from 'axios';
import Cookies from 'js-cookie';
import Vue from 'vue';

axios.defaults.baseURL = process.env.VUE_APP_API;
axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    const token = Cookies.get(process.env.VUE_APP_COOKIE_KEY)||'undefined';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => {
    if(response.data.code===0) {
      return Promise.resolve(response.data.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error.response);
  }
)

Vue.prototype.$http = axios;

export default axios;
