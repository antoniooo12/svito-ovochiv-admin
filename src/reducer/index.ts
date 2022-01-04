import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import tableReducer from "./tableReducer";
import {CategoryState} from "../types/categoryReducerTypes";


const rootReducer = combineReducers<{tableReducer:CategoryState}>({
    tableReducer,
})


export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))