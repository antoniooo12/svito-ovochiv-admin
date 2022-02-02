import React, {createContext} from "react";
import {SelectedOrder} from "./OrdersPage";

type OrderPageContext = {
    isCreateNewOrderOpen: boolean
    setIsCreateNewOrderOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedOrder: SelectedOrder
    setSelectedIdOrder: React.Dispatch<React.SetStateAction<SelectedOrder>>

}
export const OrderPageContext = createContext<OrderPageContext>({
    isCreateNewOrderOpen: false,
    setIsCreateNewOrderOpen: () => {
    },
    selectedOrder: {isOpen: false, id: ''},
    setSelectedIdOrder: () => {
    }
})
