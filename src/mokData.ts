import {TableCreator} from "./types/TableCreatorTypes";
import {RowItem} from "./types/categoryReducerTypes";

export const DataEntitiesCatalog = {
    categories: "категорія",
    subCategories: "підкатегорії",
    products: 'продукти',
}

export const DataColumn = {
    categories: "категорія",
    subCategories: "підкатегорія",
    products: 'продукти',
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
            {typeColumn: "categories", typeInput: 'text', placeholder: 'категорія', isMother: false}
        ]
    },
    products:{
        title: 'продукти',
        column: [{width: 150}, {width: 150}, {width: 150}],
        header: [{title: 'Продукти'}, {title: 'Категорія'},{title: 'Підкатегорія'}],
        row: [
            {typeColumn: "products", typeInput: 'text', placeholder: 'назва продукта', isMother: true},
            {typeColumn: "categories", typeInput: 'text', placeholder: 'категорія', isMother: false},
            {typeColumn: "subCategories",  filterByColumn: "categories" , typeInput: 'text', placeholder: 'підкатегорія', isMother: false}
        ]
    }
}



export const AllSubCategories: Array<RowItem> =[
    {id: 't1', toDelete: false, wasEdit: false, columns:[
            {id: 1, typeColumn: "subCategories", wasEdit: false, value: "вода", dependencyId: 1},
            {id: 1, typeColumn: "categories", wasEdit: false, value: "напої"},
        ]},
    {id: 't2', toDelete: false, wasEdit: false, columns:[
            {id: 12, typeColumn: "subCategories", wasEdit: false, value: "яблука", dependencyId: 31},
            {id: 31, typeColumn: "categories", wasEdit: false, value: "фрукти"},
        ]},
    {id: 't3', toDelete: false, wasEdit: false, columns:[
            {id: 12, typeColumn: "subCategories", wasEdit: false, value: "картопля", dependencyId: 2},
            {id: 2, typeColumn: "categories", wasEdit: false, value: "овочі"},
        ]}
]


export const AllCategories: Array<RowItem>= [
    {id: 't1', toDelete: false, wasEdit: false, columns:[
            {id: 1, typeColumn: "categories", wasEdit: false, value: "напої"},
        ]},
    {id: 't2', toDelete: false, wasEdit: false, columns:[
            {id: 31, typeColumn: "categories", wasEdit: false, value: "фрукти"},
        ]},
    {id: 't3', toDelete: false, wasEdit: false, columns:[
            {id: 2, typeColumn: "categories", wasEdit: false, value: "овочі"},
        ]}
]