import request from "@/utils/request";

export function getProductById(id:String){
    return request({
        method:"get",
        url: `/product?id=${id}`
    })
}
