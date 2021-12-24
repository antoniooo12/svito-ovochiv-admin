import axios from "axios";
import {axiosCashConfig, URL} from '../API'
import tableReducer, {bulkDeleteCategories, cleanCategories, setCategory} from "../reducer/tableReducer";
import {setSubcategory} from "../reducer/subcategoryReducer";

export const saveNewCategoryToServer = ({newC, oldC}) => {
    return async dispatch => {
        try {
            debugger
            let oldCategoriesToDel = [], oldItemsToUpdate = [], newCategories = [], newCategoriesToDel = [];
            newC.forEach(el => {
                if (!el.toDelete) {
                    newCategories.push({category: el.category})
                } else {
                    newCategoriesToDel.push(el.id)
                }
            })
            oldC.forEach(el => {

                if (el.toDelete) {
                    oldCategoriesToDel.push(el.id)
                } else if (el.wasEdit) {
                    oldItemsToUpdate.push({category: el.category, id: el.id})
                }
            })

            let response
            await axios.post(`${URL}/api/product/type`, {newCategories, oldCategoriesToDel, oldItemsToUpdate})
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(cleanCategories())
                        dispatch(getAllCategory())
                    }
                })
        } catch (e) {
            console.log('проблеми зі зберіганням категорій на сервер')
            console.log(e)
        }
    }
}

export const getAllCategory = () => {
    return async dispatch => {
        try {
            // debugger
            const res = await axios.get(`${URL}/api/product/type`)

            dispatch(setCategory(res.data[0]))
        } catch (e) {
            console.log(e)
        }
    }
}
