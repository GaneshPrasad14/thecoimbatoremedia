import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function MatrimonyAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    heartsRef.current.forEach((heart, i) => {
      gsap.fromTo(heart,
        {
          y: window.innerHeight,
          x: (Math.random() - 0.5) * 200,
          opacity: 0,
          scale: 0
        },
        {
          y: -100,
          x: `+=${(Math.random() - 0.5) * 100}`,
          opacity: 0.6,
          scale: Math.random() * 1.5 + 0.5,
          duration: Math.random() * 4 + 4,
          delay: i * 0.2,
          repeat: -1,
          ease: 'none'
        }
      );
    });

    gsap.to('.vignette', {
      opacity: 0.7,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="vignette absolute inset-0 bg-gradient-radial from-transparent via-pink-950/20 to-pink-950/40"></div>

      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) heartsRef.current[i] = el; }}
          className="absolute text-pink-400"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 30 + 15}px`,
            filter: 'blur(1px)'
          }}
        >
          ♥
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-96 h-96">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full border-2 border-pink-400/20 rounded-full"
              style={{
                animation: `spin ${8 + i * 2}s linear infinite`,
                transformOrigin: 'center',
                transform: `rotate(${i * 45}deg)`
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
           style={{ animationDelay: '1s' }}></div>

      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-pink-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            boxShadow: '0 0 10px #EC4899'
          }}
        />
      ))}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
