import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootState} from "../reducer";
import {getIdFromValueString1} from "../reducer/helpers/helper";
import {TypeTable} from "../types/TableCreatorTypes";
import {useActions} from "./useActions";
import {ColumnReduxStructure, ICategoryTypeStructure, Line} from "../types/categoryReducerTypes";
import {deleteAllNewInstance} from "../reducer/tableReducer";
import {parseTableLines} from "../services/table";

export function useEffectSkipMount(cb: any, deps: any) {
    const mounted = useRef(true)
    useEffect(() => {
        if (!mounted.current) {
            return cb()
        }
        mounted.current = false
    }, deps)
}

export function useEffectSkipAll(cb: any, deps: any) {
    const mounted = useRef(false)
    useEffect(() => {
        if (mounted.current) {
            return cb()
        }
        mounted.current = true
    }, deps)
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
// export const useTypedSelectorMemo = (deps: any) => {
//     useCallback(()=>{
//         useTypedSelector
//     },[deps])
// }

export function useTest(value: string | number | boolean) {
    return getIdFromValueString1(value)
}


export function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export function useForceUpdateALl() {
    const [value, setValue] = useState(0); // integer state
    return {forceUpdate: () => setValue(value => value + 1), forceUpdateValue: value}; // update the state to force render
}

export const useSaveTable = (initial: TypeTable): { onClick: any } => {
    const dispatch = useDispatch()
    const {saveTable, getAllRowsByTableName} = useActions()
    const {forceUpdate, forceUpdateValue} = useForceUpdateALl()
    const behavior: TypeTable = useMemo(() => {
        return initial
    }, [initial])
    const {isNew, isAll} = useTypedSelector(state => state.tableReducer.storage[behavior])


    const {allToDelete, newToServer, allToUpdate} = useMemo(() => {
        const {allToDelete, newToServer, allToUpdate} = parseTableLines({isNew, isAll})
        return {allToDelete, newToServer, allToUpdate}
    }, [behavior, isNew.data, isAll])

    const onSave = useCallback(async () => {
        await forceUpdate()
        await saveTable({behavior, allToDelete, newToServer, allToUpdate})
        await getAllRowsByTableName({behavior})
        dispatch(deleteAllNewInstance({typeTable: behavior}))
    }, [isNew.data, isAll.data])

    return {onClick: onSave}
}

