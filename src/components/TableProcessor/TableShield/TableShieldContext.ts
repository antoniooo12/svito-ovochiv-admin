import {createContext} from "react";
import {useTableActions} from "../hooks/useCreateLine";

type TableShieldContext = {
    tableActions: ReturnType<typeof useTableActions>
}
export const TableShieldContext = createContext<TableShieldContext>({
    tableActions: {
        useCreateLine: () => {
        }
    }
})