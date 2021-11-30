import {Link, Outlet} from 'react-router-dom';
import Header from "../Header/Header";
import cl from './Layout.module.scss'
const Layout = () => {
    return (
        <>
            <Header/>
            <main className={cl.wrapper}>
                <Outlet/>
            </main>
        </>
    )
}

export {Layout}