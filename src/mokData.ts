import {EnumInput, EnumStyles, TableCreator, TypeTable} from "./types/TableCreatorTypes";
import {RowItem} from "./types/categoryReducerTypes";

export const DataEntitiesCatalog = {
    products: 'продукти',
    categories: "категорія",
    subCategories: "підкатегорії",
    typesOfProducts: 'тип продуктів',
}

export const DataColumn = {
    categories: "категорія",
    subCategories: "підкатегорія",
    products: "продукти",
    actual: "актуальность",
    price: 'ціна',
    priority: 'пріорітет',
    typesOfProducts: 'тип',
}

export const TableCreatorMokData: TableCreator = {
    categories: {
        title: 'категорія',
        column: [{width: 150}],
        header: [{title: 'Категорія'}],
        row: [{
            typeColumn: "categories",
            isDropDownList: false,
            typeInput: EnumInput.text,
            placeholder: 'категорія',
            isMother: true
        }]
    },

    subCategories: {
        title: 'підкатегорія',
        column: [{width: 150}, {width: 150}],
        header: [{title: 'Підкатегорія'}, {title: 'Категорія'}],
        row: [
            {
                typeColumn: "subCategories",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: 'підкатегорія',
                isMother: true
            },
            {
                typeColumn: "categories",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: 'категорія',
                isMother: false
            }
        ]
    },
    products: {
        title: 'продукти',
        column: [{width: 150}, {width: 150}, {width: 150}, {width: 70}, {width: 70}, {width: 50}, {width: 70}],
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
        row: [
            {
                typeColumn: "products",
                isDropDownList: false,
                typeInput: EnumInput.text,
                placeholder: 'назва продукта',
                isMother: true
            },
            {
                typeColumn: "categories",
                isDropDownList: true,
                typeInput: EnumInput.text,
                placeholder: 'категорія',
                isMother: false
            },
            {
                typeColumn: "subCategories",
                isDropDownList: true,
                filterByColumn: "categories",
                typeInput: EnumInput.text,
                placeholder: 'підкатегорія',
                isMother: false
            },
            {
                typeColumn: "price",
                isDropDownList: false,
                typeInput: EnumInput.number,
                placeholder: 'ціна',
                numberStep: 0.1,
                bigNumberStep: 1,
            },
            {
                typeColumn: "priority",
                isDropDownList: false,
                typeInput: EnumInput.number,
                isMother: false,
            },
            {
                typeColumn: 'typesOfProducts',
                style: [EnumStyles.fontSizeSmall],
                isDropDownList: false,
                typeInput: EnumInput.select,
            },
            {
                typeColumn: "actual",
                isDropDownList: false,
                typeInput: EnumInput.checkbox,
                placeholder: 'актуальність',
                style: [EnumStyles.toggleButton],
            },
        ]
    },
    typesOfProducts: {
        title: 'тип продуткти',
        column: [{width: 150}],
        header: [{title: 'Категорія'}],
        row: [{
            typeColumn: "typesOfProducts",
            isDropDownList: false,
            typeInput: EnumInput.text,
            placeholder: 'тип продуткти',
            isMother: true,
        }]
    }
}

interface ServerTable {
    dependency: TypeTable[],
    rows: Array<RowItem>
}

export const AllSubCategories: ServerTable = {
    dependency: ["categories"],
    rows:
        [
            {
                id: 't1', toDelete: false, wasEdit: false, columns: [
                    {id: 1, typeColumn: "subCategories", wasEdit: false, value: "вода", dependencyId: 1},
                    {id: 1, typeColumn: "categories", wasEdit: false, value: "напої",},
                ]
            },
            {
                id: 't2', toDelete: false, wasEdit: false, columns: [
                    {id: 12, typeColumn: "subCategories", wasEdit: false, value: "яблука", dependencyId: 31},
                    {id: 31, typeColumn: "categories", wasEdit: false, value: "фрукти"},
                ]
            },
            {
                id: 't3', toDelete: false, wasEdit: false, columns: [
                    {id: 12, typeColumn: "subCategories", wasEdit: false, value: "картопля", dependencyId: 2},
                    {id: 2, typeColumn: "categories", wasEdit: false, value: "овочі"},
                ]
            }
        ]
}


export const AllCategories: ServerTable = {
    dependency: [],
    rows: [
        {
            id: 't1', toDelete: false, wasEdit: false, columns: [
                {id: 1, typeColumn: "categories", wasEdit: false, value: "напої"},
            ]
        },
        {
            id: 't2', toDelete: false, wasEdit: false, columns: [
                {id: 31, typeColumn: "categories", wasEdit: false, value: "фрукти"},
            ]
        },
        {
            id: 't3', toDelete: false, wasEdit: false, columns: [
                {id: 2, typeColumn: "categories", wasEdit: false, value: "овочі"},
            ]
        }
    ]
}
export const AllTypesOfProduct: ServerTable = {
    dependency: [],
    rows: [
        {
            id: 't1', toDelete: false, wasEdit: false, columns: [
                {id: 1, typeColumn: "typesOfProducts", wasEdit: false, value: "кіло грами"},
            ]
        },
        {
            id: 't2', toDelete: false, wasEdit: false, columns: [
                {id: 31, typeColumn: "typesOfProducts", wasEdit: false, value: "грами"},
            ]
        },
        {
            id: 't3', toDelete: false, wasEdit: false, columns: [
                {id: 2, typeColumn: "typesOfProducts", wasEdit: false, value: "штука"},
            ]
        }
    ]
}

export const AllProducts: ServerTable = {
    dependency: ["categories", "subCategories", "typesOfProducts"],
    rows: []
}
export const AllData: { [name in TypeTable]: ServerTable } = {
    subCategories: AllSubCategories,
    categories: AllCategories,
    products: AllProducts,
    typesOfProducts: AllTypesOfProduct,
}