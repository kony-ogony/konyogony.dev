import { wikiConfig } from '@/config';
import { FileInfo } from '@/types';

export const wikiGetStructure = () => {
    const structure: FileInfo[] = wikiConfig.structure.map((item) => {
        const [file, ...folders] = item.path.split('/').reverse();
        const folder = folders.reverse().join('/');
        return {
            name: file,
            folder,
            path: item.path,
            gitPath: `https://github.com/konyogony/konyogony.dev/blob/main/frontend/src/docs/${item.path}.mdx`,
            visible: item.visible,
            fallback: item.fallback,
        };
    });
    return structure;
};
