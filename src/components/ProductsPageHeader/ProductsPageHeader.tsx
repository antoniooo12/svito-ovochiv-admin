import React from 'react';
import {NavLink} from "react-router-dom";
import cl from './ProductsPageHeader.module.scss'
import {DataEntitiesCatalog} from "../../mokData";

const ProductsPageHeaderInner = () => {


    return (
        <div className={cl.wrapper}>
            {Object.keys(DataEntitiesCatalog).map(el =>
                <NavLink to={el}
                         className={({isActive}) => isActive ? [cl.BtnPageSelected, cl.BtnPage].join(' ') : cl.BtnPage}>
                    {el}
                </NavLink>
            )}
        </div>
    );
};

export const ProductsPageHeader = React.memo(ProductsPageHeaderInner);