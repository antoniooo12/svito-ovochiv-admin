// const URL = 'http://localhost:4800'
import {TableCreator} from "./types/TableCreatorTypes";

const URL = 'http://localhost:3300'


// {headers: {'Content-Type': 'application/json','Cache-Control' : 'no-cache'}
export const axiosCashConfig = {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'}

const path = {
    ALL_PRODUCTS: 'allProducts',
    CATEGORY: 'category',
    SUBCATEGORY: 'subcategory',
    price: {}
}






const columns = {
    CATEGORY: "категорія"
}

export {
    columns,
    path,
    URL,
}