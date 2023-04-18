import request from "@/utils/request";

interface loginData{
    username:string,
    password:string
}

/**
 * 管理员页面的登陆方法
 * @param data
 */
export function login(data:loginData){
    return request({
        url:'/login',
        method:'post',
        data
    })
}
