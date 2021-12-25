import {Item} from "./types/categoryReducerTypes";
import {EnumInput} from "./components/Table/elements/TableInput/TableInput";
import {IDataEntitiesCatalog, TableCreator} from "./types/TableCreatorTypes";

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
            {typeColumn: "categories", typeInput: 'text', placeholder: 'категорія', isMother: true},

        ]
    },
    workers: {
        title: 'працівники',
        column: [{width: 150}, {width: 150}],
        header: [{title: 'Підкатегорія'}, {title: 'Категорія'}],
        row: [
            {typeColumn: "subCategories", typeInput: 'text', placeholder: 'підкатегорія', isMother: true},
            {typeColumn: "categories", typeInput: 'text', placeholder: 'категорія', isMother: true},
        ]
    }
}


export const DataEntitiesCatalog: IDataEntitiesCatalog = {
    categories: "підкатегорія",
    subCategories: "працівники",
    workers: "категорія",
}

// export const CategoriesMokData: Array<SItem> = [
//     {value: 'картошка', wasEdit: false,},
//     {value: 'капуста', wasEdit: false,},
//     {value: 'морква', wasEdit: false,},
//     {value: 'огирок', wasEdit: false,},
// ]
