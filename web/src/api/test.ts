import request from "@/api/request"

export default {
    test(){
        return request({
            url:'/test',
            method:'Get'
        })
    }
}

