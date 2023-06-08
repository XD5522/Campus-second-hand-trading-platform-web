import request from "@/api/request";
import {Car} from "@/views/car/type/car";

export function getAddress(){
    return request({
        method:"get",
        url: "/pay/address",
    })
}

export function getCou(){
    return request({
        method:"get",
        url: "/pay/coupon",
    })
}

export function getWallet(){
    return request({
        method:"get",
        url: "/pay/wallet",
    })
}
export function getScore(){
    return request({
        method:"get",
        url: "/pay/score",
    })
}
export function addOrder(cars:Car[],buyer:number,name:String,trading:String,address:String,phone:String,coupon:number,score:number){
    return request({
        method:"post",
        url: "/pay/addOrder",
        data:cars,
        params:{
            buyer:buyer,
            name:name,
            trading:trading,
            address:address,
            phone:phone,
            coupon:coupon,
            score:score
        }
    })
}