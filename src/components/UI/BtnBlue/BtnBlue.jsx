import React, {useMemo} from 'react';
import cl from './BtnBlue.module.scss'

const BtnBlueInner = ({onClick, children}) => {
    const childrenMemo = useMemo(() => {
        return children
    }, [children])
    return (
        <div onClick={onClick} className={cl.wrapper}>
            {childrenMemo}
        </div>
    );
};
export const BtnBlue = React.memo(BtnBlueInner)
