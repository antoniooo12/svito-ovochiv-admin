import React from 'react';
import isEqual from "react-fast-compare";

export interface ITableSelect {
    option: []
}

const TableSelect: React.FC<ITableSelect> = React.memo(({option}) => {
    return (
        <select>

        </select>
    )
}, isEqual);
export {TableSelect}
// export const TableSelect = React.memo(TableSelectInner,isEqual);