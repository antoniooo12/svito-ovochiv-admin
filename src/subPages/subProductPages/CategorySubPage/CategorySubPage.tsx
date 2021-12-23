import React, {useCallback, useEffect, useMemo, useState} from 'react';
import cl from './CategorySubPage.module.scss'
import {useDispatch} from "react-redux";
import isEqual from "react-fast-compare";
import {useTypedSelector} from "../../../hooks/hooks";
import {
    changeCategory,
    deleteCategory,
} from "../../../reducer/categoryReducer";
import {TableLine} from '../../../components/Table/TableLine/TableLine';
import {TableHeader} from '../../../components/Table/TableHeader/TableHeader';
import {IOnChange} from "../../../components/Table/TableLine/LineContext";
import {EnumTableEntity, EnumTypeCategory, Item} from "../../../types/categoryReducerTypes";
import {EnumTableBtn} from "../../../types/TableBtnTypes";
import {IconTrash} from "../../../components/UI/icons/Trash/Trash";
import {TableList} from "../../../components/Table/TableList/TableList";

export const CategorySubPage = React.memo(() => {
    const dispatch = useDispatch()


    const {storage} = useTypedSelector(state => state.category)
    // const [listOfNewCategory, setListOfNewCategory] = useState<Array<Item>>([])
    const [listOfCategory, setListOfCategory] = useState<Array<Item>>([])

    const listOfNewCategory = useMemo(() => {
        return storage[EnumTypeCategory.newCategory].data
    }, [storage[EnumTypeCategory.newCategory].data.length])

    const onChangeCategory = useCallback((recruitment: IOnChange) => {
        dispatch(changeCategory(recruitment))
    }, [])
    //
    const onDelete = useCallback((recruitment) => {
        dispatch(deleteCategory(recruitment))
    }, [])


    const isMother = useMemo(() => {
        return true
    }, [])
    // console.log(listOfNewCategory)

    return (

        <div className={cl.wrapper}>
            <TableList isMother={isMother}
                       enteredDropDownList={undefined}>
                <TableHeader>
                    <TableLine.Input
                        width={100}
                        placeholder={'категорія'}
                        type={EnumTableEntity.categories}
                    >
                        категорія
                    </TableLine.Input>
                </TableHeader>
                {listOfNewCategory.map((el, i) => {
                    return (<TableLine
                            onChange={onChangeCategory}
                            outerReduxObjState={el}
                            isNew={true}
                            typeRow={EnumTypeCategory.newCategory}
                            id={el.id}
                            index={i}
                            key={i.toString()}
                        >
                            <TableLine.Input
                                width={100}
                                placeholder={'категорія'}
                                type={EnumTableEntity.categories}
                            />
                            <TableLine.Btn
                                type={EnumTableBtn.delete}
                                icon={<IconTrash/>}
                                onClick={onDelete}
                            />
                        </TableLine>
                    )
                })
                }
            </TableList>
        </div>
    );
}, isEqual)

