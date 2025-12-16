import Header from '../components/Header';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import BackToTop from '../components/BackToTop';

export default function ContactPage() {
    return (
        <div className="bg-black min-h-screen">
            <Header />
            <Contact />
            <Footer />
            <BackToTop />
        </div>
    );
}