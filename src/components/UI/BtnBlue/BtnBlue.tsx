import React, {ReactNode, useMemo} from 'react';
import cl from './BtnBlue.module.scss'
import isEqual from "react-fast-compare";

interface BtnBlue {
    onClick: () => void
    icon?: ReactNode
    showChildren?: boolean,
}

const BtnBlue: React.FC<BtnBlue> = React.memo(({onClick, children, icon, showChildren = true}) => {
    return (
        <div onClick={onClick} className={cl.wrapper}>
            {showChildren && children}
            <div className={cl.icon}>
                {icon}
            </div>
        </div>
    );
}, isEqual);
export {BtnBlue}
