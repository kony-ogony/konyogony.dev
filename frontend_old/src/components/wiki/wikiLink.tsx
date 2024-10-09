import { useSidebarToggle } from '@/hooks/wiki/useSidebarToggle';
import { cn } from '@/lib/utils';
import { wikiPrettyText } from '@/lib/wiki/wikiPrettyText';
import { NavLink } from 'react-router-dom';
import { useStore } from 'zustand';

interface WikiLinkProps {
    name: string;
    url: string;
    line?: boolean;
    mobile?: boolean;
}

export const WikiLink = ({ name, url, line = false, mobile = false }: WikiLinkProps) => {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;
    return (
        <NavLink
            to={url}
            onClick={() => mobile && sidebar.setIsOpen()}
            className={cn(
                'flex w-full py-2 font-normal text-zinc-400 transition-all duration-300 hover:text-zinc-200 [&.active]:font-semibold [&.active]:text-zinc-50',
                line && 'border-l-[1px] border-white/15 pl-4 hover:border-zinc-400 [&.active]:border-zinc-50',
                mobile ? 'text-base' : 'text-sm',
            )}
        >
            {wikiPrettyText(name)}
        </NavLink>
    );
};
