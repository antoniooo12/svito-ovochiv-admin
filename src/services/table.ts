import {ColumnReduxStructure, ICategoryTypeStructure, Item, Line} from "../types/categoryReducerTypes";
import {TypeColumn, TypeTable} from "../types/TableCreatorTypes";
import {dependentsIdMok, NameToTableId} from "../mokData";
import {OrderedGood} from "../types/orderReducerTypes";

export function parseTableLines({isNew, isAll,}: { isNew: ICategoryTypeStructure, isAll: ICategoryTypeStructure })
    : { allToDelete: (string | number)[], newToServer: ColumnReduxStructure[], allToUpdate: ColumnReduxStructure[] } {
    const allToDelete: Array<number | string> = isAll.data.flatMap(line => line.toDelete ? line.id : [])
    const newToServer = isNew.data.flatMap(line => !line.toDelete ? line.columns : [])
    const allToUpdate = isAll.data.flatMap(line => !line.toDelete && line.wasEdit ? line.columns : [])
    return {allToDelete, newToServer, allToUpdate}
}

export function parseDbToWebTable<T>(rowsFromDb: Array<T & { id: number }>, nameColumn: TypeColumn, excluded: string[]) {
    return rowsFromDb.map(function (line) {
        return parseObject1<T>(line, nameColumn, excluded) as Line
    })
}

export function parseObject1<T>(rowDb: T & { id: number }, nameColumn: TypeColumn, excluded: string[]) {
    const object: Partial<Line> = {}
    object.columns = {}
    object.id = rowDb?.id as number
    reverse(rowDb, nameColumn)

    function reverse(rowDbInner: { [name: string]: any }, nameColumnInner: TypeColumn) {
        return Object.keys(rowDbInner).forEach((key, index: number) => {
            const item = rowDbInner[key]
            if (typeof item !== "object" && !excluded.includes(key)) {
                if (index === 0 && rowDbInner && !NameToTableId[key]) {
                    object.columns![nameColumnInner] = {
                        id: rowDbInner.id ? rowDbInner.id : -1,
                        value: Number(rowDbInner.value) || rowDbInner.value || item,
                    } as Item
                }
                if (dependentsIdMok.get(nameColumnInner)) {
                    const depend = dependentsIdMok.get(nameColumnInner)?.reduce((accumulator, depend) => {
                        accumulator = {
                            ...accumulator,
                            [depend]: rowDbInner[depend],
                        }
                        return accumulator
                    }, {})
                    object.columns![nameColumnInner as TypeColumn] = {
                        ...object.columns![nameColumnInner as TypeColumn],
                        dependencyId: depend,
                    } as Item

                }
                if (NameToTableId[key]) {
                    object.columns![nameColumnInner] = {
                        ...object.columns![nameColumnInner],
                        dependencyId: {
                            ...object.columns![nameColumnInner],
                            [key]: Number(item) || item,
                        }
                    } as Item
                }
                if (key !== nameColumnInner && key !== 'id' && key !== 'value' && !key.includes('Id')) {
                    object.columns![key as TypeColumn] = {
                        typeColumn: key,
                        value: typeof item === "boolean" ? item : Number(item) || item,
                    } as Item
                }

            }
            if (typeof item === "object") {
                reverse(item, key as TypeColumn)
            }
        })
    }

    return object
}

// export function evil(fn: string) {
//     return new Function('return ' + fn)();
// }