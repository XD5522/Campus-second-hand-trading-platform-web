import request from "@/api/request";

export function searchProduct(name : String, order : String, asc : String, current : number, size : number) {
    return request({
        method:"get",
        url: '/main/searchProduct',
        params: {
            name : name,
            current : current,
            order : order,
            asc : asc,
            num : size
        }
    })
}