import axios from "axios";
import {addFile} from "../reducer/fileReducer";
import {URL} from '../API'

export async function uploadFile(file) {
    try {
        const formData = new FormData()
        formData.append('file', file)
        console.log(file)
        console.log(formData)
        const response = await axios.post(`${URL}/api/files/upload`, formData, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        console.log(response)
    } catch (e) {
        console.log(e)
    }
}