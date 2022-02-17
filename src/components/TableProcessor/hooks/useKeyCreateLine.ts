import {useContext, useEffect} from "react";
import {TableShieldContext} from "../TableShield/TableShieldContext";
import {useExternalActions} from "./useExternalActions";


export function useKeyCreateLine() {
    const {tableActions} = useContext(TableShieldContext)
    const {tableCreateLine} = useExternalActions()
    useEffect(() => {
        const onKeyDown = (event: any) => {
            keysPressed[event.code] = true;
        }
        const onKeyUp = (event: any) => {
            if (keysPressed['AltLeft'] && event.code === 'KeyA') {
                if (typeof tableCreateLine !== "function") {
                    throw new Error('Table tableCreateLine is not a function')
                }
                tableCreateLine()
            }
            delete keysPressed[event.code];
        }
        let keysPressed: any = {};
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)
        }
    }, [])
}
