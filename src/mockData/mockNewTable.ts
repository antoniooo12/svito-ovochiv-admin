import {Map} from "immutable";
import {DataEntitiesTableStructure, EnumInput} from "../types/TableCreatorTypes";

export const mockTable = {
    tableName: 'test name'
}

export const mockTables = Map({testTable: mockTable})

export const mockNewSubcategory: DataEntitiesTableStructure = {
    dependency: ["Category"],
    title: 'підкатегорія',
    columnParams: [{width: 150}, {width: 150}],
    header: [{title: 'Підкатегорія'}, {title: 'Категорія'}],
    row:
        {
            Subcategory: {
                typeColumn: "Subcategory",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: 'підкатегорія',
                isMother: true,
                defaultState: '',
            },
            Category: {
                typeColumn: "Category",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: 'категорія',
                isMother: false,
                defaultState: '',
            }
        }
}