import request from "@/api/request";
import {Car} from "@/views/product/type/car";

export function getProductById(id:String){
    return request({
        method:"get",
        url: `/product?id=${id}`
    })
}

export function proToCar(car:Car){
    return request({
        method:"post",
        url: "/car",
        data:car
    })
}

// export function addProduct(data:FormData){
//     return request({
//         method:"post",
//         url: `/product`,
//         data: data,
//         headers:{
//             'Content-Type': 'multipart/form-data',
//         }
//     })
// }

// export function updateImg(formData:FormData){
//     return request({
//         method:"post",
//         url:"/product/updateImg",
//         data:formData,
//         headers:{
//             'Content-Type': 'multipart/form-data',
//         }
//     })
// }

