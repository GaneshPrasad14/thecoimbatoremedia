import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(textRef.current,
                {
                    y: 100,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power4.out',
                    delay: 0.5
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden px-4">
            {/* Background Gradient Spot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 text-center flex flex-col items-center pt-24 md:pt-0">
                <h1
                    ref={textRef}
                    className="font-['Anton'] text-white leading-none tracking-wider mb-6 md:mb-8"
                    style={{ fontSize: 'clamp(2rem, 8vw, 10rem)' }}
                >
                    <div className="flex flex-col items-center gap-0">
                        <span>THE COIMBATORE <span className="font-['Anton'] text-yellow-400">MEDIA</span></span>
                    </div>
                </h1>

                <p className="font-['Inter'] text-gray-400 text-sm md:text-lg max-w-2xl text-center leading-relaxed tracking-wide uppercase mb-12 opacity-80">
                    Your gateway to Coimbatore's digital ecosystem. Featuring <span className="text-white">Coimbatore Events</span>, <span className="text-white">Matrimony</span>, <span className="text-white">Properties</span>, <span className="text-white">AI</span>, and <span className="text-white">Express</span>.
                </p>

                <p className="font-['Inter'] text-yellow-400/80 text-lg md:text-xl tracking-wider opacity-80 animate-pulse">
                    Connecting the City, Empowering You!
                </p>
            </div>

            {/* Scroll Indicator */}
            <button
                onClick={() => {
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: 'smooth'
                    });
                }}
                className="absolute bottom-10 left-10 flex items-center gap-4 text-white/50 hover:text-white transition-colors cursor-pointer"
            >
                <span className="text-xs uppercase tracking-widest hidden md:inline">Scroll to Explore</span>
                <div className="animate-bounce">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                </div>
            </button>

            <button
                onClick={() => {
                    const projects = document.getElementById('projects');
                    if (projects) {
                        projects.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
                className="absolute bottom-10 right-10 flex items-center gap-4 text-white/50 hover:text-white transition-colors cursor-pointer"
            >
                <span className="text-xs uppercase tracking-widest">Featured Products</span>
            </button>
        </div>
    );
}
