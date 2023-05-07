class product{
    id: number;
    userId: number;
    userName: String;
    name: String;
    intro: String;
    price: number;
    stock: number;
    hisSales: number;
    size: String;
    type: String;
    star: number;
    trading: String;
    state: String;


    constructor(id: number, userId: number, userName: String, name: String, intro: String, price: number, stock: number, hisSales: number, size: String, type: String, star: number, trading: String, state: String) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.name = name;
        this.intro = intro;
        this.price = price;
        this.stock = stock;
        this.hisSales = hisSales;
        this.size = size;
        this.type = type;
        this.star = star;
        this.trading = trading;
        this.state = state;
    }
}