import { wikiConfig } from '@/config';
import { useMemo } from 'react';

export const useFiles = () => {
    const mdxFiles = useMemo(() => import.meta.glob('../../docs/**/*.mdx'), [wikiConfig.structure]);
    return mdxFiles;
};
