import {useActionsTable} from "./useActionTable";
import {DataEntitiesTableStructure, LineStructure} from "../../../types/TableCreatorTypes";
import {curry} from "../../../functional/curry";

// Partial<{ [key in keyof typeof actionsTable]: Function }>
// export function useBindTable(tableParams: DataEntitiesTableStructure) {
//     const {tableStoreReducer, ...actionsTable} = useActionsTable()
//     const res = Object.keys(actionsTable).reduce((accumulator: any, key) => {
//             const action = actionsTable[key as keyof typeof actionsTable]
//             const clue = key as keyof typeof actionsTable
//             const lineStr = tableParams.row as LineStructure
//             console.log(action().length)
//             accumulator[clue] = function () {
//                 return curry(action)(lineStr)
//             }
//             // accumulator[clue] = curry(action)(lineStr)
//             // accumulator[clue] = function (lineStructure: LineStructure) {
//             //     // @ts-ignore
//             //     return action.bind(null, lineStr)()
//             // }
//             console.log(accumulator[clue])
//             // accumulator[clue] = accumulator[clue]
//             console.log(accumulator[clue].this)
//             return accumulator
//         }, {}
//     )
//     return res as { [key in keyof typeof actionsTable]: Function }
// }