import {createContext} from "react";
import {TTableLine, EnumStatus} from "../../types/TableReducerTypes";

type ILineContent = {
    lineId: number | string,
    wasEdit: boolean,
    status: keyof typeof EnumStatus,
    lineData?: TTableLine,
}
export const LineContext = createContext<ILineContent>({lineId: 0, wasEdit: false, status: "isNew"})