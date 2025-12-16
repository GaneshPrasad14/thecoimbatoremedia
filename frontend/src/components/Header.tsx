import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import YourSayModal from './YourSayModal';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const navItems = [

        { name: 'Products', path: '/services' },
        { name: 'About', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact', path: '/contact' },
        { name: 'Rate Us', action: () => setIsModalOpen(true) }
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'py-4 bg-black/80 backdrop-blur-md' : 'py-8 bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center relative z-50">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <h1 className="text-white font-['Anton'] text-xl md:text-2xl tracking-wider">
                            THE COIMBATORE<span className="font-['Anton'] text-yellow-400"> MEDIA</span>
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            item.path ? (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="text-white/80 hover:text-white font-['Inter'] text-sm uppercase tracking-widest transition-colors relative group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ) : (
                                <button
                                    key={item.name}
                                    onClick={item.action}
                                    className="text-white/80 hover:text-white font-['Inter'] text-sm uppercase tracking-widest transition-colors relative group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                </button>
                            )
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white z-50 relative"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`fixed top-0 left-0 w-full h-[100dvh] bg-black z-[100] flex flex-col items-center justify-center pt-12 transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    {/* Explicit Close Button inside Overlay */}
                    <button
                        className="absolute top-6 right-6 text-white p-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <nav className="flex flex-col items-center gap-8 w-full">
                        {navItems.map((item, index) => (
                            item.path ? (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-white font-['Montserrat'] text-3xl font-bold tracking-tight transition-all duration-500 hover:text-yellow-400 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        item.action?.();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`text-white font-['Montserrat'] text-3xl font-bold tracking-tight transition-all duration-500 hover:text-yellow-400 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    {item.name}
                                </button>
                            )
                        ))}
                    </nav>
                </div>
            </header>

            <YourSayModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
