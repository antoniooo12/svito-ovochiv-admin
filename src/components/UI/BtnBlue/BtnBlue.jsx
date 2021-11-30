import React from 'react';
import cl from './BtnBlue.module.scss'
const BtnBlue = ({onClick, children}) => {
    return (
        <div onClick={onClick} className={cl.wrapper}>
            {children}
        </div>
    );
};

export {BtnBlue};