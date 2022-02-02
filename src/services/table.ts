import {ColumnReduxStructure, ICategoryTypeStructure} from "../types/categoryReducerTypes";

export function parseTableLines({isNew, isAll,}: { isNew: ICategoryTypeStructure, isAll: ICategoryTypeStructure })
    : { allToDelete: (string | number)[], newToServer: ColumnReduxStructure[], allToUpdate: ColumnReduxStructure[] } {
    const allToDelete: Array<number | string> = isAll.data.flatMap(line => line.toDelete ? line.id : [])
    const newToServer = isNew.data.flatMap(line => !line.toDelete ? line.columns : [])
    const allToUpdate = isAll.data.flatMap(line => !line.toDelete && line.wasEdit ? line.columns : [])
    return {allToDelete, newToServer, allToUpdate}
}

// export function evil(fn: string) {
//     return new Function('return ' + fn)();
// }