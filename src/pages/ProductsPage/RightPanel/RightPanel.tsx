import React, {memo, useCallback, useMemo} from 'react';
import cl from "./RightPanel.module.scss";
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../../components/UI/icons/IconSave/IconSave";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {createNewRow} from "../../../reducer/tableReducer";
import {TypeTable} from "../../../types/TableCreatorTypes";
import {useActions} from "../../../hooks/useActions";
import {useSaveTable, useTypedSelector} from "../../../hooks/hooks";
import isEqual from "react-fast-compare";

const RightPanel = memo(() => {
    const dispatch = useDispatch()
    let location = useLocation();
    const behavior = useMemo(() => {
        return location.pathname.split('/').pop() as TypeTable
    }, [location.pathname])
    const onCreate = useCallback(() => {
        dispatch(createNewRow(behavior))
    }, [behavior])


    const {onClick} = useSaveTable(behavior)
    // const onSave = useCallback(() => {
    //     onClick()
    // }, [behavior])

    return (
        <div className={cl.wrapper}>
            <div className={cl.rightMainSection}>
                <BtnBlue
                    showChildren={false}
                    onClick={onCreate}
                    icon={<IconSave/>}
                >
                    Нове поле
                </BtnBlue>
            </div>

            <div className={cl.rightBottom}>
                <BtnBlue
                    onClick={onClick}
                >
                    зберегти
                </BtnBlue>
            </div>
        </div>
    )
        ;
}, isEqual);
export {RightPanel}