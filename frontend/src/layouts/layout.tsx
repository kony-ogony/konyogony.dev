import { Navbar } from '@/components/custom/navbar';
import { Page } from '@/components/custom/page';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from 'sonner';

export const Layout = ({ children }: React.PropsWithChildren) => {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <div className='relative flex min-h-screen w-full flex-col gap-2 bg-zinc-950'>
                <Navbar />
                <Page>
                    <div className='flex h-full w-full flex-shrink-0 flex-col items-center'>{children}</div>
                </Page>
                <Toaster theme={'dark'} richColors />
            </div>
        </ThemeProvider>
    );
};
