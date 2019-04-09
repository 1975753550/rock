import axios from 'axios'
import store from '../store'

// 创建axios实例
const service = axios.create({
  baseURL: '/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000
})

// Add a request interceptor
service.interceptors.request.use(function (config) {
  NProgress.start()
  // if (user.session_id) {
  //   config.headers['x-session-id'] = user.session_id
  // }
  return config
}, function (error) {
  NProgress.done()
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
service.interceptors.response.use(function (response) {
  NProgress.done()
  return response
}, function (error) {
  NProgress.done()
  // Do something with request error
  return Promise.reject(error)
})

export default service
