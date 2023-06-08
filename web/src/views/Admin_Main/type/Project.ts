import {User} from "@/views/Admin_Main/type/User";

export interface Product{
    id: number;
    userId: number;
    userName: string;
    name: string;
    intro: string;
    price: number;
    stock: number;
    hisSales: number;
    size: string;
    type: string;
    star: number;
    trading: string;
    state: string;
    img: string;
}

export interface SelectData {
    page : number
    count : number
    pagesize : number
    order : string

    asc : string
}

export class InitProjectData {
    pageData : SelectData = {
        page : 1,
        count : 0,
        pagesize : 5,
        order : 'id',
        asc : 'ASC'
    }
    list : Product[]=[]
}