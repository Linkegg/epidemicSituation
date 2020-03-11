import axios from 'axios';
// Add a request interceptor
axios.defaults.baseURL = 'https://lab.ahusmart.com';
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log(config);
    config.params = {
        ...config.params,
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default axios