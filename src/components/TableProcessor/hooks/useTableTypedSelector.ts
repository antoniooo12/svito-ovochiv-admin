import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootTableReducer} from "../redux";

export const useTableTypedSelector: TypedUseSelectorHook<RootTableReducer> = useSelector
