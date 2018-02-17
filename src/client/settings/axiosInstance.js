import axios from 'axios'
import { WEB_ADDR } from './config'

const axiosInstance = axios.create({
  baseURL: WEB_ADDR,
  timeout: 3000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response
  },
  function(error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          // error.message = '查询错误'
          error.message = error.response.data.error
          break
        case 401:
          error.message = '用户名或密码错误，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 500:
          error.message = '服务器内部错误'
          break
      }
    }
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axiosInstance