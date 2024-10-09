import { useSidebarToggle } from '@/hooks/wiki/useSidebarToggle';
import { cn } from '@/lib/utils';
import { FiChevronRight } from '@vertisanpro/react-icons/fi';
import { useStore } from 'zustand';

export const WikiMobileNavbar = () => {
    const sidebar = useStore(useSidebarToggle);
    return (
        <div
            onClick={() => sidebar.setIsOpen()}
            className='fixed left-0 top-20 z-[60] flex w-full items-center border-b border-white/10 bg-zinc-950/50 px-[4vh] py-4 text-sm font-medium text-zinc-300 backdrop-blur-md transition-all duration-300 lg:hidden'
        >
            <button className='flex flex-row items-center gap-1'>
                Menu <FiChevronRight size={16} className={cn('mr-auto', sidebar.isOpen && 'rotate-90')} />
            </button>
        </div>
    );
};
