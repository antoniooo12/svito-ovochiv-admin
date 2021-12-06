const CREATE_CATEGORY = 'CREATE_CATEGORY'
const CHANGE_NEW_CATEGORY = "CHANGE_NEW_CATEGORY"
const SET_CATEGORIES = 'SET_CATEGORIES'
const BULK_DELETE_CATEGORY = 'BULK_DELETE_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'
const CLEAN_NEW_CATEGORY = 'CLEAN_NEW_CATEGORY'

const defaultState = {
    allCategory: [],
    newCategory: [],
}

export default function categoryReducer(state = defaultState, action) {
    switch (action.type) {
        case CREATE_CATEGORY: {
            const item = {
                id: Date.now(),
                toDelete: false,
            }
            return {
                ...state,
                newCategory: [...state.newCategory, item]
            }
        }
        case  CHANGE_NEW_CATEGORY: {
            const selected = action.payload.selected
            const value = action.payload.value
            const id = action.payload.id
            const indexOfNew = state.newCategory.findIndex(el => el.id === id)
            let changed = state.newCategory.filter(el => el.id === id)[0]
            if (selected === 'категорія') {
                changed.category = value
            }
            return {
                ...state,
                newCategory: [...state.newCategory]
            }
        }
        case SET_CATEGORIES: {
            return {...state, allCategory: action.payload}
        }
        case DELETE_CATEGORY: {
            // debugger
            const {isNew, id} = action.payload
            console.log()
            if (isNew) {
                const indexOfNew = state.newCategory.findIndex(el => el.id === id)
                let change = state.newCategory.filter(el => el.id === id)[0]
                change.toDelete = !change.toDelete
                return {
                    ...state,
                    newCategory: [...state.newCategory.slice(0, indexOfNew),
                        change,
                        ...state.newCategory.slice(indexOfNew + 1)]
                }
            } else {
                const indexOfNew = state.allCategory.findIndex(el => el.id === id)
                let change = state.allCategory.filter(el => el.id === id)[0]
                change.toDelete = !change.toDelete
                return {
                    ...state,
                    allCategory: [...state.allCategory.slice(0, indexOfNew),
                        change,
                        ...state.allCategory.slice(indexOfNew + 1)]
                }
            }
            return {
                ...state,
            }
        }
        case BULK_DELETE_CATEGORY: {
            const arrOfId = action.payload
            return {
                ...state,
                newCategory: state.newCategory.filter(el => !arrOfId.includes(el.id))
            }
        }
        case CLEAN_NEW_CATEGORY: {
            return {
                ...state,
                newCategory: [],
            }
        }
        default:
            return state
    }
}


export const createNewCategory = newCategory => ({type: CREATE_CATEGORY, payload: newCategory})
export const changeNewCategory = (recruitment = {}) => ({type: CHANGE_NEW_CATEGORY, payload: recruitment})
export const setCategory = (categories = {}) => ({type: SET_CATEGORIES, payload: categories})
export const deleteCategory = (recruitment = {}) => ({type: DELETE_CATEGORY, payload: recruitment})
export const bulkDeleteCategories = (arrOfId) => ({type: BULK_DELETE_CATEGORY, payload: arrOfId})
export const cleanCategories = () => ({type: CLEAN_NEW_CATEGORY})