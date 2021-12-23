import * as React from 'react';
import {ITableHeader} from "../TableHeader/TableHeader";
import Header from "../../Header/Header";


interface ITabsComposition {
    Header: React.FC<ITableHeader>;
}
/**
 * This component maintains internal state and provides those
 * pieces of state & functions to its children.
 *
 * Note that this component itself does not directly update state.
 */
const Tabs: React.FC & ITabsComposition = props => {
    return (
        <div>
            {props.children}
        </div>
    );
};

/**
 * This Context hook allows our child components to easily reach
 * into the Tabs context and get the pieces it needs.
 *
 * Bonus: it even makes sure the component is used within a
 * Tabs component!
 */


Tabs.Header = Header;

export { Tabs };
