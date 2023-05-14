import request from "@/utils/request";

export function search(name:String){
    return request({
        method:"get",
        url: `/product/search?name=${name}`
    })
}