import {Item} from "./types/categoryReducerTypes";
import {EnumInput} from "./components/Table/elements/TableInput/TableInput";
import {TableCreator} from "./types/TableCreatorTypes";

export const TableCreatorMokData: TableCreator = {
    categories: {
        column: [{width: 150}],
        header: [{title: 'Категорія'}],
        row: [{typeColumn: "categories", typeInput: 'text', placeholder: 'категорія', isMother: true}]
    },
    subCategories: {
        column: [{width: 150}, {width: 150}],
        header: [{title: 'Підкатегорія'}, {title: 'Категорія'}],
        row: [
            {typeColumn: "subCategories", typeInput: 'text', placeholder: 'підкатегорія', isMother: true},
            {typeColumn: "categories", typeInput: 'text', placeholder: 'категорія', isMother: true},

        ]
    }
}

// export const CategoriesMokData: Array<Item> = [
//     {value: 'картошка', wasEdit: false,},
//     {value: 'капуста', wasEdit: false,},
//     {value: 'морква', wasEdit: false,},
//     {value: 'огирок', wasEdit: false,},
// ]
