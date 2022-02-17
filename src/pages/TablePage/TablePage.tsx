import React, {useCallback} from 'react';
import {TableShield} from "../../components/TableProcessor/TableShield/TableShield";
import {mockNewSubcategory} from "../../mockData/mockNewTable";
import {RightPanel} from "../ActionPages/RightPanel/RightPanel";
import {useTableEternal} from "../../components/TableProcessor/hooks/useTableEternal";
import {Table} from "../../components/TableProcessor/Table/Table";
import {useExternalActions} from "../../components/TableProcessor/hooks/useExternalActions";


const TablePage = () => {

    const {action, setAction} = useTableEternal()
    const {tableCreateLine} = action
    const createLine = useCallback(function () {
        console.log(tableCreateLine)
        tableCreateLine()
    }, [tableCreateLine])

    return (
        <div className={'flex'}>
            <div>
                <Table
                    setActions={setAction}
                    tableStructure={mockNewSubcategory}
                />
            </div>
            <RightPanel>
                <button onClick={createLine}>add line</button>
            </RightPanel>
        </div>
    );
};

export {TablePage};