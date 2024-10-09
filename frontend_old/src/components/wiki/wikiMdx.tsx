import { wikiComponents } from '@/components/wiki/wikiComponents';
import { MDXProvider } from '@mdx-js/react';
import { ForwardedRef, forwardRef } from 'react';

interface WikiMdxProps {
    Content: React.FC | null;
}

export const WikiMdx = forwardRef(({ Content }: WikiMdxProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div className='my-4 flex h-full w-full flex-col px-[4vh] lg:px-0' ref={ref}>
            {Content ? (
                <MDXProvider components={wikiComponents}>
                    <Content />
                </MDXProvider>
            ) : null}
        </div>
    );
});
