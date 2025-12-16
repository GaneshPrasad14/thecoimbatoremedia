import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function JobsAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.job-card');

    gsap.fromTo(cards,
      {
        y: 100,
        opacity: 0,
        rotateX: 45
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        repeat: -1,
        repeatDelay: 3
      }
    );

    gsap.to('.connection-line', {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'none',
      repeat: -1,
      stagger: 0.2
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 to-transparent"></div>

      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <line className="connection-line" x1="25%" y1="40%" x2="75%" y2="40%"
              stroke="#8B5CF6" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="1000" opacity="0.3"/>
        <line className="connection-line" x1="25%" y1="50%" x2="75%" y2="50%"
              stroke="#8B5CF6" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="1000" opacity="0.3"/>
        <line className="connection-line" x1="25%" y1="60%" x2="75%" y2="60%"
              stroke="#8B5CF6" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="1000" opacity="0.3"/>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1000px' }}>
        <div className="grid grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="job-card w-48 h-56 bg-purple-500/10 backdrop-blur-md rounded-2xl border border-purple-400/30 p-4"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-12 h-12 rounded-full bg-purple-400/30 mb-3"></div>
              <div className="space-y-2">
                <div className="h-3 bg-purple-400/40 rounded"></div>
                <div className="h-3 bg-purple-400/30 rounded w-4/5"></div>
                <div className="h-3 bg-purple-400/20 rounded w-3/5"></div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 h-8 bg-purple-400/20 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 4 + 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            boxShadow: '0 0 15px #8B5CF6'
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
      `}</style>
    </div>
  );
}
