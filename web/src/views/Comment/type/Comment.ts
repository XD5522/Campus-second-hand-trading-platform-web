export interface Comment{
    id: number,
    user_id: number,
    user_name: string,
    img: string,
    product_id: number,
    product_name: string,
    content: string,
    star: number,
    time: Date
}