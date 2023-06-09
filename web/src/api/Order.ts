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
    }else if(state=="ToBeShipped"){
        return request({
            method:"get",
            url: `/order/SellerGetOrderListByPage&State`,
            params:{
                Id : id,
                PageSize : pagesize,
                PageNum : pagenum,
                State : "未发货"
            }
        })
    }else if(state=="ToBeReturned"){
        return request({
            method:"get",
            url: `/order/SellerGetOrderListByPage&State`,
            params:{
                Id : id,
                PageSize : pagesize,
                PageNum : pagenum,
                State : "待退货"
            }
        })
    }else return null;

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

export function finishOrder(order_id:number) {
    return request({
        method:"get",
        url: `/order/finishOrder`,
        params:{
            order_id:order_id,
        }
    })
}

export function CancelOrder(order_id:number){
    return request({
        method:"get",
        url: `/order/cancelOrder`,
        params:{
            order_id:order_id,
        }
    })
}

export function ReturnPD(order_id:number){
    return request({
        method:"get",
        url: `/order/returnProduct`,
        params:{
            order_id:order_id,
        }
    })
}

export function SellerOperation(order_id:number,state:string){
    if(state=="shipments"){
        return request({
            method:"get",
            url: `/order/seller`,
            params:{
                order_id:order_id,
                operation:"shipments"
            }
        })
    }
    else if(state=="AgreeReturn"){
        return request({
            method:"get",
            url: `/order/seller`,
            params:{
                order_id:order_id,
                operation:"AgreeReturn"
            }
        })
    }
    else if(state=="RefuseReturn"){
        return request({
            method:"get",
            url: `/order/seller`,
            params:{
                order_id:order_id,
                operation:"RefuseReturn"
            }
        })
    }else return null;
}