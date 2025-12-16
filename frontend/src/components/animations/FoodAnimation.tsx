import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FoodAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const platesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    platesRef.current.forEach((plate, i) => {
      gsap.fromTo(plate,
        {
          scale: 0,
          rotation: -180,
          opacity: 0
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.2,
          delay: i * 0.2,
          ease: 'back.out(1.7)',
          repeat: -1,
          repeatDelay: 5
        }
      );
    });

    gsap.to('.steam-line', {
      y: -100,
      opacity: 0,
      duration: 2,
      stagger: 0.1,
      repeat: -1,
      ease: 'power1.out'
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 to-transparent"></div>

      <div className="absolute inset-0 flex items-center justify-center gap-12">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={el => { if (el) platesRef.current[i] = el; }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-full bg-red-500/20 backdrop-blur-md border-4 border-red-400/40 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-red-400/30"></div>
            </div>

            {[...Array(3)].map((_, j) => (
              <div
                key={j}
                className="steam-line absolute bottom-full left-1/2 transform -translate-x-1/2 w-1 h-12 bg-gradient-to-t from-red-400/60 to-transparent rounded-full"
                style={{
                  left: `${50 + (j - 1) * 15}%`,
                  animationDelay: `${j * 0.3}s`
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 30 + 20}px`,
            opacity: 0.1,
            animation: `rotate ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          🍕
        </div>
      ))}

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-24 bg-red-400/20 rounded-full"
            style={{
              height: `${Math.random() * 60 + 60}px`,
              animation: `pulse ${Math.random() * 2 + 1}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-400/10 rounded-full blur-3xl animate-pulse"></div>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
