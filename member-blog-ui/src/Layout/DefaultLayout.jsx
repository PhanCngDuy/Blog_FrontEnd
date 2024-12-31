import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
}

export default DefaultLayout;
