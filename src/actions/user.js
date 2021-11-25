import axios from 'axios'
import {setUser} from "../reducer/userReducer";

export const login = (email, password)=>{
    return async  dispatch =>{
        try {
            const res = await axios.post(`http://localhost:4800/api/user/login`,{
                email,
                password,
            })
            dispatch(setUser(res.data.user))
            localStorage.setItem('token', res.data.token)
            console.log(res.data.user)

        }catch (e) {
            console.log(e)
        }
    }
}