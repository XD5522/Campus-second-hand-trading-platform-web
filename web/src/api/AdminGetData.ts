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

export function searchProduct(name : String, order : String, asc : String, current : number, size : number) {
    return request({
        method:"get",
        url: '/admin/searchProduct',
        params: {
            name : name,
            current : current,
            order : order,
            asc : asc,
            num : size
        }
    })
}

export function searchAuditProduct(name : String, order : String, asc : String, current : number, size : number) {
    return request({
        method:"get",
        url: '/admin/searchAuditProduct',
        params: {
            name : name,
            current : current,
            order : order,
            asc : asc,
            num : size
        }
    })
}

export function releaseProduct(data : number) {
    return request({
        method: 'post',
        url: '/admin/releaseProduct',
        params: {
            productId : data,
            state : 'normal'
        }
    })
}

export function downProduct(data : number) {
    return request({
        method: 'post',
        url: '/admin/downProduct',
        params: {
            productId : data,
            state : 'ban'
        }
    })
}

export function deleteProduct(data : number) {
    return request({
        method: 'post',
        url: '/admin/deleteProduct',
        params: {
            productId : data
        }
    })
}

export function edit(data : User) {
    return request({
        method: 'post',
        url: '/admin/edit',
        params: {
            id : data.id,
            userName : data.userName,
            name : data.name,
            city : data.city,
            type : data.type
        }
    })
}

export function reset(data : string) {
    return request({
        method: 'post',
        url: '/admin/reset',
        params: {
            userName: data
        }
    })
}