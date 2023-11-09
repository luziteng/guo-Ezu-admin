import axios from 'axios'
import store from '@/store'
// import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import cookies from '@/common/cookies'
import router from '@/router'
let timer = null
export default function generateRequest(config){
  let base_url = process.env.VUE_APP_API_BASE_URL

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
     timeout: _config.timeout
   })
  _axios.interceptors.request.use(config => {
    const token = cookies.getCookies("token")
    
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token && _config.isNeedToken) {
      //config.headers['Access-Token'] = token
      // config.headers['token'] = token
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  }, errorHandler)

  _axios.interceptors.response.use((response) => {
    if(response.data.code === 1001) {
    //   notification.error({
    //     message: '注意',
    //     description: response.data.msg
    //   })
      store.dispatch('Logout')
      return Promise.reject(response.data.msg)
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
        // clearTimeout(timer)
        // timer = null
        // timer = setTimeout(()=>{
        //   notification.error({
        //     message: '登录过期',
        //     description: '登录已过期，请重新登录。'
        //   })
        // },1000)
      cookies.removeCookies("token")
      // router.currentRoute.path !== 'login' &&
      //       router.replace({
      //         path: 'login',
      //         query: { redirect: router.currentRoute.path },
      //       })
      // if (token) {
      //   store.dispatch('Logout').then(() => {
      //     setTimeout(() => {
      //       window.location.reload()
      //     }, 1500)
      //   })
      // }
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