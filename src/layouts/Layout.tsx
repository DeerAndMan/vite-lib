import React from 'react';
import Nav from './Nav';

export type Props = React.PropsWithChildren;

/**
 * Layout 组件
 * @returns {React.FunctionComponent}
 */
export const Layout = (props: Props) => {
    const { children } = props;
    return (
        <div>
            <Nav></Nav>
            {children}
        </div>
    );
};

export default Layout;
