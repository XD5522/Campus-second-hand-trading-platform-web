export interface Product {
    img: string,     //商品图片连接
    name: string,       //商品名称,不超过20个字
    intro: string,      //商品介绍,不超过50个字
    price: number,      //商品价格,不能小于等于0
    his_sales: number,  //商品历史销量
    star: number,       //商品评分
}