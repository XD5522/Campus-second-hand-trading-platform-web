import request from "@/api/request";

export function search(name:String,order:String,asc:String,current:number){
    return request({
        method:"get",
        url: `/product/search`,
        params: {
            name:name,
            current:current,
            order:order,
            asc:asc,
            num:12
        }
    })
}