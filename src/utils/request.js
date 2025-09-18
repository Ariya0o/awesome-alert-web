import axios from 'axios';
import { message } from 'antd';

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api',
  timeout: 15000, // 请求超时时间
  withEndSlash: false,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 可以在这里添加 loading 状态
    // 添加 token 等通用 headers
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    message.error('请求发送失败');
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { status, data } = response;
    
    // 请求成功
    if (status === 200) {
      // 处理业务逻辑错误
      if (data.code && data.code !== 200) {
        message.error(data.message || '操作失败');
        return Promise.reject(new Error(data.message || '操作失败'));
      }
      return data.result || data.data;
    } 
    
    message.error('请求失败');
    return Promise.reject(new Error('请求失败'));
  },
  error => {
    const { response } = error;
    
    if (response) {
      const { status, data } = response;
      
      switch (status) {
        case 401:
          // 未授权，跳转到登录页
          message.error('登录已过期，请重新登录');
          break;
          
        case 403:
          message.error('没有权限访问该资源');
          break;
          
        case 404:
          message.error('请求的资源不存在');
          break;
          
        case 500:
          message.error('服务器错误，请稍后重试');
          break;
          
        case 503:
          message.error('服务暂时不可用，请稍后重试');
          break;
          
        default:
          message.error(data?.message || '请求失败');
          break;
      }
    } else {
      // 处理网络错误
      if (error.message.includes('timeout')) {
        message.error('请求超时，请检查网络');
      } else if (error.message.includes('Network Error')) {
        message.error('网络错误，请检查网络连接');
      } else {
        message.error('请求失败，请稍后重试');
      }
    }
    
    return Promise.reject(error);
  }
);

// 封装通用请求方法
const request = {
  get: (url, params) => service.get(url, { params }),
  post: (url, data) => service.post(url, data),
  put: (url, data) => service.put(url, data),
  delete: (url) => service.delete(url),
};

export default request;