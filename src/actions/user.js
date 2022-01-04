// import axios from 'axios'
// import {setUser} from "../reducer/userReducer";
// import {URL} from '../API'
// export const login = (email, password)=>{
//     return async  dispatch =>{
//         try {
//             const res = await axios.post(`${URL}/api/user/login`,{
//                 email,
//                 password,
//             })
//             dispatch(setUser(res.data.user))
//             localStorage.setItem('token', res.data.token)
//
//
//         }catch (e) {
//             console.log(e)
//         }
//     }
// }