import { Button } from '@/components/ui/button';
import { wikiPrettyText } from '@/lib/wiki/wikiPrettyText';
import { FileInfo } from '@/types';
import { FiChevronLeft, FiChevronRight } from '@vertisanpro/react-icons/fi';
import { Link } from 'react-router-dom';

interface WikiNavButtonsProps {
    structure: FileInfo[] | null;
    currentIndex: number;
}

export const WikiNavButtons = ({ structure, currentIndex }: WikiNavButtonsProps) => {
    if (!structure) return null;

    const nextIndex = structure.findIndex((v, i) => i > currentIndex && v.visible !== false);

    const prevIndex = structure.slice(0, currentIndex).findLastIndex((v) => v.visible !== false);

    return (
        <>
            <div className='not-prose flex w-full flex-row items-center border-t border-white/10 px-[4vh] pt-4 lg:px-0'>
                {prevIndex !== -1 && structure && structure[prevIndex] && (
                    <div className='mr-auto flex flex-col items-end'>
                        <span className='text-sm font-light'>Previous</span>
                        <Button variant={'link'} className='flex flex-row items-center gap-1 px-0' asChild>
                            <Link to={`${structure[prevIndex].path}`}>
                                <FiChevronLeft size={14} />
                                {wikiPrettyText(structure[prevIndex].name)}
                            </Link>
                        </Button>
                    </div>
                )}
                {nextIndex !== -1 && structure && structure[nextIndex] && (
                    <div className='ml-auto flex flex-col items-start'>
                        <span className='text-sm font-light'>Next</span>
                        <Button variant={'link'} className='flex flex-row items-center gap-1 px-0' asChild>
                            <Link to={`${structure[nextIndex].path}`}>
                                {wikiPrettyText(structure[nextIndex].name)}
                                <FiChevronRight size={14} />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};
