import {TableCreator} from "./types/TableCreatorTypes";

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
            {typeColumn: "subCategories", typeInput: 'text', placeholder: 'категорія', isMother: true},

        ]
    },

}


// export const CategoriesMokData: Array<SItem> = [
//     {value: 'картошка', wasEdit: false,},
//     {value: 'капуста', wasEdit: false,},
//     {value: 'морква', wasEdit: false,},
//     {value: 'огирок', wasEdit: false,},
// ]
