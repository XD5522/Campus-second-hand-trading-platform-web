import request from "@/api/request";

export function search(name:String,order:String,current:number){
    return request({
        method:"get",
        url: `/product/search`,
        params: {
            name:name,
            current:current,
            order:order,
            num:10
        }
    })
}