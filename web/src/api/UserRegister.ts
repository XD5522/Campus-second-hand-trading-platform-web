import request from "@/api/request";
import {RegisterData} from "@/views/User_Register/type/RegisterData";

/**
 * 普通用户的注册方法
 * @param data
 */
export function userRegister(data: RegisterData) {
    return request({
        url: '/user/register',
        method: 'post',
        data: data // 传入注册数据
    });
}
