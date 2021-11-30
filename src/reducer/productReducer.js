const CREATE_PRODUCT = "CREATE_PRODUCT"
const defaultState = {
    allProducts: [],

}
export default function productReducer(state = defaultState, action) {
    switch (action.type) {
        case CREATE_PRODUCT: {
            return {...state,
            allProducts: [...state.allProducts, action.payload]
            }
        }
        default:
            return state
    }
}

export const createProduct = newProduct => ({type: CREATE_PRODUCT, payload: newProduct})