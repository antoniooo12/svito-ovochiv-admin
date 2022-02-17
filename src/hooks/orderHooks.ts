import {socket} from "../soket/soket";
import {useActions} from "./useActions";
import {useEffect} from "react";


export function useGetAllOrders(deps?: any[]) {
    const {setOrders} = useActions()
    useEffect(() => {
        socket.on('WEB:UPDATE:ORDERS', (ordersFromServer) => {
            setOrders({orders: ordersFromServer})
        })
    }, deps)

}