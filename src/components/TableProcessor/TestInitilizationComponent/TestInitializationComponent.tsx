import React from 'react';
import {TableCreator} from "../TableCreator/TableCreator";
import {List} from "immutable";
import {mockNewSubcategory} from "../../../mockData/mockNewTable";
import {Provider} from "react-redux";
import {tableStore} from "../redux";

type TestInitializationComponent = {
    tableName: string
}
const TestInitializationComponent: React.FC<TestInitializationComponent> = ({tableName}) => {


    return (
        <Provider store={tableStore}>
            <h2>{tableName}</h2>
            <TableCreator
                tableViewStructure={mockNewSubcategory}
            />
            TestInitializationComponent
        </Provider>
    );
};

export {TestInitializationComponent};