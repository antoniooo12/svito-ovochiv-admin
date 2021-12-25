import {createContext} from "react";
import {TypeTable} from "../../../types/TableCreatorTypes";

interface IListContent {
    categories?: any,
    isMother?: any,
    enteredDropDownList?: any,
    typeTable?: TypeTable,
}


export const ListContent = createContext<IListContent>({categories: []})