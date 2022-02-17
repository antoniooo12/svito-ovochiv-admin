import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {tableStoreReducer} from "./reducer/tableReducer";
import {TableState} from "../types/TableReducerTypes";


const rootTableReducer = combineReducers<{ tableStore: TableState }>({
    tableStore: tableStoreReducer,
})

export type RootTableReducer = ReturnType<typeof rootTableReducer>

const composeEnhancers = composeWithDevTools({name: 'table processor', serialize: true});

export const tableStore = createStore(rootTableReducer, composeEnhancers(applyMiddleware(thunk)))
// export const tableStore = configureStore
