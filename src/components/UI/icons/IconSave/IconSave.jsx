import React from 'react';
import {ReactComponent as Svg} from './FilePlus.svg'

 const IconSaveInner = () => {
     return (
         <div>
             <Svg/>
         </div>
     );
 };

// export  const IconSave = IconSaveInner
export const IconSave = React.memo(IconSaveInner)