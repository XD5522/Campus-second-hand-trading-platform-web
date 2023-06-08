import request from "@/api/request";

interface loginData{
    adminAccount:string,
    adminPassword:string
}

/**
 * 管理员页面的登陆方法
 * @param data
 */
export function login(data: loginData) {
    return request({
        url: '/admin/login',
        method: 'post',
        data: data // 传入登录数据
    });
}
