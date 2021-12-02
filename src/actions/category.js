import axios from "axios";
import {URL} from '../API'
import categoryReducer, {setCategory} from "../reducer/categoryReducer";
import {useSelector} from "react-redux";

export const saveNewCategoryToServer = (newCategories) => {
    return async dispatch => {
        try {
            let types = []
            types = newCategories.map(el => {
                return {
                    title: el.title
                }
            })
            console.log(types)
            const res = await axios.post(`${URL}/api/product/type`, {types: types})
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