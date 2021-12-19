import React, {useCallback, useEffect, useMemo, useState} from 'react';
import cl from './SubcategorySubPage.module.scss'
import {TableList} from "../../../components/Table/TableList/TableList";
import {TableHeader} from "../../../components/Table/TableHeader/TableHeader";
import {useDispatch, useSelector} from "react-redux";
import {TableLine} from "../../../components/Table/TableLine/TableLine";
import {changeNewSubcategory, deleteSubcategory, editOldSubcategory} from "../../../reducer/subcategoryReducer";
import {getAllSubcategories} from "../../../actions/subcategory";
import {IconNotePencil} from "../../../components/UI/icons/NotePencil/IconNotePencil";
import {IconTrash} from "../../../components/UI/icons/Trash/Trash";

const SubcategorySubPage = () => {
    const dispatch = useDispatch()
    let newSubcategoryR = useSelector(state => state.subcategory.newSubcategory) || []
    let allSubcategoryR = useSelector(state => state.subcategory.allSubcategory) || []
    let categoryR = useSelector(state => state.category.allCategory) || []


    const [listOfNewSubcategory, setListOfNewSubcategory] = useState([])
    const [listOfSubcategory, setListOfSubcategory] = useState([])
    const [listOfCategory, setListOfCategory] = useState([])

    useEffect(() => {
        dispatch(getAllSubcategories())
        setListOfSubcategory(allSubcategoryR)
    }, [])

    useEffect(() => {
        setListOfSubcategory(allSubcategoryR)
    }, [allSubcategoryR])

    useEffect(() => {
        setListOfCategory(categoryR)
    }, [categoryR])

    useEffect(() => {
        setListOfNewSubcategory(newSubcategoryR)
    }, [newSubcategoryR])

    const onDelete = (requirement) => {
        dispatch(deleteSubcategory(requirement))
    }
    const onEdit = ({id}) => {
        dispatch(editOldSubcategory(id))
    }

    const onChangeNewSubCategory = ({type, value, id, isNew}) => {
        dispatch(changeNewSubcategory({type, value, id, isNew}))
    }

    // const onChangeNewSubCategory =
    return (
        <div className={cl.wrapper}>
            <TableList enteredDropDownList={{category: categoryR}} isMother={{subcategory: true}}>
                <TableHeader>
                    <TableLine.Input
                        width={125}
                    >
                        підкатегорія
                    </TableLine.Input>
                    <TableLine.Input
                        width={125}
                        placeholder={'категорія'}
                        type={'category'}
                        dropDownList={listOfCategory}
                    >
                        категорія
                    </TableLine.Input>
                </TableHeader>
                {listOfSubcategory.map((el, i) =>
                    <TableLine
                        onChange={onChangeNewSubCategory}
                        isNew={false}
                        states={el}
                        id={el.id}
                        index={i}
                        key={el.id}>
                        <TableLine.Checkbox/>
                        <TableLine.Input
                            width={125}
                            placeholder={'підкатегорія'}
                            type={'subcategory'}
                        />
                        <TableLine.Input
                            width={125}
                            placeholder={'категорія'}
                            type={'category'}
                            dropDownList={listOfCategory}
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
                    </TableLine>
                )}
                {listOfNewSubcategory.map((el, i) =>
                    <TableLine
                        onChange={onChangeNewSubCategory}
                        isNew={true}
                        states={el}
                        id={el.id}
                        index={i}
                        key={el.id}>
                        <TableLine.Checkbox/>
                        <TableLine.Input
                            width={125}
                            placeholder={'підкатегорія'}
                            type={'subcategory'}
                        />
                        <TableLine.Input
                            width={125}
                            placeholder={'категорія'}
                            type={'category'}
                            dropDownList={listOfCategory}
                        />
                        <TableLine.Btn
                            type={'delete'}
                            icon={<IconTrash/>}
                            onClick={onDelete}
                        />
                    </TableLine>
                )}
            </TableList>
        </div>
    );
};

export default React.memo(SubcategorySubPage);