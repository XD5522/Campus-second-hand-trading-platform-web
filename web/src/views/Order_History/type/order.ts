export interface Order{
    id: number,
    product_id: number,     //商品id
    product_name: string,   //商品名称
    create_time:Date,       //订单创建时间
    finish_time:Date,       //收货时间
    trading: string,        //交易方式
    buyer: number,          //买家id
    seller: number,         //卖家id
    state: string           //订单状态
}