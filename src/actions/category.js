import axios from "axios";
import {URL} from '../API'
import categoryReducer, {bulkDeleteCategories, cleanCategories, setCategory} from "../reducer/categoryReducer";
import {useSelector} from "react-redux";

export const saveNewCategoryToServer = ({newC, oldC}) => {
    return async dispatch => {
        try {


            let oldCategoriesToDel = [], newCategories = [], newCategoriesToDel = [];
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
                }
            })

            console.log(oldCategoriesToDel)
            let response
            await axios.post(`${URL}/api/product/type`, {newCategories, oldCategoriesToDel})
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(bulkDeleteCategories(newCategoriesToDel))
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
        const res = await axios.get(`${URL}/api/product/type`)
        dispatch(setCategory(res.data))
        try {
        } catch (e) {
            console.log(e)
        }
    }
}