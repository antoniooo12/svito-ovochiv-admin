import userReducer from "./userReducer";
import {applyMiddleware,combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import productReducer from "./productReducer";


const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))