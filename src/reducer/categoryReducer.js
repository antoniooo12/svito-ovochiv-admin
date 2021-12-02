const CREATE_CATEGORY = 'CREATE_CATEGORY'
const CHANGE_NEW_CATEGORY = "CHANGE_NEW_CATEGORY"
const SET_CATEGORIES ='SET_CATEGORIES'

const defaultState = {
    allCategory: [],
    newCategory: [],
}

export default function categoryReducer(state = defaultState, action) {
    switch (action.type) {
        case CREATE_CATEGORY: {
            return {
                ...state,
                newCategory: [...state.newCategory, action.payload]
            }
        }
        case  CHANGE_NEW_CATEGORY: {
            // debugger
            const selected = action.payload.selected
            const value = action.payload.value
            const tempId = action.payload.tempId
            const indexOfNew = state.newCategory.findIndex(el => el.tempId === tempId)
            let newCategory = state.newCategory.filter(el => el.tempId === tempId)[0]
            if (selected === 'категорія') {
                newCategory.title = value
            }
            return {
                ...state,
                newCategory: [...state.newCategory.slice(0, indexOfNew),
                    ...state.newCategory.slice(indexOfNew)]
            }
        }
        case SET_CATEGORIES:{
            return {...state, allCategory: action.payload}
        }
        default:
            return state
    }
}


export const createNewCategory = newCategory => ({type: CREATE_CATEGORY, payload: newCategory})
export const changeNewCategory = (recruitment = {}) => ({type: CHANGE_NEW_CATEGORY, payload: recruitment})
export const setCategory = (categories = {}) => ({type: SET_CATEGORIES, payload: categories})