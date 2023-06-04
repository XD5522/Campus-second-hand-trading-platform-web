import request from "@/api/request";
import {NewProduct} from "@/views/User_Zone/type/NewProduct";
import {User} from "@/views/ChangeUserMsg/type/User";

export function AddNewProduct(data: NewProduct) {
    return request({
        url: '/user/AddNewProduct',
        method: 'post',
        data: data // 传入商品数据
    });
}

export function getUserMsg(id:number){
    return request({
        url: '/user/getUserMsg',
        method: 'get',
        params:{
            user_id:id,
        }
    });
}

export function GetPDList(user_id:number,pagesize:number,pagenum:number){
    return request({
        url: '/user/GetPDList',
        method: 'get',
        params:{
            user_id:user_id,
            PageSize:pagesize,
            PageNum:pagenum,
        }
    });
}

export function ChangePDState(product_id:number,state:string){
    return request({
        url: '/user/ChangePDState',
        method: 'post',
        params:{
            product_id:product_id,
            state:state,
        }
    });
}

export function GetAllUserMsg(user_id:number){
    return request({
        url: '/user/GetAllUserMsg',
        method: 'get',
        params:{
            user_id: user_id,
        }
    });
}

export function ChangeUserMsg(data:User){
    return request({
        url: '/user/ChangeUserMsg',
        method: 'post',
        data: data,
    });
}