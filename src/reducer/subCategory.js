const CREATE_SUB_CATEGORY = 'CREATE_SUB_CATEGORY'
const CHANGE_NEW_SUB_CATEGORY = "CHANGE_NEW_SUB_CATEGORY"


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
        case CHANGE_NEW_SUB_CATEGORY: {
            const {selected, value, id} = action.payload
            const indexOfNew = state.newSubcategory.findIndex(el => el.id === id)
            let changed = state.newSubcategory.filter(el => el.id === id)[0]
            if (selected === 'підкатегорія') {
                changed.title = value
            }
            return {
                ...state,
                newSubcategory: [
                    ...state.newSubcategory
                ]
            }
        }
        default:
            return state
    }
}


export const createNewSubCategory = newSubCategory => ({type: CREATE_SUB_CATEGORY, payload: newSubCategory})
export const changeNewSubcategory = (recruitment = {}) => ({type: CHANGE_NEW_SUB_CATEGORY, payload: recruitment})