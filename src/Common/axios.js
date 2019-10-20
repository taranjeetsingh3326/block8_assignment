import axios from 'axios';
//import CONSTATNT from './constant';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    //.baseURL = CONSTATNT.API_BASE_URL;
    config.headers = {
        'content-type' : 'application/json',
    }
    if(localStorage.getItem('token')){
        config.headers.Authorization = localStorage.getItem('token');
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
  export default axios;