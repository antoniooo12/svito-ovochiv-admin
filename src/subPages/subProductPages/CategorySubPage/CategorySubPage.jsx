import React, {useCallback, useEffect, useMemo, useState} from 'react';
import cl from "./CategorySubPage.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {changeCategory, deleteCategory, editOldCategory} from "../../../reducer/categoryReducer";
import {getAllCategory} from "../../../actions/category";
import {TableList} from "../../../components/Table/TableList/TableList";
import {TableHeader} from "../../../components/Table/TableHeader/TableHeader";
import {TableLine} from "../../../components/Table/TableLine/TableLine";
import {IconNotePencil} from "../../../components/UI/icons/NotePencil/IconNotePencil";
import {IconTrash} from "../../../components/UI/icons/Trash/Trash";
import {editOldProduct} from "../../../reducer/productReducer";

const CategorySubPage = () => {
    const dispatch = useDispatch()

    let newCategoryR = useSelector(state => state.category.newCategory) || []
    let categoryR = useSelector(state => state.category.allCategory) || []


    const listOfNewCategory = useMemo(() => {
        return newCategoryR
    }, [newCategoryR.length])

    const listOfCategory = useMemo(() => {
        return categoryR
    }, [categoryR])

    const onChangeNewCategory = useCallback(({type, value, id, isNew}) => {
        dispatch(changeCategory({type, value, id, isNew}))
    }, [])

    const onDelete = useCallback((requirement) => {
        dispatch(deleteCategory(requirement))
    }, [])
    const onEdit = useCallback(({id}) => {
        dispatch(editOldCategory({id}))
    }, [])
    const isMother = useMemo(() => {
        return true
    }, [])
    return (
        <div className={cl.wrapper}>
            <TableList isMother={isMother}>
                <TableHeader>
                    <TableLine.Input
                        width={100}
                        placeholder={'категорія'}
                        type={'category'}
                    >
                        категорія
                    </TableLine.Input>
                </TableHeader>
                {listOfCategory.map((el, i) => {
                    return (
                        <TableLine
                            onChange={onChangeNewCategory}
                            states={el}
                            index={i}
                            isNew={false}
                            id={el.id}
                            key={el.id}>
                            <TableLine.Checkbox onChange={onChangeNewCategory}/>
                            <TableLine.Input
                                width={100}
                                placeholder={'категорія'}
                                type={'category'}
                            />
                            <TableLine.Btn
                                type={'edit'}
                                icon={<IconNotePencil/>}
                                onClick={onEdit}
                            />
                            <TableLine.Btn
                                type={'delete'}
                                icon={<IconTrash/>}
                                onClick={onDelete}
                            />
                        </TableLine>)
                })}
                {listOfNewCategory.map((el, i) => {
                    return (<TableLine
                            onChange={onChangeNewCategory}
                            states={el}
                            isNew={true}
                            id={el.id}
                            index={i}
                            key={el.id}>
                            <TableLine.Checkbox/>
                            <TableLine.Input
                                width={100}
                                placeholder={'категорія'}
                                type={'category'}
                            />
                            <TableLine.Btn
                                type={'delete'}
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
};

export default React.memo(CategorySubPage);