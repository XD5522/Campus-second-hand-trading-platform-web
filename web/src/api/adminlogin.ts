import request from "@/utils/request";

interface loginData{
    username:string,
    password:string
}
export function login(data:loginData){
    return request({
        url:'/login',
        method:'post',
        data
    })
}
