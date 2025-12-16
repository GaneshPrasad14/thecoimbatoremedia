import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AIAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        y: `${Math.random() * 100 - 50}px`,
        x: `${Math.random() * 100 - 50}px`,
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.1
      });
    });

    const gridLines = containerRef.current.querySelectorAll('.grid-line');
    gsap.to(gridLines, {
      opacity: 0.3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: 'power1.inOut'
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-transparent"></div>

      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, #0EA5E920 1px, transparent 1px),
          linear-gradient(to bottom, #0EA5E920 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="grid-line absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            style={{
              top: `${(i + 1) * 5}%`,
              opacity: 0.1
            }}
          />
        ))}
      </div>

      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) particlesRef.current[i] = el; }}
          className="absolute w-2 h-2 bg-blue-400 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 20px #0EA5E9'
          }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 border-2 border-blue-400/20 rounded-full animate-pulse"
             style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
        <div className="absolute w-80 h-80 border-2 border-blue-400/30 rounded-full animate-pulse"
             style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
        <div className="absolute w-64 h-64 border-2 border-blue-400/40 rounded-full animate-pulse"
             style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
      </div>
    </div>
  );
}
