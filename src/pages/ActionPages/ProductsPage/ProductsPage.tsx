import React, {useCallback, useEffect} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {ProductsPageHeader} from "../../../components/ProductsPageHeader/ProductsPageHeader";
import cl from "./ProductsPage.module.scss";
import {useDispatch} from "react-redux";
import {TypeTable} from "../../../types/TableCreatorTypes";
import {RightPanel} from "../RightPanel/RightPanel";
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {createNewRow} from "../../../reducer/tableReducer";
import {IconSave} from "../../../components/UI/icons/IconSave/IconSave";
import {useSaveTable} from "../../../hooks/hooks";

const ProductsPage = () => {
    const dispatch = useDispatch()
    let location = useLocation();
    const typeTable = location.pathname.split('/').pop() as TypeTable

    const onCreate = useCallback(() => {
        dispatch(createNewRow(typeTable))
    }, [typeTable])
    const {onClick: OnSave} = useSaveTable(typeTable)

    return (
        <div className={cl.wrapper}>
            <div className={cl.left}>
                <ProductsPageHeader/>
                <div className={cl.table}>
                    <Outlet/>
                </div>
            </div>

            <div className={cl.right}>
                <RightPanel>
                    <BtnBlue
                        showChildren={false}
                        onClick={onCreate}
                        icon={<IconSave/>}
                    >
                        Нове поле
                    </BtnBlue>
                    <BtnBlue
                       
                        onClick={OnSave}
                    >
                        зберегти
                    </BtnBlue>
                </RightPanel>

            </div>
        </div>
    );
};

export default React.memo(ProductsPage);