import React, {useContext, useEffect, useState} from 'react';
import cl from './TableCategory.module.scss'
import {HeaderContent} from "../../TableHeader/TableHeaderContext";
import {LineContent} from "../../TableLine/LineContext";
import {ListContent} from "../../TableList/ListContext";

const TableCategory = ({onChange, children, isMother}) => {
    const {isHeader} = useContext(HeaderContent)
    const {id, states} = useContext(LineContent)
    const {categories} = useContext(ListContent)
    const [listOfCategories, setListOfCategories] = useState([])
    const [title, setTitle] = useState('')
    const [isSearchBlockActive, setSearchBlockActive] = useState(false)
    useEffect(() => {
        if (states) {
            setTitle(states.category)
        }
    }, [])
    useEffect(() => {
        setListOfCategories(categories)
        console.log(categories)
    }, [])
    return (
        <>{isHeader !== true ?
            <div className={cl.wrapper}>
                <input
                    value={title}

                    onChange={(e) => {
                        onChange({e, id, title: title})

                    }}
                    placeholder={'категорія'}
                />
                {!isMother &&
                    <div className={[cl.dropdownList].join(' ')}>
                        <ul>
                            {listOfCategories.map((el, i) => {
                                console.log(el)
                                return (<li>{el.category}</li>)
                            })

                            }
                        </ul>
                    </div>}


            </div>
            : <div className={cl.wrapper}> {children}</div>}
        </>

    );
};

export {TableCategory};