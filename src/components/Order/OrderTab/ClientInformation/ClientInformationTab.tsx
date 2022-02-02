import React, {ChangeEvent} from 'react';
import cl from "../OrderTab.module.scss";
import {ClientInformation} from "../../../../types/orderReducerTypes";

type ClientInformationTab = {
    setName: (e: ChangeEvent<HTMLInputElement>) => void
    setSurname: (e: ChangeEvent<HTMLInputElement>) => void
    setNumber: (e: ChangeEvent<HTMLInputElement>) => void
    setAddress: (e: ChangeEvent<HTMLInputElement>) => void
    setComments: (e: ChangeEvent<HTMLTextAreaElement>) => void
    clientInformation: ClientInformation
}

export const ClientInformationTab: React.FC<ClientInformationTab> = (
    {
        setName,
        setComments,
        setAddress,
        setSurname,
        setNumber,
        clientInformation
    }) => {
    return (
        <div className={cl.ClientInformation}>
            <div className={'font-bold text-xl'}> Інформація клієнта</div>

            <div className={'flex justify-around'}>
                <div>
                    <input
                        className={'border-b-2'}
                        onChange={setName}
                        value={clientInformation.name}
                        placeholder={'name'}/>
                </div>
                <div>
                    <input
                        className={'border-b-2'}
                        onChange={setSurname}
                        value={clientInformation.surname}
                        placeholder={'surname'}/>
                </div>
            </div>
            <div className={'flex justify-around'}>
                <div>
                    <input
                        className={'border-b-2'}
                        type={'tel'}

                        onChange={setNumber}
                        value={clientInformation.number}
                        placeholder={'number'}/>
                </div>

                <div>
                    <input
                        className={'border-b-2'}
                        type={'text'}
                        onChange={setAddress}
                        value={clientInformation.address}
                        placeholder={'address'}/>
                </div>
            </div>

            <div>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    коментар
                    <textarea
                        value={clientInformation.comments}
                        onChange={setComments}
                        placeholder={'comment'}
                        className={'w-full text-base px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'}
                    />
                </label>
            </div>
        </div>
    );
}