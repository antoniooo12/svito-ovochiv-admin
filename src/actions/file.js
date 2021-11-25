import axios from "axios";
import {addFile} from "../reducer/fileReducer";


export function uploadFile(file) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`http://localhost:4800/api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable
                        ? progressEvent.total
                        : progressEvent.target.getResponseHeader('content-length')
                        || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress)
                    }
                }
            })
            dispatch(addFile(response.data))

        } catch (e) {
            console.log(e)
        }
    }
}