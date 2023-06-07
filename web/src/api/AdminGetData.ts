import request from "@/api/request";
import {User} from "@/views/Admin_Main/type/User";

/**
 * 获取所有用户信息
 */
export function getAllUser() {
    return request({
        url: '/admin/getUserData',
        method: 'get'
    });
}

/**
 *  获取待审核的用户信息
 */
export function getAuditUser() {
    return request({
        url: '/admin/getAuditUserData',
        method: 'get'
    })
}

export function passUser(data : string) {
    return request({
        url: '/admin/passUser',
        method: 'post',
        params: {
            userName: data
        }
    })
}

export function banUser(data : string) {
    return request({
        url: '/admin/banUser',
        method: 'post',
        params: {
            userName: data
        }
    })
}

export function deleteUser(data : string) {
    return request({
        url: '/admin/deleteUser',
        method: 'post',
        params: {
            userName: data
        }
    })
}