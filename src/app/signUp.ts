export interface signUp {
    name: string,
    password: string,
    email: string
}

export interface login {
    email: string,
    password: string
}
export interface product {
    id:number,
    name: string,
    price: string,
    category: string,
    description: string,
    image: string,
    color: string,
    quantity:undefined|number
    productId:undefined|number
}

export interface cart {
    id:number,
    name: string,
    price: string,
    category: string,
    description: string,
    image: string,
    color: string,
    quantity:undefined|number,
    userId:number,
    productId:number
}

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    quantity:number | undefined,
    id:number|undefined

}