export interface Product{
    id:number,
    img: string,     //商品图片连接
    name: string,       //商品名称,不超过20个字
    hisSales: number,  //商品历史销量
    price: number,      //商品价格,不能小于等于0
    stock: number,      //商品库存,不能小于1
    star: number,       //商品评分
    state: string,      //商品状态(审核、正常、封禁、下架)
}