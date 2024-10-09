import { Button } from '@/components/ui/button';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { wikiGetStructure } from '@/lib/wiki/wikiGetStructure';
import { wikiPrettyText } from '@/lib/wiki/wikiPrettyText';
import { FileInfo } from '@/types';
import { DialogDescription, DialogTitle, type DialogProps } from '@radix-ui/react-dialog';
import { RxFile } from '@vertisanpro/react-icons/rx';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Cmdk = ({ ...props }: DialogProps) => {
    const [open, setOpen] = useState(false);
    const [structure, setStructure] = useState<FileInfo[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
                if (
                    (e.target instanceof HTMLElement && e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement
                ) {
                    return;
                }

                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    useEffect(() => {
        setStructure(wikiGetStructure());
    }, []);

    const runCommand = useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <Button
                variant={'outline'}
                onClick={() => setOpen(true)}
                {...props}
                className='group ml-auto hidden w-32 cursor-pointer flex-row items-center overflow-clip rounded-md border border-white/5 bg-zinc-900/50 px-2 py-1 text-sm font-normal text-zinc-400 backdrop-blur-md transition-all duration-300 hover:bg-zinc-800/60 hover:text-zinc-200 lg:flex xl:w-fit xl:gap-10'
            >
                <span className='hidden xl:flex'>Search documentation...</span>
                <span className='flex text-xs xl:hidden'>Search</span>
                <kbd className='ml-auto flex flex-row items-center -space-x-0.5 rounded-sm bg-zinc-700/50 px-2 py-0.5 text-[10px] backdrop-blur-sm'>
                    ⌘ K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <DialogTitle className='sr-only' />
                <DialogDescription className='sr-only' />
                <CommandInput placeholder='Search documentation...' />
                <CommandList className='border-white/5'>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading='Documentation'>
                        {structure
                            .filter((i) => i.visible !== false)
                            .map((item) => {
                                return (
                                    <CommandItem
                                        key={item.name}
                                        value={item.name}
                                        onSelect={() => {
                                            runCommand(() => navigate(`/docs/${item.path}`));
                                        }}
                                        className='flex flex-row items-center gap-1'
                                    >
                                        <RxFile size={16} />
                                        {wikiPrettyText(item.name)}
                                    </CommandItem>
                                );
                            })}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
};
