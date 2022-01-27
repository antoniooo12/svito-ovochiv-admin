import React, {useEffect, useState} from 'react';
import cl from './Header.module.scss'
import {mainPagesList} from "../../mokData";
import {Link, NavLink, Routes, useNavigate} from "react-router-dom";
import {defaultLink} from "../../mockData/navPages";
import isEqual from "react-fast-compare";

const Header = () => {
    const [pages, setPages] = useState([])
    const [selected, setSelected] = useState(0)
    const navigate = useNavigate();
    useEffect(() => {
        setPages(mainPagesList)
        navigate(`${defaultLink}`)

    }, [])


    return (
        <div className={cl.wrapper}>
            <div className={cl.left}>


                {pages.map((el, index) => {
                    const link = el.cb && el.cb() || el.path
                    return (
                        <NavLink
                            to={link}
                            className={({isActive}) => isActive ? [cl.BtnPageSelected, cl.BtnPage].join(' ') : cl.BtnPage}
                            key={el.id}
                        >
                            {el.title}
                        </NavLink>
                    )
                })}

            </div>
            <div className={cl.right}>
                <span>
                    Іван Васильович Пупкін
                </span>
                <span>Адмін панель</span>
            </div>
        </div>
    );
}

export default Header;