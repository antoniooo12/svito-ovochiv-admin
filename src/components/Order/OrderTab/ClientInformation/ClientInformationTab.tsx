import React, {ChangeEvent, useCallback} from 'react';
import cl from "../OrderTab.module.scss";
import {ClientInformation} from "../../../../types/orderReducerTypes";

type ClientInformationTab = {
    setClientInformation:  React.Dispatch<React.SetStateAction<ClientInformation>>,
    clientInformation: ClientInformation
}

export const ClientInformationTab: React.FC<ClientInformationTab> = (
    {
        setClientInformation,
        clientInformation,
    }) => {

    const setName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setClientInformation((prevState) => {
            return {
                ...prevState,
                name: e.target.value
            }
        })
    }, [])
    const setSurname = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setClientInformation((prevState) => {
            return {
                ...prevState,
                surname: e.target.value
            }
        })
    }, [])
    const setAddress = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setClientInformation((prevState => {
            return {
                ...prevState,
                address: e.target.value
            }
        }))
    }, [])
    const setNumber = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setClientInformation((prevState => {
            const value = e.target.value
            const currentValue = value.replace(/[^\d]/g, '');
            const valueLentgh = currentValue.length


            const normilazeNumber = valueLentgh < 4 ? currentValue :
                value.length < 10
                    ? `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`
                    : `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`

            return {
                ...prevState,
                number: normilazeNumber
            }
        }))
    }, [])
    const setClientComment = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setClientInformation((prevState => {
            return {
                ...prevState,
                comments: e.target.value
            }
        }))
    }, [])
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
                        onChange={setClientComment}
                        placeholder={'comment'}
                        className={'w-full text-base px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'}
                    />
                </label>
            </div>
        </div>
    );
}