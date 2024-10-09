import { wikiConfig } from '@/config';
import { usePath } from '@/hooks/wiki/usePath';
import { wikiGetStructure } from '@/lib/wiki/wikiGetStructure';
import { FileInfo } from '@/types';
import { useEffect, useState } from 'react';

export const useStructure = ({ error }: { error: string | null }) => {
    const [structure, setStructure] = useState<FileInfo[] | null>(null);
    const [folders, setFolders] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const path = usePath();

    useEffect(() => {
        const newStructure = wikiGetStructure();
        const allFolders = new Set(newStructure.map((f) => f.folder));
        setStructure(newStructure);
        setFolders([...allFolders]);
    }, [wikiConfig.structure]);

    useEffect(() => {
        if (error) {
            return;
        }
        const [file, ...folders] = path.split('/').reverse();
        const folder = folders.reverse().join('/');
        setCurrentIndex(
            structure?.findIndex((f) => (folder ? f.name === file && f.folder === folder : f.name === file)) || 0,
        );
    }, [path, structure]);

    return { structure, folders, currentIndex };
};
