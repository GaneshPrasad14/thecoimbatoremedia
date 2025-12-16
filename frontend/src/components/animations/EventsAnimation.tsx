import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function EventsAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    confettiRef.current.forEach((piece, i) => {
      gsap.fromTo(piece,
        {
          y: -100,
          x: (Math.random() - 0.5) * 200,
          rotation: 0,
          opacity: 1
        },
        {
          y: window.innerHeight + 100,
          x: `+=${(Math.random() - 0.5) * 300}`,
          rotation: Math.random() * 720,
          opacity: 0,
          duration: Math.random() * 3 + 3,
          delay: i * 0.1,
          repeat: -1,
          ease: 'none'
        }
      );
    });

    const timeline = gsap.timeline({ repeat: -1 });
    const cards = containerRef.current.querySelectorAll('.timeline-card');

    cards.forEach((card, i) => {
      timeline.fromTo(card,
        { x: -100, opacity: 0, scale: 0.8 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out'
        },
        i * 0.3
      );
    });
  }, []);

  const confettiColors = ['#F97316', '#FFD400', '#FF6B6B', '#4ECDC4', '#45B7D1'];

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-950/30 to-transparent"></div>

      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) confettiRef.current[i] = el; }}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-100px',
            backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            boxShadow: `0 0 10px ${confettiColors[Math.floor(Math.random() * confettiColors.length)]}`
          }}
        />
      ))}

      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 space-y-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="timeline-card w-64 p-4 bg-orange-500/10 backdrop-blur-md rounded-xl border border-orange-400/30"
          >
            <div className="w-12 h-12 rounded-full bg-orange-400/20 mb-3"></div>
            <div className="h-2 bg-orange-400/30 rounded mb-2"></div>
            <div className="h-2 bg-orange-400/20 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-10 flex gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-20 h-32 bg-orange-400/20 rounded-lg backdrop-blur-sm"
            style={{
              height: `${Math.random() * 100 + 80}px`,
              animation: `pulse ${Math.random() * 2 + 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
