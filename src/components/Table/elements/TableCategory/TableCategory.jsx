import React, {useContext, useEffect, useState} from 'react';
import cl from './TableCategory.module.scss'
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";
import {ListContent} from "../../TableList/ListContext";
import {columns} from "../../../../API";

const TableCategory = ({children, onDropdownList}) => {
    const {isHeader} = useContext(HeaderContent)
    const {id, states, onChange, isNew} = useContext(LineContent)
    const {categories, isMother = {}} = useContext(ListContent)
    const [listOfCategories, setListOfCategories] = useState([{category: ''}])
    const [title, setTitle] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        setIsEdit(states.wasEdit)
    }, [states.wasEdit])
    useEffect(() => {
        setTitle(states.category)
    }, [states.category])
    useEffect(() => {
        setListOfCategories(categories)
    }, [categories])

    return (
        <>{isHeader !== true ?
            <div className={cl.wrapper}>
                <input
                    disabled={!(isNew === true || isEdit === true)}
                    list="categories"
                    value={title}
                    onChange={(e) => {
                        onChange({value: e.target.value, selected: e.target.placeholder, id, title, isNew})
                    }}
                    placeholder={'категорія'}
                />
                {!isMother.category &&
                    <datalist id="categories">
                        {listOfCategories.map((el, i) => {
                            if (el.id === states.categoryId) {
                                return (<option
                                    key={el.id}
                                    value={`${el.id}:  ${el.category}`}
                                />)
                            } else {
                                return (<option
                                    key={el.id}
                                    value={`${el.id}:  ${el.category}`}
                                />)
                            }

                        })}
                    </datalist>
                }


            </div>
            : <div className={cl.wrapper}> {children}</div>}
        </>

    );
};

export {TableCategory};