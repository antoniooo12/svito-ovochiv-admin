const CREATE_PRODUCT = "CREATE_PRODUCT"
const CHANGE_NEW_PRODUCT = "CHANGE_NEW_PRODUCT"
const SET_PRODUCT = 'SET_PRODUCT'
const CLEAN_NEW_PRODUCT = 'CLEAN_NEW_PRODUCT'
const EDIT_OLD_PRODUCT = 'EDIT_OLD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const defaultState = {
    allProducts: [],
    newProducts: [],
}
export default function productReducer(state = defaultState, action) {
    switch (action.type) {
        case CREATE_PRODUCT: {
            const item = {
                id: Date.now(),
                toDelete: false,
            }
            return {
                ...state,
                newProducts: [...state.newProducts, item]
            }
        }
        case CHANGE_NEW_PRODUCT: {
            const {isNew, type, value, id} = action.payload
            let searchingArr = [];
            if (isNew) {
                searchingArr = state.newProducts
            } else {
                searchingArr = state.allProducts
            }

            const indexOfNewP = searchingArr.findIndex(el => el.id === id)
            let newProduct = searchingArr.filter(el => el.id === id)[0]

            if (type === 'productName') {
                newProduct.productName = value
            } else if (type === 'category') {
                newProduct.category = value
                newProduct.categoryId = value.split(':').shift()
            } else if (type === 'subcategory') {
                newProduct.subcategory = value
                newProduct.subcategoryId = value.split(':').shift()
            } else if (type === 'price') {
                newProduct.price = value
            } else if (type === 'priority') {
                newProduct.priority = value
            } else if (type === 'unit') {
                newProduct.unit = value
            }
            if (isNew) {
                return {
                    ...state,
                    newProducts: [...state.newProducts.slice(0, indexOfNewP),
                        newProduct,
                        ...state.newProducts.slice(indexOfNewP + 1)
                    ]
                }
            } else {
                return {
                    ...state,
                    allProducts: [...state.allProducts.slice(0, indexOfNewP),
                        newProduct,
                        ...state.allProducts.slice(indexOfNewP + 1)
                    ]
                }
            }

        }
        case SET_PRODUCT: {
            return {
                ...state,
                allProducts: action.payload
            }
        }
        case CLEAN_NEW_PRODUCT: {
            return {
                ...state,
                newProducts: []
            }
        }
        case EDIT_OLD_PRODUCT: {
            const id = action.payload
            const indexOfNew = state.allProducts.findIndex(el => el.id === id)
            let change = state.allProducts.filter(el => el.id === id)[0]
            change.wasEdit = true
            return {
                ...state,
                allProducts: [...state.allProducts.slice(0, indexOfNew),
                    change,
                    ...state.allProducts.slice(indexOfNew + 1)]
            }
        }
        case DELETE_PRODUCT: {
            const {isNew, id, isActive} = action.payload
            console.log(isActive)
            let searchingArr = [];
            if (isNew) {
                searchingArr = state.newProducts
            } else {
                searchingArr = state.allProducts
            }
            const indexOfNew = searchingArr.findIndex(el => el.id === id)
            let change = searchingArr.filter(el => el.id === id)[0]
            change.toDelete = isActive

            if (isNew) {
                return {
                    ...state,
                    newProducts: [...state.newProducts.slice(0, indexOfNew),
                        change,
                        ...state.newProducts.slice(indexOfNew + 1)]
                }
            } else {
                return {
                    ...state,
                    allProducts: [...state.allProducts.slice(0, indexOfNew),
                        change,
                        ...state.allProducts.slice(indexOfNew + 1)]
                }
            }
            return {
                ...state,
            }
        }
        default:
            return state
    }
}


export const createNewProduct = newProduct => ({type: CREATE_PRODUCT, payload: newProduct})
export const changeNewProduct = recruitment => ({type: CHANGE_NEW_PRODUCT, payload: recruitment})
export const setProduct = (products = []) => ({type: SET_PRODUCT, payload: products})
export const cleanNewProduct = () => ({type: CLEAN_NEW_PRODUCT, payload: ''})
export const editOldProduct = (id) => ({type: EDIT_OLD_PRODUCT, payload: id})
export const deleteProduct = (recruitment) => ({type: DELETE_PRODUCT, payload: recruitment})