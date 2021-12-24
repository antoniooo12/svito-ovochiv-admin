import {Item} from "./types/categoryReducerTypes";
import {EnumInput} from "./components/Table/elements/TableInput/TableInput";
import {TableCreator} from "./types/TableCreatorTypes";

export const TableCreatorMokData: TableCreator = {
    categories: {
        column: [{width: 150}],
        header: [{title: 'Категорія'}],
        row: [{typeColumn: "string", typeInput: 'input', placeholder: 'категорія', isMother: true}]
    }
}

export const CategoriesMokData: Array<Item> = [
    {value:'картошка', id:1 , wasEdit:false, toDelete:false},
    {value:'капуста', id:2 , wasEdit:false, toDelete:false},
    {value:'морква', id:3 , wasEdit:false, toDelete:false},
    {value:'огирок', id:4 , wasEdit:false, toDelete:false},
]
