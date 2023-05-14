import request from "@/api/request";

export function getProductById(id:String){
    return request({
        method:"get",
        url: `/product?id=${id}`
    })
}
