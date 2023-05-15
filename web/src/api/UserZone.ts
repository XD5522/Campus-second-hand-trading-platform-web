import request from "@/api/request";
import {Product} from "@/views/User_Zone/type/Product";

export function AddNewProduct(data: Product) {
    return request({
        url: '/user/AddNewProduct',
        method: 'post',
        data: data // 传入登录数据
    });
}