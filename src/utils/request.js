import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui';
import { VueAxios } from './axios'
import cookies from '@/common/cookies'
import router from '@/router'
let timer = null
const that = this
export default function generateRequest(config){
  console.log('process.env',process.env)
  let base_url = process.env.NODE_ENV ==='prod'? process.env.VUE_APP_API_BASE_URL : '/api'
  console.log(333333333333, base_url)

  const defaultConfig = {
    // timeout: 1000 * 30,
    timeout: 600000,
    needTocken: true,
    baseURL: base_url,
    isNeedMessage: true,
    isNeedToken: true
  }
  const _config = Object.assign({}, defaultConfig, config)
  const _axios = axios.create({
     baseURL: _config.baseURL,
     timeout: _config.timeout,
     headers:{
      guoezu:'b696bcc4-26d8-4c27-a138-83bcf0ec79e9'
     }
   })
  _axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token && _config.isNeedToken) {
      // config.headers['Access-Token'] = token
      // config.headers['token'] = token
      config.headers['guoezu'] = token
    }
    return config
  }, errorHandler)

  _axios.interceptors.response.use((response) => {
    console.log('response',response)
    if(response.data.code === 401) {
      Message({
        type: "error",
        message: '登录失效，请重新登录',
      });
        localStorage.clear();
        that.$router.push({ name: "login" });
    } else {
      return response.data
    }
  }, errorHandler)
  return _axios
}

// // 创建 axios 实例
// const request = axios.create({
//   // API 请求的默认前缀
//   baseURL: base_url,
//   timeout: 1000 * 30 // 请求超时时间
// })

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = cookies.getCookies("token")

    // if (error.response.status === 403) {
    //   notification.error({
    //     message: 'Forbidden',
    //     description: data.message
    //   })
    // }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      Message({
        type: "error",
        message: '登录失效，请重新登录',
      });
        localStorage.clear();
        router.push({ name: "login" });
    }
  }
  return Promise.reject(error)
}

// // request interceptor
// request.interceptors.request.use(config => {
//   const token = cookies.getCookies("token")
  
//   // 如果 token 存在
//   // 让每个请求携带自定义 token 请根据实际情况自行修改
//   if (token) {
//     //config.headers['Access-Token'] = token
//     config.headers['token'] = token
//   }
//   return config
// }, errorHandler)

// // response interceptor
// request.interceptors.response.use((response) => {
//   return response.data
// }, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, generateRequest())
  }
}

// export default request

export {
  installer as VueAxios,
  // request as axios
}