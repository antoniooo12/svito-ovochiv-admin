import React, {useCallback} from 'react';
import {useLocation} from "react-router-dom";
import {useTypedSelector} from "../../../hooks/hooks";
import {TableCreator} from "../../../components/Table/TableCreator/TableCreator";
import {CategoriesMokData, TableCreatorMokData} from "../../../mokData";
import {IOnChange} from "../../../components/Table/TableLine/LineContext";
import {changeCategory} from "../../../reducer/tableReducer";
import {useDispatch} from "react-redux";

const SubPage = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const behavior: string = location.pathname.split('/').pop() as string
    const {storage} = useTypedSelector(state => state.category)
    console.log(TableCreatorMokData[behavior])
    try {
        const onChange =  useCallback((recruitment: IOnChange) => {
            dispatch(changeCategory(recruitment))
        }, [behavior])

        return (
            <div>
                {TableCreatorMokData[behavior] && <TableCreator
                    actions={{onChange}}

                    data={storage[behavior].isNew.data}
                    // data={CategoriesMokData}

                    params={TableCreatorMokData[behavior]}
                />}
            </div>
        );
    } catch (e) {

    }

};

export {SubPage};