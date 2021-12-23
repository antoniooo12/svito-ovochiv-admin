import {useEffect, useRef, useState} from "react";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../reducer";

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


export function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}