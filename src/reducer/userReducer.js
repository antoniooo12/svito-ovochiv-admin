const SET_USER = "SET_USER"
const LOGOUT = "LOG_OUT"


const defaultState = {
    currentUser: {},
    isAuth: true
}


export default function userReducer(state=defaultState, action){
    switch (action.type){
        case SET_USER:
            return{
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        default:
            return state
    }
}

export const setUser = user =>({type: SET_USER, payload: user})