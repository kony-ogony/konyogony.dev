import { WikiMainContent } from '@/components/wiki/wikiMainContent';
import { WikiSecondarySidebar } from '@/components/wiki/wikiSecondarySidebar';
import { WikiSidebar } from '@/components/wiki/wikiSidebar';
import { useContent } from '@/hooks/wiki/useContent';
import { useHeadings } from '@/hooks/wiki/useHeadings';
import { useStructure } from '@/hooks/wiki/useStructure';
import { useEffect, useRef, useState } from 'react';

const Docs = () => {
    const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

    const { Content, loading, error } = useContent(setBreadcrumb);
    const { folders, structure, currentIndex } = useStructure({ error });
    const { headings, setHeadings } = useHeadings();

    const ref = useRef<HTMLDivElement>(null);

    const wikiSidebarProps = {
        folders,
        structure,
    };

    const WikiMainContentProps = {
        ref,
        breadcrumb,
        currentIndex,
        loading,
        structure,
        Content,
        folders,

        setHeadings,
    };

    const WikiSecondarySidebarProps = {
        loading,
        currentIndex,
        structure,
        headings,
        error,
    };

    useEffect(() => {
        if (Content && !loading && ref.current) {
            const headingsElements = ref.current.querySelectorAll('h1, h2');
            const headings = Array.from(headingsElements).map((h) => ({
                text: h.textContent || '',
                level: parseInt(h.tagName.replace('H', ''), 10),
            }));
            setHeadings(headings);
        }
    }, [Content, loading, ref]);

    error && console.error(error);

    return (
        <>
            <div className='relative my-32 flex w-full flex-row justify-center gap-10 overflow-x-clip lg:my-20'>
                <WikiSidebar {...wikiSidebarProps} />
                <WikiMainContent {...WikiMainContentProps} />
                <WikiSecondarySidebar {...WikiSecondarySidebarProps} />
            </div>
        </>
    );
};

export default Docs;

// Thanks https://github.com/vercel/next.js
// +rep chatgpt
