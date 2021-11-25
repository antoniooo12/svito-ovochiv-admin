import React, {useState} from 'react';
import {login} from "../../actions/user";
import {useDispatch} from "react-redux";



const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <div>Увійти</div>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Уведіть email..."/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Уведіть пароль..."/>
            <button className="authorization__btn" onClick={() => dispatch(login(email, password))}>Войти</button>

        </div>
    );
};

export default Login;