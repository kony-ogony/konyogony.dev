import { FallbackContext } from '@/components/fallbackProvider';
import { useCallback, useContext } from 'react';

const usePage = () => {
    const { update } = useContext(FallbackContext);
    const onLoad = useCallback((component: React.ReactNode) => update(component), [update]);

    return { onLoad };
};

export default usePage;
