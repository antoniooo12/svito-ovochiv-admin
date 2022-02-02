

export type ProductAttributes = {
    id: number
    value: string
    actual: boolean
    price: number
    priority: number
    image: string
    TypeOfProductId?: number
    SubcategoryId?: number
}



export type SubcategoryAttributes = {
    id: number
    value: string
    CategoryId: number
}



export type CategoryAttributes = {
    id: number
    value: string
}


export type TypeOfProductAttributes = {
    id: number
    value: string
}





export type GoodsAttributes = ProductAttributes &
    SubcategoryAttributes &
    CategoryAttributes &
    TypeOfProductAttributes



