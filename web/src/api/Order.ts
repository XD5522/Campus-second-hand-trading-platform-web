import request from "@/api/request";

export function getOrderListById(id:number,pagesize:number,pagenum:number,state:string){
    if(state=="all"){
        return request({
            method:"get",
            url: `/order/GetOrderListByPage`,
            params:{
                Id : id,
                PageSize : pagesize,
                PageNum : pagenum,
            }
        })
    }
    else if(state=="finish"){
        return request({
            method:"get",
            url: `/order/GetOrderListByPage&State`,
            params:{
                Id : id,
                PageSize : pagesize,
                PageNum : pagenum,
                State : "已完成"
            }
        })
    }
    else if(state=="unfinished"){
        return request({
            method:"get",
            url: `/order/GetOrderUnfinishedListByPage`,
            params:{
                Id : id,
                PageSize : pagesize,
                PageNum : pagenum
            }
        })
    }else{
        return null;
    }
}
export function GetOrderDetail(order_id:number){
    return request({
        method:"get",
        url: `/order/GetOrderDetail`,
        params:{
            order_id:order_id,
        }
    })
}