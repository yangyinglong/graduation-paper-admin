// import vue from 'vue'
import axios from 'axios'
// import qs from 'qs'

axios.defaults.timeout = 60000                        // 响应时间
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'          // 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'          // 配置请求头
axios.defaults.baseURL = '/api'   // 配置线上接口地址
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  // 在发送请求之前做某件事
  // if (config.method === 'post') {
  //   config.data = qs.stringify(config.data)
  // }
  return config
}, (error) => {
  return Promise.reject({
    stat: 'error',
    msg: '参数错误！'
  })
})
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  if (res.status == '200') {
    return res.data
  } else {
    return Promise.reject({
      stat: 'error',
      msg: '服务出错，请重试！'
    })
  }
}, (error) => {
  var msg = ''
  if (error.response) {
    if (error.response.status == '404') {
      msg = '服务出错，请稍候再试！'
    } else if (error.response.status == '408') {
      msg = '响应超时，请重试！'
    } else {
      msg = '服务出错，请稍候再试uuuu！'
    }
  } else {
    if (error.code == 'ECONNABORTED') {
      msg = '请求超时，请重试！'
    } else {
      msg = '网络异常，请检查网络是否正常打开！'
    }
  }
  return Promise.reject({
    stat: 'error',
    msg: msg
  })
})

// 返回一个Promise(发送post请求)
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(response => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

// 返回一个Promise(发送get请求)
export function getFetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params}).then(response => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default {

  Login(params) {
    return fetch('/authorize/login', params)
  },
  Register(params) {
    return fetch('/authorize/register', params)
  },
  ForgorPass(params) {
    return fetch('/authorize/forgotPass', params)
  },
  EditUser(params) {
    return fetch('/authorize/editUser', params)
  },
  ShowLaboratory(params) {
    return fetch('/laboratory/showLaboratory', params)
  },
  ShowLabNum(params) {
    return fetch('/laboratory/showLabNum', params)
  },
  AddOrder(params) {
    return fetch('/order/addOrder', params)
  },
  ShowOrder(params) {
    return fetch('/order/showOrder', params)
  },
  ShowOrderNum(params) {
    return fetch('/order/showOrderNum', params)
  },
  EditOrder(params) {
    return fetch('/order/editOrder', params)
  },
  CancelOrder(params) {
    return fetch('/order/cancelOrder', params)
  },
  ShowLabBespeak(params) {
    return fetch('/order/showOrderBespeakTime', params)
  },
  CancelLab(params) {
    return fetch('/laboratory/cancelLab', params)
  },
  AdminShowLaboratory(params) {
    return fetch('/laboratory/adminShowLaboratory', params)
  },
  AdminShowLabNum(params) {
    return fetch('/laboratory/adminShowLabNum', params)
  },
  AddLaboratory(params) {
    return fetch('/laboratory/addLaboratory', params)
  },
  EditLaboratory(params) {
    return fetch('/laboratory/editLaboratory', params)
  },
  AdminShowOrderNum(params) {
    return fetch('/order/adminShowOrderNum', params)
  },
  AdminShowOrder(params) {
    return fetch('/order/adminShowOrder', params)
  },
  AdminReviewOrder(params) {
    return fetch('/order/adminReviewOrder', params)
  }
}
