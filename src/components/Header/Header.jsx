import React, {useEffect, useState} from 'react';
import cl from './Header.module.scss'
import {pageList} from '../../mokData/mokData'
import {Link, NavLink, Routes} from "react-router-dom";

const Header = () => {
    const [pages, setPages] = useState([])
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        setPages(pageList)
    }, [])
    return (
        <div className={cl.wrapper}>
            <div className={cl.left}>


                {pages.map(el => {
                    return (
                        <NavLink key={el.id} to={el.path} className={({isActive}) => isActive ? [cl.BtnPageSelected,cl.BtnPage ].join(' ')  : cl.BtnPage }>
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
};

export default Header;