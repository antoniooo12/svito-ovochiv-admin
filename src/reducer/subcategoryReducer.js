const CREATE_SUB_CATEGORY = 'CREATE_SUB_CATEGORY'
const CHANGE_SUB_CATEGORY = "CHANGE_SUB_CATEGORY"
const DELETE_SUBCATEGORY = 'DELETE_SUBCATEGORY'
const CLEAN_NEW_SUBCATEGORY = 'CLEAN_NEW_SUBCATEGORY'
const SET_SUBCATEGORY = 'SET_SUBCATEGORY'
const EDIT_OLD_SUBCATEGORY = 'EDIT_OLD_SUBCATEGORY'

const defaultState = {
    allSubcategory: [],
    newSubcategory: [],
}

export function subcategoryReducer(state = defaultState, action) {
    switch (action.type) {
        case CREATE_SUB_CATEGORY: {
            const item = {
                id: Date.now()
            }
            return {
                ...state,
                newSubcategory: [...state.newSubcategory, item],
            }
        }
        case CHANGE_SUB_CATEGORY: {
            const {type, value, id, isNew} = action.payload
            let searchedArray = []
            if (isNew) {
                searchedArray = state.newSubcategory
            } else {
                searchedArray = state.allSubcategory
            }
            const indexOfNew = searchedArray.findIndex(el => el.id === id)
            let changed = searchedArray.filter(el => el.id === id)[0]
            console.log(searchedArray)
            if (type === 'subcategory') {
                changed.subcategory = value
            } else if (type === 'category') {
                changed.category = value
                changed.categoryId = value.split(':').shift()
            }
            return {
                ...state,
                newSubcategory: [
                    ...state.newSubcategory
                ]
            }
        }
        case DELETE_SUBCATEGORY: {
            const {isNew, id} = action.payload
            if (isNew) {
                const indexOfNew = state.newSubcategory.findIndex(el => el.id === id)
                let change = state.newSubcategory.filter(el => el.id === id)[0]
                change.toDelete = !change.toDelete
                return {
                    ...state,
                    newSubcategory: [...state.newSubcategory.slice(0, indexOfNew),
                        change,
                        ...state.newSubcategory.slice(indexOfNew + 1)]
                }
            } else {
                const indexOfNew = state.allSubcategory.findIndex(el => el.id === id)
                let change = state.allSubcategory.filter(el => el.id === id)[0]
                change.toDelete = !change.toDelete
                return {
                    ...state,
                    allSubcategory: [...state.allSubcategory.slice(0, indexOfNew),
                        change,
                        ...state.allSubcategory.slice(indexOfNew + 1)]
                }
            }
            return {
                ...state,
            }
        }
        case SET_SUBCATEGORY: {
            return {...state, allSubcategory: action.payload}
        }
        case CLEAN_NEW_SUBCATEGORY: {
            return {...state, newSubcategory: []}
        }
        case EDIT_OLD_SUBCATEGORY: {
            const id = action.payload
            const indexOfNew = state.allSubcategory.findIndex(el => el.id === id)
            let change = state.allSubcategory.filter(el => el.id === id)[0]
            change.wasEdit = true
            return {
                ...state,
                allSubcategory: [...state.allSubcategory.slice(0, indexOfNew),
                    change,
                    ...state.allSubcategory.slice(indexOfNew + 1)]
            }
        }
        default:
            return state
    }
}


export const createNewSubCategory = newSubCategory => ({type: CREATE_SUB_CATEGORY, payload: newSubCategory})
export const changeNewSubcategory = (recruitment = {}) => ({type: CHANGE_SUB_CATEGORY, payload: recruitment})
export const deleteSubcategory = (recruitment = {}) => ({type: DELETE_SUBCATEGORY, payload: recruitment})
export const setSubcategory = (subcategories ) => ({type: SET_SUBCATEGORY, payload: subcategories})
export const cleanNewSubcategory = () => ({type: CLEAN_NEW_SUBCATEGORY})
export const editOldSubcategory = (id) => ({type: EDIT_OLD_SUBCATEGORY, payload: id})