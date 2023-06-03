import request from "@/api/request";

export function getProductById(id:String){
    return request({
        method:"get",
        url: `/product?id=${id}`
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

