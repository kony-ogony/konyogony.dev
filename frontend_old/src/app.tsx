import { Layout } from '@/layouts/layout';
import { Route as RouteType } from '@/types';
// import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Toaster } from 'sonner';
// import FallbackProvider from './components/fallbackProvider';
// import ProgressBar from './components/progressbar';
import { ThemeProvider } from './components/ui/themeProvider';
import About from './pages/about';
import Docs from './pages/docs';
import Notes from './pages/notes';
import NotFound from './pages/notfound';
import Welcome from './pages/welcome';

const ProtectedRoute = ({ component }: { component: JSX.Element }) => {
    console.log('Protected route');
    return component;
};

const RedirectSocial = () => {
    const { service } = useParams<{ service: string }>();
    switch (service) {
        case 'github':
            return <Navigate to='https://github.com/konyogony' />;
        case 'discord':
            return <Navigate to='https://discordlookup.com/user/564472732071493633/' />;
        case 'spotify':
            return <Navigate to='https://open.spotify.com/user/xeq03n90tcwkg4tegzdxggvzd/' />;
        case 'steam':
            return <Navigate to='https://steamcommunity.com/id/kony_ogony/' />;
        default:
            return <NotFound />;
    }
};

// const Welcome = lazy(() => import('./pages/welcome'));
// const About = lazy(() => import('./pages/about'));
// const Notes = lazy(() => import('./pages/notes'));
// const Docs = lazy(() => import('./pages/docs'));
// const NotFound = lazy(() => import('./pages/notfound'));

const routes: RouteType[] = [
    {
        path: '/',
        element: <Welcome />,
    },
    {
        path: '/docs/*',
        element: <Docs />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/notes',
        element: <Notes />,
        protected: true,
    },
    {
        path: '/social/:service',
        element: <RedirectSocial />,
    },
    {
        path: '404',
        element: <NotFound />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
];

export const App = () => {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <Toaster theme={'dark'} richColors />
            {/* <ProgressBar /> */}

            <BrowserRouter>
                <Layout>
                    <Routes>
                        {/* <Route element={<Layout />}> */}
                        {routes.map((v, i) => {
                            return (
                                <Route
                                    path={v.path}
                                    key={i}
                                    element={
                                        // {<FallbackProvider>
                                        v.protected ? <ProtectedRoute component={v.element} /> : v.element
                                    }
                                    // </FallbackProvider>}
                                />
                            );
                        })}
                        {/* </Route> */}
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    );
};
