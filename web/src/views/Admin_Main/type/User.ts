export interface User {
    id : number,
    userName : string
    name : string
    type : string
    state : string
    phone : string
    bankCard : string
}

export interface SelectData {
    page : number
    count : number
    pagesize : number
}

export class InitData {
    pageData : SelectData = {
        page : 1,
        count : 0,
        pagesize : 10
    }
    list : User[]=[]
}