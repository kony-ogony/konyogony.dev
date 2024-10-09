import { Button } from '@/components/ui/button';
import { FiArrowRight, FiChevronRight } from '@vertisanpro/react-icons/fi';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='relative m-0 flex h-[80vh] w-full flex-col items-center justify-center overflow-y-hidden bg-dot-white/[0.2]'>
                <div className='pointer-events-none absolute inset-0 bg-zinc-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />
                <span className='text-[12vh] font-bold text-zinc-100'>404</span>
                <span className='-m-10 text-lg font-medium text-zinc-200'>
                    Oops! Seems like this page doesnt exist...
                </span>
                <Button className='m-12 hidden lg:flex' variant={'link'} onClick={() => navigate('/')}>
                    Back to Home <FiChevronRight />
                </Button>
                <Button className='m-14 flex flex-row gap-2 lg:hidden' onClick={() => navigate('/')}>
                    Back to Home <FiArrowRight />
                </Button>
            </div>
        </>
    );
};

export default NotFound;
