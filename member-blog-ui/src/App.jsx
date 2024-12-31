import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { publicRoute } from './router';
import DefaultLayout from './Layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/Loading/Loading';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import GoToTop from './components/GoToTop/GoToTop';
function renderRoute(route) {
    const Component = route.component;
    const Layout = route.layout || DefaultLayout;

    const routeElement = (
        <Layout>
            <Component />
        </Layout>
    );

    if (route.children) {
        return (
            <Route key={route.path} path={route.path} element={<Outlet />}>
                <Route index element={routeElement} />
                {route.children.map(renderRoute)}
            </Route>
        );
    }

    return <Route key={route.path} path={route.path} element={routeElement} />;
}

function App() {
    const { pathname } = useLocation();
    const [showGoToTop, setShowGoToTop] = useState(false);

    useEffect(() => {
        const handlerScroll = () => {
            if (window.scrollY > 1000) setShowGoToTop(true);
            else setShowGoToTop(false);
        };
        window.addEventListener('scroll', handlerScroll);
        window.scrollTo(0, 0);

        return () => {
            window.removeEventListener('scroll', handlerScroll);
        };
    }, [pathname]);

    const isLoading = useSelector((state) => state.loading.isLoading);
    return (
        <>
            <Routes>
                {publicRoute.map((route) => renderRoute(route))}
                <Route path="*" element={<p> 404 page</p>} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {isLoading && <Loading />}

            {showGoToTop && <GoToTop />}
        </>
    );
}

export default App;
