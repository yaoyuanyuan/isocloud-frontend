import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '../store'
import {
  getToken
} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL:process.env.BASE_API,
  timeout: 5000 // 请求超时时间
})
var configobj;
// axios.defaults.headers.post['deviceld'] = '1';
// request拦截器
service.interceptors.request.use(config => {
  configobj = config;
  if (config.url == (config.baseURL + '/uac/auth/form') || config.url == (config.baseURL + '/uac/auth/code/image')) {

  } else {
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 200) {
      // Message({
      //   message: res.message,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      if (res.code == undefined) {

      } else {
        MessageBox.confirm(res.message, '', {
          showConfirmButton: false,
          cancelButtonText: '确定',
          type: 'warning'
        }).catch(() => {

        })
      }

      // 50008:非法的token; 401:token过期;  50014:Token 过期了;
      if (res.status === 500 || res.code === 401 || res.code === 50014 || res.error == 'invalid_token') {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return res.code
      //Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    if (error == 'Error: Request failed with status code 401'||error == 'Error: Request failed with status code 500') {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(1)
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }else {
      if (store.getters.token) {
        // Message({
        // 	message: error.message,
        // 	type: 'error',
        // 	duration: 5 * 1000
        // })
      } else {
        if (configobj.headers.deviceld) {} else {
          MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('FedLogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
        }
      }
    }
    var response = {
      'code': 201
    }
    return response
  }
)

export default service
