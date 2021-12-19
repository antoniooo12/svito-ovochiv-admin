import React, {useMemo} from 'react';
import isEqual from "react-fast-compare";

const TableDataListInner = ({type, link, data, filterBy, exampleFilter = ''}) => {
    let filtredData = useMemo(() => {
        console.log(exampleFilter)
        console.log(filterBy)
        if (filterBy && exampleFilter) {
            let res = data.filter(el => {
                if (el[filterBy].toString() === exampleFilter.toString()) {
                    return el
                }
            })
            console.log(res)
            return res
        } else {
            return data
        }
    }, [exampleFilter])
    console.log(filtredData)
    return (
        <datalist id={link}>
            {filtredData
                .map(el => <option
                        key={el.id}
                        value={`${el.id}:  ${el[type]}`}
                    />
                )}
        </datalist>
    );
};
export const TableDataList = React.memo(TableDataListInner,isEqual)
