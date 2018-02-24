'use strict'

import axios from 'axios'

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  if (res.status === -404) {
    alert(res.msg)
    return false
  }
  if(res.requeststatus === 'F'){
    alert(res.responsebody)
    return false
  }
  if(res.requeststatus === 'S' && res.responsebody == undefined){
    alert(res.responseMessage)
    return false
  }
  return res.responsebody || res
}

export default {
  commonApi: 'www.baidu.com',
  post (url, data) {
    return axios({
      method: 'post',
      baseURL: '',
      url,
      data: data,
      timeout: 10000,
      responseType: 'json',
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },

  get (url, params) {
    return axios({
      method: 'get',
      url,
      data: {},
      params, // get 请求时带的参数
      timeout: 10000,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  },

  put (url, data) {
    return axios({
      url,
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
      timeout: 1000,
      withCredentials: false,
      responseType: 'json',
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }
}
