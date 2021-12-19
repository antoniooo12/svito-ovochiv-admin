import React from 'react';
import {ReactComponent as Svg} from './Trash.svg'
import isEqual from "react-fast-compare";

const IconTrash = React.memo(() => {
    return (
        <Svg/>
    );
}, isEqual);

export {IconTrash}