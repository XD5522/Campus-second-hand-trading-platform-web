export interface Form {
    user_id: string,
    product_name: string,//商品名称,不超过20个字
    product_intro: string,//商品介绍,不超过50个字
    product_price: number,//商品价格,不能小于等于0
    product_stock: number,//商品库存,不能小于1
    product_size: string,//商品尺寸,不能超过50个字
    product_type: string,//商品类型,不能超过10个字
}
