import {socket} from "../../soket/soket";
// import {setOrders} from "../../reducer/orderReducer";

export const getAllOrders = new Promise((resolve, rejects) => {
        socket.on('WEB:UPDATE:ORDERS', (ordersFromServer) => {
            console.log('--> WEB:UPDATE:ORDERS')
            console.log(ordersFromServer)
            // setOrders({orders: ordersFromServer})
            // if (typeof ordersFromServer === ) {
                resolve(ordersFromServer)
            // }
        })
    }
)


