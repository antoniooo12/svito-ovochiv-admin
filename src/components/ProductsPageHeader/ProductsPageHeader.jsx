import React from 'react';
import {NavLink} from "react-router-dom";
import cl from './ProductsPageHeader.module.scss'

const ProductsPageHeaderInner = () => {
    return (
        <div className={cl.wrapper}>
            <NavLink to='allProducts' className={({isActive}) => isActive ? [cl.BtnPageSelected,cl.BtnPage ].join(' ')  : cl.BtnPage} >
                всі товари
            </NavLink>
            <NavLink to='category' className={({isActive}) => isActive ? [cl.BtnPageSelected,cl.BtnPage ].join(' ')  : cl.BtnPage}>
                категорії
            </NavLink>
            <NavLink to='subcategory' className={({isActive}) => isActive ? [cl.BtnPageSelected,cl.BtnPage ].join(' ')  : cl.BtnPage}>
                підкатегорії
            </NavLink>
        </div>
    );
};

export const ProductsPageHeader = React.memo(ProductsPageHeaderInner);