import React, {useCallback} from 'react';
import cl from "./RightPanel.module.scss";
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../../components/UI/icons/IconSave/IconSave";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {createNewRow} from "../../../reducer/tableReducer";
import {TypeTable} from "../../../types/TableCreatorTypes";

const RightPanelInner = () => {
    const dispatch = useDispatch()
    let location = useLocation();
    const behavior = location.pathname.split('/').pop() as TypeTable

    const onCreate = useCallback(() => {
        dispatch(createNewRow(behavior))
    }, [behavior])

    return (
        <div className={cl.wrapper}>
            <div className={cl.rightMainSection}>
                <BtnBlue
                    onClick={onCreate}
                    icon={<IconSave/>}
                >
                    Нове поле
                </BtnBlue>
            </div>

            <div className={cl.rightBottom}>
                {/*<BtnBlue>*/}
                {/*    зберегти*/}
                {/*</BtnBlue>*/}
            </div>
        </div>
    )
        ;
};
const RightPanel = React.memo(RightPanelInner)
export {RightPanel};