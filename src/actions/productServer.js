import axios from "axios";
import {URL} from '../API'
import {cleanNewSubcategory, setSubcategory} from "../reducer/subcategoryReducer";
import {getAllSubcategories} from "./subcategory";
import {cleanNewProduct, setProduct} from "../reducer/productReducer";

export const saveProductsToServer = ({newItems, oldItems}) => {
    return async dispatch => {
        try {
            let oldItemsToDel = [], oldItemsToUpdate = [], newItemsToCreate = []
            newItems.forEach(item => {
                console.log(item)
                if (!item.toDelete) {
                    newItemsToCreate.push({
                        productName: item.productName,
                        subcategoryId: item.subcategoryId,
                        price: item.price,
                        unit: item.unit,
                    })
                }
            })
            oldItems.forEach(item => {
                if (item.toDelete) {
                    oldItemsToDel.push(item.id)
                } else if (item.wasEdit) {
                    oldItemsToUpdate.push({
                        subcategory: item.subcategory,
                        categoryId: item.categoryId,
                        id: item.id
                    })
                }
            })
            console.log(oldItemsToDel[0])
            const res = await axios.post(`${URL}/api/product/product`, {
                oldItemsToDel,
                newItems: newItemsToCreate,
                oldItemsToUpdate
            }).then((res) => {
                if (res.status === 200) {
                    dispatch(cleanNewProduct())
                    dispatch(getAllProducts())
                }
            })
        } catch (e) {
            console.log(e)
        }

    }
}

export const getAllProducts = () => {
    return async dispatch => {
        try {
            const res = await axios.get(`${URL}/api/product/product`)
            console.log(res.data[0])
            dispatch(setProduct(res.data[0]))
        } catch (e) {
            console.log(e)
        }
    }
}