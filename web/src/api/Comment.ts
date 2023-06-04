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
}