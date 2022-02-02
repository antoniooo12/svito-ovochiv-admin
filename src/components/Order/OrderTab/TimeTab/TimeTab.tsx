import React, {ChangeEvent, useCallback} from 'react';
import {TimeFrame} from "../../../../types/orderReducerTypes";

type TimeTab = {
    timeFrame: TimeFrame
    setTimeFrame: React.Dispatch<React.SetStateAction<TimeFrame>>
}
const TimeTab: React.FC<TimeTab> = ({timeFrame, setTimeFrame}) => {

    const onDelverFrom = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTimeFrame(prevState => {
            return {
                ...prevState,
                deliverFrom: new Date(new Date().setHours(Number(event.target.value.slice(0, 2)), Number(event.target.value.slice(3, 5))))
            }
        })
    }, [])
    const onDelverTo = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTimeFrame(prevState => {
            console.log(timeFrame.deliverTo)

            const year = timeFrame.deliverTo.getFullYear()
            const month = timeFrame.deliverTo.getMonth()
            const day = timeFrame.deliverTo.getDay()
            const hour = Number(event.target.value.slice(0, 2))
            const minutes = Number(event.target.value.slice(3, 5))
            let changedDeliverTo = new Date(timeFrame.deliverTo.setHours(hour, minutes))

            return {
                ...prevState,
                deliverTo: changedDeliverTo
            }
        })
    }, [])

    const onDeliverDay = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTimeFrame(prevState => {
            const year = Number(event.target.value.slice(0, 4))
            const month = Number(event.target.value.slice(5, 7))
            const day = Number(event.target.value.slice(8, 10))
            const hour = Number(timeFrame.deliverTo.getHours())
            const minutes = Number(timeFrame.deliverTo.getMinutes())
            let changedDeliverTo = new Date(timeFrame.deliverTo.setUTCMonth(month, day))
            return {
                ...prevState,
                deliverTo: new Date(changedDeliverTo)
            }
        })
    }, [])
    return (
        <div>
            <div className={'text-xl font-bold mb-2'}>
                часові рамки
            </div>
            <div className={'flex justify-around'}>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    доставити з
                    <input
                        onChange={onDelverFrom}
                        value={timeFrame.deliverFrom.toTimeString().slice(0, 5)}
                        className={'appearance-none block w-28 bg-gray-100 text-gray-700 font-bold text-sm border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'}
                        type="time"/>
                </label>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    доставити до
                    <input
                        onChange={onDelverTo}
                        value={timeFrame.deliverTo.toTimeString().slice(0, 5)}
                        className={'appearance-none block w-28 bg-gray-100 text-gray-700 font-bold text-sm border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'}
                        type="time"/>
                </label>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    день доставки
                    <input
                        value={timeFrame.deliverTo.toISOString().split('T')[0]}
                        onChange={onDeliverDay}
                        className={'appearance-none block w-48 bg-gray-100 text-gray-700 font-bold text-sm border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'}
                        type="date"/>
                </label>
            </div>
        </div>
    );
};

export {TimeTab};