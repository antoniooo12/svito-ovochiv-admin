import React from 'react';
import cl from "./CategorySubPage.module.scss";
import {BtnBlue} from "../../../components/UI/BtnBlue/BtnBlue";
import {IconSave} from "../../../components/UI/icons/IconSave";

const CategorySubPage = () => {
    const onSave = () => {

    }
    return (
        <div className={cl.wrapper}>
            <div className={cl.leftHeader}>
                <div className={cl.leftLine}>
                    <div className={cl.lineCategory}>Назва категорії</div>
                </div>
            </div>
            <div className={cl.right}>
                <div className={cl.rightMainSection}>
                    <BtnBlue onClick={(e) => {
                        // onCreateProduct()
                    }}>
                        створити товар <IconSave/>
                    </BtnBlue>
                </div>

                <div className={cl.rightBottom}>
                    <BtnBlue onClick={(e) => onSave()}>
                        зберегти
                    </BtnBlue>
                </div>
            </div>
        </div>
    );
};

export default CategorySubPage;