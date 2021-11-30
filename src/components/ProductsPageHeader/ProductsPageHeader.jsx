import React from 'react';
import {NavLink} from "react-router-dom";
import cl from './ProductsPageHeader.module.scss'

const ProductsPageHeader = () => {
    return (
        <div className={cl.wrapper}>
            <NavLink to='allProducts' className={({isActive}) => isActive ? [cl.BtnPageSelected,cl.BtnPage ].join(' ')  : cl.BtnPage} >
                всі товари
            </NavLink>
            <NavLink to='category' className={({isActive}) => isActive ? [cl.BtnPageSelected,cl.BtnPage ].join(' ')  : cl.BtnPage}>
                категорії
            </NavLink>
        </div>
    );
};

export {ProductsPageHeader};