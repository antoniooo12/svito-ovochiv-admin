import * as tableActionCreators from './table'
import * as tableReducer from "../reducer/tableReducer";
import * as  orderReducer from "../reducer/orderReducer";
export default {
    ...tableActionCreators,
    ...tableReducer,
    ...orderReducer,
}