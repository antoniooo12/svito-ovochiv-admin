import React from 'react';
import {ReactComponent as Svg} from './FilePlus.svg'
import isEqual from "react-fast-compare";

const IconSave = () => {
    return (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19.5313 21.875H5.46802C5.26082 21.875 5.0621 21.7927 4.91559 21.6462C4.76908 21.4997 4.68677 21.301 4.68677 21.0938V3.90625C4.68677 3.69905 4.76908 3.50034 4.91559 3.35382C5.0621 3.20731 5.26082 3.125 5.46802 3.125H14.8438L20.3125 8.59375V21.0938C20.3125 21.1963 20.2923 21.2979 20.2531 21.3927C20.2138 21.4875 20.1563 21.5736 20.0837 21.6462C20.0112 21.7187 19.925 21.7763 19.8303 21.8155C19.7355 21.8548 19.6339 21.875 19.5313 21.875Z"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.8438 3.125V8.59375H20.3133" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M10.1562 14.8438H14.8438" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M12.5 12.5V17.1875" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
        </svg>

    )
}

// export  const IconSave = IconSaveInner
export {IconSave}