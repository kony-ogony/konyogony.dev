import { WikiLink } from '@/components/wiki/wikiLink';
import { useOpenedFolders } from '@/hooks/wiki/useOpenedFolders';
import { cn } from '@/lib/utils';
import { wikiPrettyText } from '@/lib/wiki/wikiPrettyText';
import { FileInfo } from '@/types';
import { FiChevronRight } from '@vertisanpro/react-icons/fi';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface WikiFolderProps {
    name: string;
    children: FileInfo[];
    mobile?: boolean;
}

export const WikiFolder = ({ name, children, mobile = false }: WikiFolderProps) => {
    const { toggleFolder, isFolderOpen } = useOpenedFolders();

    const [isActive, setActive] = useState(false);
    const location = useLocation();

    const handleToggle = () => {
        toggleFolder(name);
    };

    useEffect(() => {
        const currentChild = children.find((child) => child.path === location.pathname.replace('/docs/', ''));

        if (currentChild) {
            setActive(true);
            if (!isFolderOpen(name)) {
                toggleFolder(name);
            }
        } else {
            setActive(false);
        }
    }, [location, children]);

    return (
        <div className='flex w-full flex-col items-start'>
            {name ? (
                <>
                    <button
                        onClick={handleToggle}
                        className={cn(
                            'flex w-full items-center py-2 transition-all duration-300 hover:text-zinc-200',
                            isActive ? 'font-semibold text-zinc-50' : 'font-normal text-zinc-400',
                            mobile ? 'text-base' : 'text-sm',
                        )}
                    >
                        {wikiPrettyText(name)}
                        <FiChevronRight size={14} className={cn('ml-auto', isFolderOpen(name) && 'rotate-90')} />
                    </button>
                    <div
                        className={cn(
                            'ml-1 flex w-full flex-col items-start transition-all duration-300',
                            isFolderOpen(name)
                                ? 'pointer-events-auto max-h-[100vh] opacity-100'
                                : 'pointer-events-none max-h-0 opacity-0',
                        )}
                    >
                        {children
                            .filter((child) => child.visible !== false)
                            .map((child, index) => (
                                <WikiLink key={index} name={child.name} url={child.path} line={true} mobile={mobile} />
                            ))}
                    </div>
                </>
            ) : (
                children
                    .filter((child) => child.visible !== false)
                    .map((child, index) => <WikiLink key={index} name={child.name} url={child.path} mobile={mobile} />)
            )}
        </div>
    );
};
