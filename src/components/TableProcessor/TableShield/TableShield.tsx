import React, {useEffect, useMemo} from 'react';
import {TableCreator} from "../TableCreator/TableCreator";
import {mockNewSubcategory} from "../../../mockData/mockNewTable";
import {TableShieldContext} from "./TableShieldContext";
import {DataEntitiesTableStructure} from "../../../types/TableCreatorTypes";
import {useActionsTable} from "../hooks/useActionTable";
import {useKeyCreateLine} from "../hooks/useKeyCreateLine";
import {useExternalActions} from "../hooks/useExternalActions";

export type EternalActions = ReturnType<typeof useExternalActions>

type TestInitializationComponent = {
    tableStructure: DataEntitiesTableStructure
    setActions?: React.Dispatch<React.SetStateAction<EternalActions>>
}
const TableShield: React.FC<TestInitializationComponent> = ({tableStructure, setActions}) => {
    const actions = useActionsTable()
    const bindAction = useExternalActions()

    return (

        <TableShieldContext.Provider value={{
            tableActions: {...actions, ...bindAction},
            lineStructure: tableStructure.row
        }}>
            <div>
                <h2>{tableStructure.title}</h2>
                <TableCreator
                    setActions={setActions}
                    tableViewStructure={mockNewSubcategory}
                />
                TestInitializationComponent
            </div>

        </TableShieldContext.Provider>
    );
};

export {TableShield};