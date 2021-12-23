import React, {useMemo} from 'react';
import isEqual from "react-fast-compare";

const TableDataListInner = ({type, link, data, filterBy, exampleFilter = ''}) => {
    const filteredData = useMemo(() => {


        if (filterBy && exampleFilter) {
            let res = data.filter(el => {
                if (el[filterBy].toString() === exampleFilter.toString()) {
                    return el
                }
            })
            return res || []
        } else {
            return data.data || []
        }
    }, [exampleFilter])

    return (
        <datalist id={link}>
            {filteredData
                .map(el => <option
                        key={el.id}
                        value={`${el.id}:  ${el[type]}`}
                    />
                )}
        </datalist>
    );
};
export const TableDataList = React.memo(TableDataListInner,isEqual)
