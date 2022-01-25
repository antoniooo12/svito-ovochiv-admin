import {EnumInput, EnumStyles, TablesCreator, TypeTable} from "./types/TableCreatorTypes";
import {Line} from "./types/categoryReducerTypes";

export const DataEntitiesCatalog = {
    Product: 'продукти',
    Category: "категорія",
    Subcategory: "підкатегорії",
    TypeOfProduct: 'тип продуктів',
}

export const DataColumn = {
    Product: 'продукти',
    Category: "категорія",
    Subcategory: "підкатегорії",
    TypeOfProduct: 'тип продуктів',
    actual: "актуальность",
    price: 'ціна',
    priority: 'пріорітет',
}

export const Columns = {
    Category: {Category: 'категорія'}
}

export const TableCreatorMokData: TablesCreator = {
    Category: {
        dependency: [],
        title: 'категорія',
        columnParams: [{width: 150}],
        header: [{title: 'Категорія'}],
        row: {
            Category: {
                typeColumn: "Category",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: 'категорія',
                isMother: true
            }
        }
    },

    Subcategory: {
        dependency: ["Category"],
        title: 'підкатегорія',
        columnParams: [{width: 150}, {width: 150}],
        header: [{title: 'Підкатегорія'}, {title: 'Категорія'}],
        row: {
            Subcategory: {
                typeColumn: "Subcategory",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: 'підкатегорія',
                isMother: true
            },
            Category: {
                typeColumn: "Category",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: 'категорія',
                isMother: false
            }
        }
    },
    Product: {
        dependency: ["Category", 'Subcategory', "TypeOfProduct"],
        title: 'продукти',
        columnParams: [{width: 150}, {width: 150}, {width: 150}, {width: 70}, {width: 70}, {width: 80}, {width: 70}],
        header: [{title: 'Продукти'}, {title: 'Категорія'}, {title: 'Підкатегорія'}, {title: 'Ціна'}, {
            title: 'Пріорітет',
            style: [EnumStyles.fontSize14],
        }, {
            title: 'тип',
            style: [EnumStyles.fontSize14],
        }, {
            title: `Актуаль- ність`,
            style: [EnumStyles.fontSize14],
        },],
        row: {
            Product: {
                typeColumn: "Product",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: 'назва продукта',
                isMother: true
            },
            Category: {
                typeColumn: "Category",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: 'категорія',
                isMother: false
            },
            Subcategory: {
                typeColumn: "Subcategory",
                isDropDownList: true,
                filterByColumn: "Category",
                typeInput: EnumInput.text,
                placeholder: 'підкатегорія',
                isMother: false
            },
            price: {
                typeColumn: "price",
                isDropDownList: false,
                typeInput: EnumInput.number,
                placeholder: 'ціна',
                numberStep: 0.1,
                bigNumberStep: 1,
            },
            priority: {
                typeColumn: "priority",
                isDropDownList: false,
                typeInput: EnumInput.number,
                isMother: false,
            },
            TypeOfProduct: {
                typeColumn: 'TypeOfProduct',
                style: [EnumStyles.fontSizeSmall],
                isDropDownList: false,
                typeInput: EnumInput.select,
            },
            actual: {
                defaultState: true,
                typeColumn: "actual",
                isDropDownList: false,
                typeInput: EnumInput.checkbox,
                placeholder: 'продається',
                style: [EnumStyles.toggleButton],
            },
        }
    },

    TypeOfProduct: {
        dependency: [],
        title: 'тип продуткти',
        columnParams: [{width: 150}],
        header: [{title: 'Тип продуткту'}],
        row: {
            TypeOfProduct: {
                typeColumn: "TypeOfProduct",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: 'тип продуткти',
                isMother: true,
            }
        }

    }
}

interface ServerTable {
    rows: Array<Line>
}

// export const AllSubCategories: ServerTable = {
//     rows:
//         [
//             // {
//             //     id: 't1', toDelete: false, wasEdit: false, columns: [
//             //         {id: 1, typeColumn: "subCategories", wasEdit: false, value: "вода", dependencyId: 1},
//             //         {id: 1, typeColumn: "categories", wasEdit: false, value: "напої",},
//             //     ]
//             // },
//             // {
//             //     id: 't2', toDelete: false, wasEdit: false, columns: [
//             //         {id: 12, typeColumn: "subCategories", wasEdit: false, value: "яблука", dependencyId: 31},
//             //         {id: 31, typeColumn: "categories", wasEdit: false, value: "фрукти"},
//             //     ]
//             // },
//             // {
//             //     id: 't3', toDelete: false, wasEdit: false, columns: [
//             //         {id: 12, typeColumn: "subCategories", wasEdit: false, value: "картопля", dependencyId: 2},
//             //         {id: 2, typeColumn: "categories", wasEdit: false, value: "овочі"},
//             //     ]
//             // }
//         ]
// }
//
//
// export const AllCategories: ServerTable = {
//     rows: [
//         // {
//         //     id: 't1', toDelete: false, wasEdit: false, columns: [
//         //         {id: 1, typeColumn: "categories", wasEdit: false, value: "напої"},
//         //     ]
//         // },
//         // {
//         //     id: 't2', toDelete: false, wasEdit: false, columns: [
//         //         {id: 31, typeColumn: "categories", wasEdit: false, value: "фрукти"},
//         //     ]
//         // },
//         // {
//         //     id: 't3', toDelete: false, wasEdit: false, columns: [
//         //         {id: 2, typeColumn: "categories", wasEdit: false, value: "овочі"},
//         //     ]
//         // }
//     ]
// }
// export const AllTypesOfProduct: ServerTable = {
//     rows: [
//         {
//             id: 't1', toDelete: false, wasEdit: false, columns: [
//                 {id: 1, typeColumn: "TypeOfProduct", wasEdit: false, value: "кілограми"},
//             ]
//         },
//         {
//             id: 't2', toDelete: false, wasEdit: false, columns: [
//                 {id: 31, typeColumn: "TypeOfProduct", wasEdit: false, value: "грами"},
//             ]
//         },
//         {
//             id: 't3', toDelete: false, wasEdit: false, columns: [
//                 {id: 2, typeColumn: "TypeOfProduct", wasEdit: false, value: "штука"},
//             ]
//         }
//     ]
// }
//
// export const AllProducts: ServerTable = {
//     rows: []
// }

// export const
// export const AllData: { [name in TypeTable]: ServerTable } = {
//     // Subcategory: AllSubCategories,
//     // Category: AllCategories,
//     // Product: AllProducts,
//     // TypeOfProduct: AllTypesOfProduct,
// }


export const mainPagesList = [
    {
        id: 3, title: 'товари', path: '/goods', page: 'ProductsPage',
        defaultTable: Object.keys(DataEntitiesCatalog)[0],
        cb: function () {
            return `${this.path}/${this.defaultTable}`
        }
    },
    {id: 1, title: 'прайс', path: '/price', page: 'PricePage'},
    {id: 2, title: 'замовлення', path: '/orders', page: 'ProductsPage'}
]