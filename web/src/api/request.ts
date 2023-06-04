import axios from 'axios'

const request = axios.create(
    {
        baseURL:"http://localhost:8080",
        timeout:5000,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'token':'',
        }
    }
)
//请求拦截
request.interceptors.request.use((config)=>{
    // @ts-ignore
    config.headers = config.headers || {}
    if(localStorage.getItem('token')){//将token附加到请求中
        config.headers.token = localStorage.getItem('token') || ''
    }
    return config
})
//响应拦截
request.interceptors.response.use((res)=>{
    const code:number = res.status
    if(code != 200){
        return Promise.reject(res.data)
    }
    return res.data
},(error)=>{
    console.log("后端返回错误信息    "+error)
})

export default request