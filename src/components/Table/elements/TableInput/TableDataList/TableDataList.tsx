import React, {useMemo} from 'react';
import isEqual from "react-fast-compare";

interface ITableDataList {
    link: string,
    dropDownList: Array<{ value: string | boolean | number, id: number | string }>
    filterBy: string | number | boolean
}

const TableDataList: React.FC<ITableDataList> = React.memo(({link, dropDownList, filterBy}) => {
    const filteredDropDownList = useMemo(() => {
        debugger
        if (filterBy) {
            debugger
            return dropDownList.filter(item => {
                return {
                    value: item.value,
                    id: item.id,
                }
            })
        } else {
            return dropDownList
        }
    }, [])
    // const filteredData = memo(() => {
    //     if (filterBy && dropDownList) {
    //         let res = data.filter(el => {
    //             if (el[filterBy].toString() === exampleFilter.toString()) {
    //                 return el
    //             }
    //         })
    //         return res || []
    //     } else {
    //         return data.data || []
    //     }
    // }, [exampleFilter])

    return (
        <datalist id={link}>
            {filteredDropDownList
                .map(item => <option
                        value={`${item.id}:  ${item.value}`}
                    />
                )}
        </datalist>
    );
}, isEqual);
export {TableDataList}
