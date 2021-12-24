import React, {useCallback} from 'react';
import {useLocation} from "react-router-dom";
import {useTypedSelector} from "../../../hooks/hooks";
import {TableCreator} from "../../../components/Table/TableCreator/TableCreator";
import {TableCreatorMokData} from "../../../mokData";
import {IOnChange} from "../../../components/Table/TableLine/LineContext";
import {changeCategory} from "../../../reducer/tableReducer";
import {useDispatch} from "react-redux";
import {EnumTypeRows} from "../../../types/categoryReducerTypes";

const SubPage = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const behavior: EnumTypeRows = location.pathname.split('/').pop() as EnumTypeRows
    const {storage} = useTypedSelector(state => state.category)
    try {
        const onChange =  useCallback((recruitment: IOnChange) => {
            dispatch(changeCategory(recruitment))
        }, [behavior])

        return (
            <div>
                {TableCreatorMokData[behavior] && <TableCreator
                    typeRows={behavior}
                    actions={{onChange}}
                    data={storage[behavior]}
                    params={TableCreatorMokData[behavior]}
                />}
            </div>
        );
    } catch (e) {

    }

};

export {SubPage};