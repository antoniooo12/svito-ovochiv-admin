const ADD_File = "ADD_File"
const defaultState = {
    files: [],
    currentDir: null,
    popupDisplay: 'none',
    dirStack:[],
}
export default function fileReducer(state = defaultState, action) {
    switch (action.type) {
        case ADD_File:
            return {...state, files: [...state.files, action.payload]}
        default:
            return state
    }
}

export const addFile = (file) => ({type: ADD_File, payload: file})
