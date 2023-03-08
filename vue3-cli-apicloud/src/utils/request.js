// 首先导入 axios
import axios from 'axios'
import { stringify } from 'qs'
import { showToast } from 'vant'
import 'vant/es/toast/style'
// apicloud打包后无法识别代理
const requestUrl =
  process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/api'

const printUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_PRINT_API
    : '/print'

// 自己创建一个axios对象
const request = axios.create({
  baseURL: requestUrl, // 基础路径，默认是/ ，如果改了，会自动添加到你请求url前面
  timeout: 10000, // 请求超时，5000毫秒
  headers: { 'X-Custom-Header': 'foobar' }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 相应拦截器
request.interceptors.response.use(
  (response) => {
    // 在2xx范围内的任何状态代码都会触发此功能
    // 处理响应数据
    return response
  },
  function (error) {
    // 任何超出2xx范围的状态代码都会触发此功能
    // 处理响应错误
    return Promise.reject(error)
  }
)
const get = (url, params) => {
  url += '.do'
  return new Promise((resolve, reject) => {
    request
      .get(url, { params })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          return showToast({
            message:
              '错误：' + process.env.VUE_APP_BASE_API + url + '请求失败！',
            position: 'top',
            duration: 0,
            closeOnClick: true
          })
        } else {
          return Promise.reject(error)
        }
      })
  })
}
/**
 * 大部分服务器能够识别的请求头为application/x-www-form-urlencoded，
 * 而我们axios的post请求的请求头是application/json，所以我们需要对参数进行转换。
 * @param {*} url
 * @param {*} params
 * @returns
 */
const post = (url, params) => {
  url += '.do'
  return new Promise((resolve, reject) => {
    request
      .post(url, stringify(params))
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          return showToast({
            message:
              '错误：' + process.env.VUE_APP_BASE_API + url + '请求失败！',
            position: 'top',
            duration: 0,
            closeOnClick: true
          })
        } else {
          return Promise.reject(error)
        }
      })
  })
}

const print = (params, callback) => {
  axios
    .post(printUrl, {
      method: 'printreport',
      ReportType: 'gridreport',
      ReportName: params.reportName,
      ReportVersion: '1',
      ReportUrl: '',
      Copies: '1',
      Duplex: '0',
      vue: '1', //需要设置为 1, 要不 局域网打印等 含有\\的无法识别 , vue 提交的数据需要把\\替换为\
      PrinterName: params.printerName, //'\\\\22.22.13.16\\1106',//这个无法转义
      PrintOffsetX: '0',
      PrintOffsetY: '0',
      Preview: '0',
      token: 'aa',
      taskId: params.taskId,
      exportfilename: '',
      exportfiletype: '',
      Field: params.fields,
      Data: params.data
    })
    .then(function (response) {
      callback(response.data)
    })
    .catch((error) =>
      showToast({
        message: '错误：打印机连接失败！',
        position: 'top',
        duration: 0,
        closeOnClick: true
      })
    )
}

export default {
  get,
  post,
  print
}
