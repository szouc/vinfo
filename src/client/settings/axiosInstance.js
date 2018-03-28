import axios from 'axios'
import qs from 'querystring'
import { WEB_ADDR } from './config'

const axiosInstance = axios.create({
  baseURL: WEB_ADDR,
  transformRequest: [
    function(data, headers) {
      const reqData = JSON.stringify(data)
      return reqData
    }
  ],
  paramsSerializer: function(params) {
    return qs.stringify(params)
  },
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
          // error.response.message = '请求错误'
          error.response.message = error.response.data.error
          break
        case 401:
          error.response.message = '用户名或密码错误，请重新登录'
          break
        case 403:
          error.response.message = '拒绝访问'
          break
        case 404:
          error.response.message = `请求地址出错: ${error.response.config.url}`
          break
        case 500:
          error.response.message = '服务器内部错误'
          break
        default:
          error.response.message = '操作错误，请联系管理员。'
          break
      }
    }
    // Do something with response error
    return Promise.reject(error.response)
  }
)

export default axiosInstance
