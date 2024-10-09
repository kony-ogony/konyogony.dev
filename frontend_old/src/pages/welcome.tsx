import { BackgroundBeams } from '@/components/ui/backgroundBeams';
import { Button } from '@/components/ui/button';
import { Spotlight } from '@/components/ui/spotlight';
import { FiArrowRight, FiChevronDown } from '@vertisanpro/react-icons/fi';
import { RxMagnifyingGlass } from '@vertisanpro/react-icons/rx';
import {
    SiActix,
    SiReact,
    SiRust,
    SiShadcnui,
    SiSurrealdb,
    SiTailwindcss,
    SiTypescript,
    SiVite,
} from '@vertisanpro/react-icons/si';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const icons = [
    {
        icon: SiActix,
        link: 'https://actix.rs/',
    },
    {
        icon: SiReact,
        link: 'https://reactjs.org/',
    },
    {
        icon: SiRust,
        link: 'https://www.rust-lang.org/',
    },
    {
        icon: SiShadcnui,
        link: 'https://ui.shadcn.com/',
    },
    {
        icon: SiTypescript,
        link: 'https://www.typescriptlang.org/',
    },
    {
        icon: SiVite,
        link: 'https://vitejs.dev/',
    },
    {
        icon: SiTailwindcss,
        link: 'https://tailwindcss.com/',
    },
    {
        icon: SiSurrealdb,
        link: 'https://surrealdb.com/',
    },
];

const Welcome = () => {
    const spotlightElement = useMemo(() => <Spotlight className='left-20 top-16 lg:hidden' fill='white' />, []);
    const backgroundElement = useMemo(
        () => <BackgroundBeams className='hidden transform-gpu motion-reduce:hidden lg:flex' />,
        [],
    );
    return (
        <>
            <div className='relative flex h-[80vh] w-full flex-col items-center justify-center gap-6 border-b border-white/5 bg-grid-white/[0.04] lg:h-[75vh] lg:gap-4 lg:bg-grid-white/0'>
                <div className='pointer-events-none absolute inset-0 bg-zinc-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] lg:hidden' />

                {spotlightElement}
                {backgroundElement}

                <div className='z-40 flex flex-col items-center bg-gradient-to-t from-zinc-300 to-zinc-100 bg-clip-text text-transparent lg:gap-2 lg:px-0'>
                    <span className='text-4xl font-bold tracking-wide lg:text-7xl'>Meet kony_ogony,</span>
                    <span className='flex flex-row gap-0 text-base font-medium lg:text-xl'>
                        a junior full-stack developer
                        <span className='hidden lg:block'>, who does cool stuff!</span>
                    </span>
                </div>
                <div className='z-40 flex flex-row items-center gap-4'>
                    <Button className='flex flex-row items-center gap-1 lg:hidden' size='sm'>
                        <span>Contact me</span> <FiArrowRight />
                    </Button>
                    <Button className='flex flex-row items-center gap-1 lg:hidden' size='sm' variant={'secondary'}>
                        <span>Learn more</span> <RxMagnifyingGlass size={16} />
                    </Button>
                    <Button className='hidden flex-row items-center gap-1 lg:flex'>
                        <span>Contact me</span> <FiArrowRight />
                    </Button>
                    <Button className='hidden flex-row items-center gap-1 lg:flex' variant={'secondary'} asChild>
                        <Link to={'/docs'}>
                            <span>Learn more</span> <RxMagnifyingGlass size={16} />
                        </Link>
                    </Button>
                </div>
                <div className='z-40 flex flex-row items-center gap-4'>
                    {icons.map((v, i) => (
                        <a href={v.link} target='_blank' rel='noreferrer' key={i}>
                            <v.icon className='h-4 w-4 lg:h-5 lg:w-5' />
                        </a>
                    ))}
                </div>
                <a
                    href='#work'
                    className='absolute bottom-4 left-1/2 z-40 hidden -translate-x-1/2 text-zinc-500 motion-reduce:hidden lg:flex'
                >
                    <FiChevronDown size={18} />
                </a>
            </div>
            <div className='flex flex-col items-center gap-2' id='work'>
                <span className='text-2xl font-semibold'>Some of my work</span>
            </div>
            <div className='h-[200rem]' />
        </>
    );
};

export default Welcome;
