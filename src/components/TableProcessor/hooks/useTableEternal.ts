import {useState} from "react";
import {EternalActions} from "../TableShield/TableShield";


export function useTableEternal(): { action: EternalActions, setAction: React.Dispatch<React.SetStateAction<EternalActions>> } {
    const [action, setAction] = useState<EternalActions>({} as EternalActions)
    return {action: action as EternalActions, setAction}
}