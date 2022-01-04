import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../reducer";
import {getIdFromValueString1} from "../reducer/helpers/helper";
import {TypeTable} from "../types/TableCreatorTypes";
import {useActions} from "./useActions";

export function useEffectSkipMount(cb: any, deps: any) {
    const mounted = useRef(true)
    useEffect(() => {
        if (!mounted.current) {
            return cb()
        }
        mounted.current = false
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
    const {saveTable} = useActions()
    const {forceUpdate, forceUpdateValue} = useForceUpdateALl()
    const behavior: TypeTable = useMemo(() => {
        return initial
    }, [initial])
    const {isNew, isAll} = useTypedSelector(state => state.tableReducer.storage[behavior])
    console.log(isNew)
    const {allToDelete, newToServer, allToUpdate} = useMemo(() => {
        const allToDelete = isAll.data.filter(line => line.toDelete)
        const newToServer = isNew.data.filter(line => !line.toDelete)
        const allToUpdate = isAll.data.filter(line => line.wasEdit)
        return {allToDelete, newToServer, allToUpdate}
    }, [behavior, isNew, isAll])

    const onSave = useCallback(async () => {
        await forceUpdate()
        await saveTable({behavior, allToDelete, newToServer, allToUpdate})
    }, [isNew.data, isAll.data])

    return {onClick: onSave}
}

