// import axios from "axios";
// import {URL} from '../API'
// import {cleanNewSubcategory, setSubcategory} from "../reducer/subcategoryReducer";
//
// axios.defaults.headers = {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//     'Expires': '0',
// }
//
// export const saveNewSubcategoryToServer = ({newItems, oldItems}) => {
//     return async dispatch => {
//         try {
//             let oldItemsToDel = [], oldItemsToUpdate = [], newItemsToCreate = []
//             newItems.forEach(item => {
//                 if (!item.toDelete) {
//                     newItemsToCreate.push({categoryId: item.categoryId, subcategory: item.subcategory})
//                 }
//             })
//             oldItems.forEach(item => {
//                 if (item.toDelete) {
//                     oldItemsToDel.push(item.id)
//                 } else if (item.wasEdit) {
//                     oldItemsToUpdate.push({subcategory: item.subcategory, categoryId: item.categoryId, id: item.id})
//                 }
//             })
//
//             const res = await axios.post(`${URL}/api/product/subtype`, {
//                 oldItemsToDel,
//                 newItems: newItemsToCreate,
//                 oldItemsToUpdate
//             })
//                 .then((res) => {
//                     if (res.status === 200) {
//                         dispatch((cleanNewSubcategory()))
//                         dispatch(getAllSubcategories())
//                     }
//                 })
//         } catch (e) {
//             console.log('проблеми зі зберіганням підкатегорій на сервер')
//
//             console.log(e)
//         }
//
//     }
// }
//
// export const getAllSubcategories = () => {
//     return async dispatch => {
//         try {
//             const res = await axios.get(`${URL}/api/product/subtype`)
//             dispatch(setSubcategory(res.data[0]))
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }