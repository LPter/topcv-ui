import Header from './Header';
import Footer from './Footer';
// import TogglePassword from '../../TogglePassword';
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            {/* <TogglePassword /> */}
            <div className="wrapper">
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
