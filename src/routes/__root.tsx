import type { ReactNode } from 'react';
import '@/styles/global.css';

interface RootRouteProps {
    children: ReactNode;
}

const RootRoute = ({ children }: RootRouteProps): JSX.Element => {
    return <main>{children}</main>;
};

export default RootRoute;
