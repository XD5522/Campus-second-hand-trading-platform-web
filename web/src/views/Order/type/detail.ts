export interface Detail{
    id: number,
    create_time:Date,       //订单创建时间
    finish_time:Date,       //收货时间
    seller_id: number,
    seller_name:string,
    seller_img :string,
    buyer_id: number,
    buyer_name:string,
    buyer_img :string,
    product_id: number,     //商品id
    product_name: string,   //商品名称
    product_img:string,
    product_num: number,
    price:number,
    coupon_id:number,
    coupon_type:string,
    total:number,
    buyer_payout:number,
    score:number,
    trading: string,        //交易方式
    state: string           //订单状态
}