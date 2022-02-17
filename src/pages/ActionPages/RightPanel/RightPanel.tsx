import React, {memo, useCallback, useMemo} from 'react';
import cl from "./RightPanel.module.scss";

import isEqual from "react-fast-compare";
import {TypeTable} from "../../../types/TableCreatorTypes";
import {useDispatch} from "react-redux";
import {createNewRow} from "../../../reducer/tableReducer";
import {useSaveTable} from "../../../hooks/hooks";
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../../components/UI/icons/IconSave/IconSave";
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