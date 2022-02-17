import React, {createContext} from "react";
import {SelectedOrder} from "./OrdersPage";

type OrderPageContext = {
    isCreateNewOrderOpen: boolean
    setIsCreateNewOrderOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedOrderId: number
    setSelectedIdOrder: React.Dispatch<React.SetStateAction<number>>

}
export const OrderPageContext = createContext<OrderPageContext>({
    isCreateNewOrderOpen: false,
    setIsCreateNewOrderOpen: () => {
    },
    selectedOrderId:0,
    setSelectedIdOrder: () => {
    }
})
