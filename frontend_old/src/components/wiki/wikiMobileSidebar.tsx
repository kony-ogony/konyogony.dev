import { WikiFolder } from '@/components/wiki/wikiFolder';
import { useSidebarToggle } from '@/hooks/wiki/useSidebarToggle';
import { cn } from '@/lib/utils';
import { FileInfo } from '@/types';
import { useStore } from 'zustand';

interface WikiMobileSidebarProps {
    folders: string[];
    structure: FileInfo[] | null;
}

export const WikiMobileSidebar = ({ folders, structure }: WikiMobileSidebarProps) => {
    const sidebar = useStore(useSidebarToggle);

    if (!sidebar) return null;

    return (
        <>
            <button
                onClick={() => sidebar.setIsOpen()}
                className={cn(
                    'not-prose fixed top-32 z-50 min-h-screen w-full bg-zinc-950/60 saturate-50 backdrop-blur-[1px] transition-all duration-300 ease-in-out lg:hidden',
                    sidebar.isOpen
                        ? 'pointer-events-auto cursor-pointer opacity-100'
                        : 'pointer-events-none cursor-default opacity-0',
                )}
            />
            <div
                className={cn(
                    'not-prose fixed left-0 top-32 z-50 flex w-full flex-col items-start border-b border-white/10 bg-zinc-950/90 px-[4vh] py-6 backdrop-blur-md transition-all duration-300 ease-in-out lg:hidden',
                    sidebar.isOpen
                        ? 'pointer-events-auto h-[50vh] opacity-100'
                        : 'pointer-events-none h-0 cursor-default opacity-0',
                )}
            >
                <span className='py-2 text-base font-bold text-zinc-50'>Documentation</span>
                {folders &&
                    folders.map((v, i) => (
                        <WikiFolder key={i} name={v} mobile={true}>
                            {structure ? structure.filter((w) => w.folder === v) : []}
                        </WikiFolder>
                    ))}
            </div>
        </>
    );
};
