import React from 'react';
import {ReactComponent as Svg} from './NotePencil.svg'

const NotePencilInner = () => {
    return (
        <Svg/>
    );
};
export const IconNotePencil = React.memo(NotePencilInner)

