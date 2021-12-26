import React, {useMemo, useState} from 'react';
import {NavLink} from "react-router-dom";
import cl from './ProductsPageHeader.module.scss'
import {DataColumn, DataEntitiesCatalog} from "../../mokData";

const ProductsPageHeaderInner = () => {

    const navs = useMemo(() => {
        return DataEntitiesCatalog
    }, [DataEntitiesCatalog])
    console.log(navs);
    return (
        <div className={cl.wrapper}>
            {Object.keys(navs).map(el =>
                <NavLink to={el}
                         className={({isActive}) => isActive ? [cl.BtnPageSelected, cl.BtnPage].join(' ') : cl.BtnPage}>
                    {navs[el as keyof typeof navs]}
                </NavLink>
            )}
        </div>
    );
};

export const ProductsPageHeader = React.memo(ProductsPageHeaderInner);