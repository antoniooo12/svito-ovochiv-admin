import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Login from "./components/authorization/Login";
import Upload from "./components/uploadFile/Upload";

function App() {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth)

    return (
        <div className="App">

            <div>
                {!isAuth ?
                    <Login/>
                    :
                    <Upload/>
                }
            </div>
        </div>
    );
}

export default App;
