
export type  OrderedGoodAttributes = {
    id: number
    count: number
    totalSum: number
    ProductId: number
    OrderedGoodListId: number
}



export type OrderedGoodListAttributes = {
    id: number
}


export type OrderAdditionalInformationAttributes = {
    id: number
    sum: number
    status: string
}





export type OrderAttributes = {
    id: number
    ClientId: number
    OrderedGoodListId: number
    OrderAdditionalInformationId: number
}

