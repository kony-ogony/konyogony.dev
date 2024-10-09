import { wikiConfig } from '@/config';
import { useFiles } from '@/hooks/wiki/useFiles';
import { usePath } from '@/hooks/wiki/usePath';
import { wikiPrettyText } from '@/lib/wiki/wikiPrettyText';
import { useEffect, useState } from 'react';

export const useContent = (setBreadcrumbData: (data: string[]) => void) => {
    const [Content, setContent] = useState<React.FC | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const path = usePath();
    const mdxFiles = useFiles();

    useEffect(() => {
        setLoading(true);

        const importFile = mdxFiles[`../../docs/${path}.mdx`];
        const configFile = wikiConfig.structure.find((s) => s.path === path);

        if (importFile && configFile?.visible !== false) {
            importFile()
                .then((module) => {
                    setContent(() => (module as { default: React.FC }).default);
                    setBreadcrumbData(path.split('/').map((p) => wikiPrettyText(p)));
                })
                .catch((err) => {
                    console.error('Error loading MDX file:', err);
                    setError(err);
                    setContent(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setError('No content found for path: ' + path);
            setContent(null);
            setBreadcrumbData([]);
            setLoading(false);
        }
    }, [path, mdxFiles, wikiConfig.structure]);

    return { Content, loading, error };
};
