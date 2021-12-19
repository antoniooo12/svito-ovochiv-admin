const CREATE_CATEGORY = 'CREATE_CATEGORY'
const CHANGE_CATEGORY = "CHANGE_CATEGORY"
const CHANGE_OLD_CATEGORY = "CHANGE_OLD_CATEGORY"
const SET_CATEGORIES = 'SET_CATEGORIES'
const BULK_DELETE_CATEGORY = 'BULK_DELETE_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'
const CLEAN_NEW_CATEGORY = "CLEAN_NEW_CATEGORY"
const EDIT_OLD_CATEGORY = 'EDIT_OLD_CATEGORY'

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
                category: '',
                wasEdit: false,
            }
            return {
                ...state,
                newCategory: [...state.newCategory, item]
            }
        }

        case  CHANGE_CATEGORY: {
            const {isNew, id, value, type} = action.payload
            let searchingArr = [];
            if (isNew) {
                searchingArr = state.newCategory
            } else {
                searchingArr = state.allCategory
            }
            let indexOfChanged = searchingArr.findIndex(el => el.id === id)
            let changed = searchingArr.filter(el => el.id === id)[0]
            if (type === 'category') {
                changed.category = value
            }
            if (isNew) {
                return {
                    ...state,
                    newCategory: [
                        ...state.newCategory.slice(0, indexOfChanged),
                        changed,
                        ...state.newCategory.slice(indexOfChanged + 1)
                    ]
                }
            } else {
                return {
                    ...state,
                    allCategory: [
                        ...state.allCategory.slice(0, indexOfChanged),
                        changed,
                        ...state.allCategory.slice(indexOfChanged + 1)
                    ]
                }
            }
        }
        case SET_CATEGORIES: {
            return {...state, allCategory: action.payload}
        }
        case DELETE_CATEGORY: {
            const {isNew, id} = action.payload
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
        case EDIT_OLD_CATEGORY: {
            console.log(action.payload)
            const {id} = action.payload
            const indexOfNew = state.allCategory.findIndex(el => el.id === id)
            let change = state.allCategory.filter(el => el.id === id)[0]
            change.wasEdit = true
            return {
                ...state,
                allCategory: [...state.allCategory.slice(0, indexOfNew),
                    change,
                    ...state.allCategory.slice(indexOfNew + 1)]
            }
        }
        case CLEAN_NEW_CATEGORY: {
            return {
                ...state,
                newCategory: []
            }
        }
        default:
            return state
    }
}


export const createNewCategory = newCategory => ({type: CREATE_CATEGORY, payload: newCategory})
export const changeCategory = (recruitment = {}) => ({type: CHANGE_CATEGORY, payload: recruitment})
export const setCategory = (categories = []) => ({type: SET_CATEGORIES, payload: categories})
export const deleteCategory = (recruitment = {}) => ({type: DELETE_CATEGORY, payload: recruitment})
export const bulkDeleteCategories = (arrOfId) => ({type: BULK_DELETE_CATEGORY, payload: arrOfId})
export const cleanCategories = () => ({type: CLEAN_NEW_CATEGORY})
export const editOldCategory = (recruitment) => ({type: EDIT_OLD_CATEGORY, payload: recruitment})