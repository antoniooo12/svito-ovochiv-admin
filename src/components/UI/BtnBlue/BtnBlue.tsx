import React, {ReactNode, useMemo} from 'react';
import cl from './BtnBlue.module.scss'

interface BtnBlue {
    onClick: () => void
    icon?: ReactNode
}

const BtnBlue: React.FC<BtnBlue> = ({onClick, children, icon}) => {
    return (
        <div onClick={onClick} className={cl.wrapper}>
            <div className={cl.text}>
            {children}
            </div>
            <div className={cl.icon}>
            {icon}
            </div>
        </div>
    );
};
export {BtnBlue}
