import {useEffect} from "react";
import {useActionsTable} from "./useActionTable";
import {DataEntitiesTableStructure, LineStructure} from "../../../types/TableCreatorTypes";


export const useTableActions = (tableParams: DataEntitiesTableStructure) => {
    return {
        useCreateLine: function () {
            return useCreateLine.apply(tableParams, [tableParams.row])
        }
    }
}

function useCreateLine(lineParams: LineStructure) {
    const {tableCreateLine} = useActionsTable()
    useEffect(() => {
        const onKeyDown = (event: any) => {
            keysPressed[event.code] = true;
        }
        const onKeyUp = (event: any) => {
            if (keysPressed['AltLeft'] && event.code === 'KeyA') {
                tableCreateLine(lineParams)
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
