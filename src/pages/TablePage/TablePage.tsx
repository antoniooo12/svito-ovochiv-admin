import React from 'react';
import {TableShield} from "../../components/TableProcessor/TableShield/TableShield";
import {mockNewSubcategory} from "../../mockData/mockNewTable";

const TablePage = () => {
    return (
        <div>
            <TableShield tableStructure={mockNewSubcategory}/>
        </div>
    );
};

export {TablePage};