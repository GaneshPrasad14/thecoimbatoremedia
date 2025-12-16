import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const text1Ref = useRef<HTMLHeadingElement>(null); // THE
    const textMidRef = useRef<HTMLHeadingElement>(null); // COIMBATORE
    const text2Ref = useRef<HTMLHeadingElement>(null); // MEDIA

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: onComplete
        });

        // Initial state
        gsap.set([text1Ref.current, textMidRef.current, text2Ref.current], {
            opacity: 0,
            y: 50
        });

        // Background Animation Removed as per request

        tl.to([text1Ref.current, textMidRef.current, text2Ref.current], {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out"
        })
            .to(text2Ref.current, { // Only MEDIA animates gradient
                backgroundImage: "linear-gradient(to right, #666666 0%, #FFD700 50%, #666666 100%)", // Gold center
                backgroundPosition: "200% center",
                duration: 2,
                ease: "none",
                repeat: 1,
                yoyo: true
            }, "-=0.5")
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1,
                ease: "power4.inOut",
                delay: 0.5
            });

    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none overflow-hidden"
        >
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

            <div className="flex flex-col items-center justify-center p-4 relative z-10">
                <h1 ref={text1Ref} className="font-['Anton'] text-4xl md:text-7xl text-white tracking-wider leading-tight text-center">
                    THE
                </h1>
                <h1 ref={textMidRef} className="font-['Anton'] text-4xl md:text-7xl text-white tracking-wider mb-2 text-center">
                    COIMBATORE
                </h1>

                <div className="relative overflow-hidden">
                    <h1 ref={text2Ref} className="font-['Anton'] text-4xl md:text-7xl text-white tracking-wider text-center"
                        style={{
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            backgroundImage: 'linear-gradient(to right, #ffffff 0%, #ffffff 50%, #ffffff 100%)', // Start white
                        }}>
                        MEDIA
                    </h1>

                    {/* Shine Overlay - Targeting ONLY MEDIA */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent -translate-x-full animate-shine" />
                </div>
            </div>

            <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-20deg); }
          50% { transform: translateX(100%) skewX(-20deg); }
          100% { transform: translateX(100%) skewX(-20deg); }
        }
        .animate-shine {
          animation: shine 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
        </div>
    );
}
