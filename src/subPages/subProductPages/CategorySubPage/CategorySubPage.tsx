import React, {useCallback, useMemo, useState} from 'react';
import {useDispatch} from "react-redux";
import isEqual from "react-fast-compare";
import {useTypedSelector} from "../../../hooks/hooks";
import {changeCategory, deleteCategory,} from "../../../reducer/tableReducer";
import {IOnChange} from "../../../components/Table/TableLine/LineContext";
import {EnumTypeCategory, Item,} from "../../../types/categoryReducerTypes";
import {TableList} from "../../../components/Table/TableList/TableList";
import cl from './CategorySubPage.module.scss'
import {TableHeader} from '../../../components/Table/TableHeader/TableHeader';
import {TableLine} from "../../../components/Table/TableLine/TableLine";
import {DataEntitiesCatalog} from "../../../API";
import {EnumTableBtn} from "../../../types/TableBtnTypes";
import {IconTrash} from "../../../components/UI/icons/Trash/Trash";

export const CategorySubPage = React.memo(() => {
    const dispatch = useDispatch()


    const {storage} = useTypedSelector(state => state.category)
    // const [listOfNewCategory, setListOfNewCategory] = useState<Array<Item>>([])
    const [listOfCategory, setListOfCategory] = useState<Array<Item>>([])

    const listOfNewCategory = useMemo(() => {
        return [{}]
    }, [storage])

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
                    >
                        категорія
                    </TableLine.Input>
                </TableHeader>
                {listOfNewCategory.map((el, i) => {
                    return (<TableLine
                            onChange={onChangeCategory}
                            // outerReduxObjState={el}
                            isNew={true}
                            // @ts-ignore
                            typeRow={EnumTypeCategory.newCategory}

                            index={i}
                            key={i.toString()}
                            // @ts-ignore
                            id={el.id}
                            // @ts-ignore
                            outerReduxObjState={el}
                        >
                            <TableLine.Input
                                width={100}
                                placeholder={'категорія'}
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

