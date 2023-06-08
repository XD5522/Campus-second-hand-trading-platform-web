export class Car{
    id:number;
    sellerId:number;
    productId:number;
    name:String;
    userName:String;
    num:number;
    price:number;
    img:String;


    constructor(id: number, productId: number, name: String, userName: String, num: number, price: number, img: String) {
        this.id = id;
        this.productId = productId;
        this.name = name;
        this.userName = userName;
        this.num = num;
        this.price = price;
        this.img = img;
    }
}