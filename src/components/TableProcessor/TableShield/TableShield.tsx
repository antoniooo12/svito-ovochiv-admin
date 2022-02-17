import React from 'react';
import {TableCreator} from "../TableCreator/TableCreator";
import {mockNewSubcategory} from "../../../mockData/mockNewTable";
import {Provider} from "react-redux";
import {tableStore} from "../redux";
import {useTableActions} from "../hooks/useCreateLine";
import {TableShieldContext} from "./TableShieldContext";
import {DataEntitiesTableStructure} from "../../../types/TableCreatorTypes";

type TestInitializationComponent = {
    tableStructure: DataEntitiesTableStructure
}
const TableShield: React.FC<TestInitializationComponent> = ({tableStructure}) => {
    const tableActions = useTableActions.call(this, tableStructure)

    return (
        <Provider store={tableStore}>
            <TableShieldContext.Provider value={{
                tableActions
            }}>

                <h2>{tableStructure.title}</h2>
                <TableCreator
                    tableViewStructure={mockNewSubcategory}
                />
                TestInitializationComponent
            </TableShieldContext.Provider>
        </Provider>
    );
};

export {TableShield};