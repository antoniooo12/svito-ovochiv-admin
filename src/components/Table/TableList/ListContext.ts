import {createContext} from "react";

interface IListContent {
    categories?: any,
    isMother?: any,
    enteredDropDownList?: any,
}


export const ListContent = createContext<IListContent>({categories: []})