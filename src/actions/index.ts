import * as tableActionCreators from './table'
import * as orderActionCreators from '../reducer/orderReducer'
export default {
    ...tableActionCreators,
    ...orderActionCreators,
}