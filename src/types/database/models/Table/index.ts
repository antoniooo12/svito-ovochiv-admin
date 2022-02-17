import { GoodsAttributes} from "./GoodsTypes";
import {TypeColumn} from "../../../TableCreatorTypes";



export type TableAttributes = GoodsAttributes
export type TableType = { [key in TypeColumn]:    TableAttributes}
