import React, {memo} from 'react';
import cl from "./RightPanel.module.scss";

import isEqual from "react-fast-compare";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";

const RightPanel: React.FC =
    memo(({children}) => {
        const dispatch = useDispatch()
        let location = useLocation();


        // const {onClick: OnSave} = useSaveTable(typeTable)
        // const onSave = useCallback(() => {
        //     onClick()
        // }, [behavior])

        return (
            <div className={cl.wrapper}>
                <div className={cl.rightMainSection}>
                    {children}
                    {/*    <BtnBlue*/}
                    {/*        showChildren={false}*/}
                    {/*        onClick={onCreate}*/}
                    {/*        icon={<IconSave/>}*/}
                    {/*    >*/}
                    {/*        Нове поле*/}
                    {/*    </BtnBlue>*/}
                </div>

                <div className={cl.rightBottom}>
                    {/*<BtnBlue*/}
                    {/*    onClick={OnSave}*/}
                    {/*>*/}
                    {/*    зберегти*/}
                    {/*</BtnBlue>*/}
                </div>
            </div>
        )
            ;
    }, isEqual);
export {RightPanel}