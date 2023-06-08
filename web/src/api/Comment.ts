import request from "@/api/request";

export function GetCommentPage(id:number,pagesize:number,pagenum:number,state:string){
    if(state=="PD"){
        return request({
            method:"get",
            url: `/comment/GetListByUser`,
            params:{
                user_id : id,
                PageSize : pagesize,
                PageNum : pagenum,
            }
        })
    }
    else if(state=="ER"){
        return request({
            method:"get",
            url: `/comment/GetPersonComment`,
            params:{
                user_id : id,
                PageSize : pagesize,
                PageNum : pagenum,
                State: "ER",
            }
        })
    }
    else{
        return request({
            method:"get",
            url: `/comment/GetPersonComment`,
            params:{
                user_id : id,
                PageSize : pagesize,
                PageNum : pagenum,
                State: "EE",
            }
        })
    }
}
export function GetComment(user_id:number,product_id:number){
    return request({
        method:"get",
        url: `/comment/GetOrderComment`,
        params:{
            user_id:user_id,
            product_id:product_id,
        }
    })
}


export function GetProductComments(id:number,pagesize:number,pagenum:number) {
    return request({
        method:"get",
        url: "/comment/getProductComments",
        params:{
            id : id,
            current : pagesize,
            num : pagenum,
        }
    })
}