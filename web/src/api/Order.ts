import request from "@/api/request";

export function getOrderListById(id:number){
    return request({
        method:"get",
        url: `/order/GetOrderList?id=${id}`
    })
}