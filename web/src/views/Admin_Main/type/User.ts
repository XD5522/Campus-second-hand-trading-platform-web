export interface User {
    id : number,
    userName : string
    name : string
    type : string
    state : string
    city : string
    img : string
    license : string
}

export interface SelectData {
    page : number
    count : number
    pagesize : number
}
export class InitUserData {
    pageData : SelectData = {
        page : 1,
        count : 0,
        pagesize : 5
    }
    isShow = false
    active: User
    list : User[]=[]
}