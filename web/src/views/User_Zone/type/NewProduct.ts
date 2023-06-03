export interface NewProduct {
    imgurl: string,     //商品图片连接
    user_id: number,    //商品对应的用户id
    user_name: string,  //商品对应的用户名
    name: string,       //商品名称,不超过20个字
    intro: string,      //商品介绍,不超过50个字
    price: number,      //商品价格,不能小于等于0
    stock: number,      //商品库存,不能小于1
    his_sales: number,  //商品历史销量
    size: string,       //商品尺寸,不能超过50个字
    star: number,       //商品评分
    type: string,       //商品类型,不能超过10个字
    trading: string,    //交易方式
    state: string,      //商品状态(审核、正常、封禁)
    flag: number        //是否已被删除
}
