import React, {useContext, useEffect, useState} from 'react';
import cl from './TableSubCategory.module.scss'
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";
import {ListContent} from "../../TableList/ListContext";

const TableSubCategory = ({children}) => {

    const {isHeader} = useContext(HeaderContent)
    const {id, onChange, states, isNew} = useContext(LineContent)
    const {isMother = {}, subcategories, categories} = useContext(ListContent)
    const [title, setTitle] = useState('')
    const [listOfSubcategories, setListOfSubcategories] = useState([{subcategory: ''}])
    const [categoryId, setCategoryId] = useState()
    useEffect(() => {
        setListOfSubcategories(subcategories)
    }, [subcategories])

    useEffect(() => {
        if (states) {
            setTitle(states.subcategory)
        }
    }, [states.subcategory])
    useEffect(() => {
        setCategoryId(states.categoryId)
    }, [states.categoryId])
    console.log()
    return (<>
            {isHeader !== true ? <div className={cl.wrapper}>
                <input
                    value={title}
                    onChange={(e) => onChange({value: e.target.value, selected: e.target.placeholder, id, isNew})}
                    placeholder={'підкатегорія'}
                    className={cl.wrapper}
                    list="subcategories"
                />
                {!isMother.subcategory && <datalist id="subcategories">
                    {listOfSubcategories
                        .filter(el => Number(el.categoryId) === Number(categoryId))
                        .map((el, i) => {
                            console.log(el.categoryId + ' ' + categoryId)
                            return (<option
                                key={el.id}
                                value={`${el.id}:  ${el.subcategory}`}
                            />)


                        })}
                </datalist>}
            </div> : <div className={cl.wrapper}>{children}</div>}
        </>
    );
};

export {TableSubCategory};