import userReducer from "./userReducer";
import {applyMiddleware,combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import {subcategoryReducer} from "./subcategoryReducer";


const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    subcategory: subcategoryReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))