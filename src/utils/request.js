import axios from 'axios'
import qs from 'querystring'
let instance = axios.create({
    // baseURL: '',
    timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.method == 'post') {
        config.data = qs.stringify(config.data)   //序列化为符合表单数据格式的字符串key1=value1&key2=value2
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

/* // 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }); */
export default instance
