const CREATE_PRODUCT = "CREATE_PRODUCT"
const CHANGE_NEW_PRODUCT = "CHANGE_NEW_PRODUCT"
const defaultState = {
    allProducts: [],
    newProducts: [],
}
export default function productReducer(state = defaultState, action) {
    switch (action.type) {
        case CREATE_PRODUCT: {
            const item = {
                id: Date.now()
            }
            return {
                ...state,
                newProducts: [...state.newProducts, item]
            }
        }
        case CHANGE_NEW_PRODUCT: {
            const selected = action.payload.selected
            const value = action.payload.value
            const id = action.payload.id
            const indexOfNewP = state.newProducts.findIndex(el => el.id === id)
            let newProduct = state.newProducts.filter(el => el.id === id)[0]
            if (selected === 'назва') {
                newProduct.title = value
            } else if (selected === 'категорія') {
                newProduct.category = value
            } else if (selected === 'підкатегорія') {
                newProduct.subCategory = value
            } else if (selected === 'ціна') {
                newProduct.price = value
            } else if (selected === 'пріорітет') {
                newProduct.priority = value
            }
            console.log(`${selected} : ${value}`)
            return {
                ...state,
                newProducts: [...state.newProducts.slice(0, indexOfNewP),
                    newProduct,
                    ...state.newProducts.slice(indexOfNewP + 1)
                ]
            }
        }
        default:
            return state
    }
}


export const createNewProduct = newProduct => ({type: CREATE_PRODUCT, payload: newProduct})
export const changeNewProduct = recruitment => ({type: CHANGE_NEW_PRODUCT, payload: recruitment})