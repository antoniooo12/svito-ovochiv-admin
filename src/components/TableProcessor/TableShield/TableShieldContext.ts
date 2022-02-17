import {createContext} from "react";
import {changeColumn, tableCreateLine} from "../redux/reducer/tableReducer";
import {useActionsTable} from "../hooks/useActionTable";
import {LineStructure} from "../../../types/TableCreatorTypes";
import {useExternalActions} from "../hooks/useExternalActions";

type TableShieldContext = {
    tableActions: ReturnType<typeof useActionsTable | typeof useExternalActions>,
    lineStructure: LineStructure
}
export const TableShieldContext = createContext<TableShieldContext>({} as TableShieldContext)