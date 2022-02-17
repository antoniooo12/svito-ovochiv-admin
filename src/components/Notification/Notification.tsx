import React from 'react';
import Immutable from "immutable";
import {NotificationLevel} from "../../types/NotificationTypes";
import clsx from "clsx";
import cl from './Notification.module.scss'
import {BtnBlue} from "../UI/BtnBlue/BtnBlue";

type Notification = {
    changing: Immutable.List<{ notificationLevel: NotificationLevel, message: string, action: () => void }>
}


const Notification: React.FC<Notification> = ({changing}) => {
    return (
        <div className={clsx('w-11/12  h-10 bg-gray-300 rounded-lg m-auto ', cl.wrapper)}>
            {changing.map(lamp =>
                <div className={clsx({
                    [cl.indicator]: true,
                    [' bg-yellow-400']: lamp.notificationLevel === NotificationLevel.medium,
                })}
                     key={lamp.message}
                >
                    <div className={clsx(cl.popup)}>
                        {lamp.message}
                        <BtnBlue onClick={lamp.action}>оновити</BtnBlue>
                    </div>

                </div>
            )}
        </div>
    );
};

export {Notification};