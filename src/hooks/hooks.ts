import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootState} from "../reducer";
import {getIdFromValueString1} from "../reducer/helpers/helper";
import {TypeTable} from "../types/TableCreatorTypes";
import {saveTable} from "../actions/table";
import isEqual from "react-fast-compare";

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


export const useSaveTable = (initial: TypeTable): { onClick: any } => {
    const behavior: TypeTable = useMemo(() => {
        return initial
    }, [initial])
    const {isNew, isAll} = useTypedSelector(state => state.tableReducer.storage[behavior])
    const {allToDelete, newToServer} = useMemo(() => {
        const allToDelete = isAll.data.filter(line => line.toDelete)
        const newToServer = isNew.data.filter(line => !line.toDelete)
        return {allToDelete, newToServer}
    }, [behavior])

    return {onClick: saveTable({behavior, allToDelete, newToServer})}
}

