import axios from 'axios'

const $http = axios.create({
  baseURL: 'https://tmsapi.hucai.com/',
  // baseURL: 'http://192.172.10.7/',
  timeout: 15000, // 请求超时时间,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
export default $http
