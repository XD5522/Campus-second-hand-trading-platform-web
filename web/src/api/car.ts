import request from "@/api/request";
import {Car} from "@/views/product/type/car";

export function getCar(current:number){
    return request({
        method:"get",
        url: "/car",
        params:{
            current:current,
            num:10
        }
    })
}

export function upCar(id:number,num:number){
    return request({
        method:"post",
        url: "/car/upCar",
        params:{
            id:id,
            num:num
        }
    })
}

export function deleteCar(ids:number[]){
    return request({
        method:"delete",
        url: "/car",
        data:ids
    })
}