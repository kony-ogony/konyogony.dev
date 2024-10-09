import { wikiConfig } from '@/config';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const usePath = () => {
    const location = useLocation();
    const path = useMemo(
        () =>
            location.pathname.replace('/docs/', '').replace('/docs', '') ||
            wikiConfig.structure.find((s) => s.fallback)?.path ||
            '',
        [location.pathname, wikiConfig.structure],
    );
    return path;
};
