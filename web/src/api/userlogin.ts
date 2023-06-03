import request from "@/api/request";

interface loginData{
    userName:string,
    userPassword:string
}

/**
 * 普通用户的登陆方法
 * @param data
 */
export function login(data: loginData) {
    return request({
        url: '/user/login',
        method: 'post',
        data: data // 传入登录数据
    });
}
