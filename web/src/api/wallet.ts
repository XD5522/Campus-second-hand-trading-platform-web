import request from "@/api/request";

export function getUser(){
    return request({
        method:"get",
        url: "/wallet/user",
    })
}
export function recharge(num:number){
    return request({
        method:"get",
        url: "/wallet/recharge",
        params:{
            num:num
        }
    })
}
export function getmoney(num:number){
    return request({
        method:"get",
        url: "/wallet/getMoney",
        params:{
            num:num
        }
    })
}

export function incomeRecord(){
    return request({
        method:"get",
        url: "/wallet/record/income",

    })
}
export function payoutRecord(){
    return request({
        method:"get",
        url: "/wallet/record/payout",

    })
}
export function rechargeRecord(){
    return request({
        method:"get",
        url: "/wallet/record/recharge",

    })
}
export function getMoneyRecord(){
    return request({
        method:"get",
        url: "/wallet/record/getMoney",

    })
}
interface address{
    userId:number;
    name:String;
    phone:String;
    address:String;
}

export function saveAddr(addr:address){
    return request({
        method:"post",
        url: "/user/address",
        data:addr

    })
}
export function deleteAddress(id:number){
    return request({
        method:"delete",
        url: "/user/address",
        params:{
            id:id
        }

    })
}