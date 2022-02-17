import React from 'react';
import {Provider} from "react-redux";
import {EternalActions, TableShield} from "../TableShield/TableShield";
import {DataEntitiesTableStructure} from "../../../types/TableCreatorTypes";
import {tableStore} from "../redux";
import {useKeyCreateLine} from "../hooks/useKeyCreateLine";

type Table = {
    tableStructure: DataEntitiesTableStructure
    setActions?: React.Dispatch<React.SetStateAction<EternalActions>>
}

const Table: React.FC<Table> = ({tableStructure, setActions}) => {

    return (
        <div>
            <Provider store={tableStore}>
                <TableShield
                    setActions={setActions}
                    tableStructure={tableStructure}
                />
            </Provider>
        </div>
    );
};

export {Table};