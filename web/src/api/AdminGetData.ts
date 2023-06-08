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

export function searchUser(searchText : string, page : number, pageSize : number) {
    return request({
        url: '/admin/searchUser',
        method: 'get',
        params: {
            searchText: searchText,
            page : page,
            pageSize : pageSize
        }
    })
}

export function searchAuditUser(searchText : string, page : number, pageSize : number) {
    return request({
        url: '/admin/searchAuditUser',
        method: 'get',
        params: {
            searchText: searchText,
            page : page,
            pageSize : pageSize
        }
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

export function noPassUser(data : string) {
    return request({
        url: '/admin/noPassUser',
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

export function searchProject(name : String, order : String, asc : String, current : number, size : number) {
    return request({
        method:"get",
        url: `/admin/searchProject`,
        params: {
            name : name,
            current : current,
            order : order,
            asc : asc,
            num : size
        }
    })
}

// export function deleteProject(data : String) {
//     return request({
//         method: 'post',
//         url: '/admin/deleteProject',
//         params: {
//             name : data
//         }
//     })
// }