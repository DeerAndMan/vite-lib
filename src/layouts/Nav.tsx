import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { navRouter } from '@/router';

/**
 * Nav 组件
 * @returns {React.FunctionComponent}
 */
export const Nav = () => {
    return (
        <div>
            {navRouter.map((n, i) => (
                <Link key={i} to={n.path}>
                    <Button type="link">{n.name}</Button>
                </Link>
            ))}
        </div>
    );
};

export default Nav;
