import axios from 'axios'

export function request(config) {
  //1.封装实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })

  //2.拦截器
  instance.interceptors.request.use(config => config, err => {console.log(err)})

  instance.interceptors.response.use(res => res.data, err => {console.log(err)})

  //3.发送真正的请求
  return instance(config)
}