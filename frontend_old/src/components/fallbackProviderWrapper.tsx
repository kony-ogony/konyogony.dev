import usePage from '@/hooks/usePage';
import { useEffect, useMemo } from 'react';

const FallbackProviderWrapper = ({ children }: React.PropsWithChildren) => {
    const { onLoad } = usePage();
    const render = useMemo(() => children, [children]);

    useEffect(() => {
        onLoad(render);
    }, [onLoad, render]);

    return render;
};

export default FallbackProviderWrapper;
