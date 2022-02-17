import {useContext, useMemo} from "react";
import {useActionsTable} from "./useActionTable";
import {TableShieldContext} from "../TableShield/TableShieldContext";


export function useExternalActions() {
    const {tableCreateLine} = useActionsTable()
    const {lineStructure} = useContext(TableShieldContext)
    return {
        tableCreateLine:
            function () {
                tableCreateLine.apply(null, [lineStructure])
            }
    }


}