import {TableCreator} from "./types/TableCreatorTypes";
import {RowItem} from "./types/categoryReducerTypes";

export const DataEntitiesCatalog = {
    categories: "категорія",
    subCategories: "підкатегорії",
}

export const DataColumn = {
    categories: "категорія",
    subCategories: "підкатегорія",
}

export const TableCreatorMokData: TableCreator = {
    categories: {
        title: 'категорія',
        column: [{width: 150}],
        header: [{title: 'Категорія'}],
        row: [{typeColumn: "categories", typeInput: 'text', placeholder: 'категорія', isMother: true}]
    },

    subCategories: {
        title: 'підкатегорія',
        column: [{width: 150}, {width: 150}],
        header: [{title: 'Підкатегорія'}, {title: 'Категорія'}],
        row: [
            {typeColumn: "subCategories", typeInput: 'text', placeholder: 'підкатегорія', isMother: true},
            {typeColumn: "categories", typeInput: 'text', placeholder: 'категорія', isMother: false},
        ]
    },
}


export const AllCategories: Array<RowItem>= [
    {id: 't1', toDelete: false, wasEdit: false, columns:[
            {typeColumn: "categories", wasEdit: false, value:"вода"}
        ]},
    {id: 't2', toDelete: false, wasEdit: false, columns:[
            {typeColumn: "categories", wasEdit: false, value:"фрукти"}
        ]},
    {id: 't3', toDelete: false, wasEdit: false, columns:[
            {typeColumn: "categories", wasEdit: false, value:"овочі"}
        ]}
]