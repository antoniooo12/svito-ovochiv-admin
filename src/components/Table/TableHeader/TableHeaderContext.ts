import {createContext} from "react";

interface IHeaderContent {
    isHeader: boolean,
}

export const HeaderContent = createContext<IHeaderContent>({isHeader: false})

