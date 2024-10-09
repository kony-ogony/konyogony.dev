import useProgress from '@/hooks/useProgress';
import randomInt from '@/lib/randomInt';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

type Timer = ReturnType<typeof setTimeout>;

const ProgressBar = () => {
    const store = useProgress();
    const interval = useRef<Timer>();
    const timeout = useRef<Timer>();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        return () => {
            timeout.current && clearTimeout(timeout.current);
            interval.current && clearInterval(interval.current);
        };
    }, []);

    useEffect(() => {
        setVisible((store.progress || 0) > 0);

        if (store.progress === 100) timeout.current = setTimeout(() => store.setProgress(undefined), 500);
    }, [store.progress]);

    useEffect(() => {
        if (!store.continuous) {
            interval.current && clearInterval(interval.current);
            return;
        }

        if (!store.progress || store.progress === 0) store.setProgress(randomInt(20, 30));
    }, [store.continuous]);

    useEffect(() => {
        if (store.continuous) {
            interval.current && clearInterval(interval.current);
            if ((store.progress || 0) >= 90) {
                store.setProgress(90);
            } else {
                interval.current = setTimeout(() => store.setProgress((store.progress || 0) + randomInt(1, 5)), 500);
            }
        }
    }, [store.progress, store.continuous]);

    return (
        <div className={cn('fixed z-[100000] h-[2px] w-full duration-200', visible ? 'opacity-100' : 'opacity-0')}>
            <div
                className='h-full bg-sky-400 shadow-[0_-2px_10px_2px] shadow-sky-400 transition-all duration-200 ease-in-out'
                style={{ width: store.progress === undefined ? '100%' : `${store.progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;
