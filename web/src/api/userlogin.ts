import request from "@/utils/request";

interface loginData{
    username:string,
    password:string
}

/**
 * 普通用户的登陆方法
 * @param data
 */
export function login(data: loginData) {
    return request({
        url: '/',//TODO 完善普通用户登陆方法
        method: 'post',
        data: data // 传入登录数据
    });
}
