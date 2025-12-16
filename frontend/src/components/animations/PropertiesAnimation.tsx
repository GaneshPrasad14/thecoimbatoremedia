import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PropertiesAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const panels = containerRef.current.querySelectorAll('.property-panel');

    gsap.fromTo(panels,
      {
        x: -300,
        opacity: 0,
        rotateY: -45
      },
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      }
    );

    gsap.to('.floorplan-line', {
      strokeDashoffset: 0,
      duration: 2,
      stagger: 0.1,
      ease: 'none',
      repeat: -1,
      repeatDelay: 2
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-green-950/30 to-transparent"></div>

      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10B981" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        <line className="floorplan-line" x1="20%" y1="30%" x2="80%" y2="30%" stroke="#10B981" strokeWidth="2"
              strokeDasharray="1000" strokeDashoffset="1000"/>
        <line className="floorplan-line" x1="20%" y1="30%" x2="20%" y2="70%" stroke="#10B981" strokeWidth="2"
              strokeDasharray="1000" strokeDashoffset="1000"/>
        <line className="floorplan-line" x1="80%" y1="30%" x2="80%" y2="70%" stroke="#10B981" strokeWidth="2"
              strokeDasharray="1000" strokeDashoffset="1000"/>
        <line className="floorplan-line" x1="20%" y1="70%" x2="80%" y2="70%" stroke="#10B981" strokeWidth="2"
              strokeDasharray="1000" strokeDashoffset="1000"/>
        <line className="floorplan-line" x1="50%" y1="30%" x2="50%" y2="70%" stroke="#10B981" strokeWidth="2"
              strokeDasharray="1000" strokeDashoffset="1000"/>
      </svg>

      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 flex gap-6" style={{ perspective: '1000px' }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="property-panel w-64 h-80 bg-green-500/10 backdrop-blur-md rounded-2xl border border-green-400/30 p-6"
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateX(${i * 20}px)`
            }}
          >
            <div className="w-full h-32 bg-green-400/20 rounded-lg mb-4"></div>
            <div className="space-y-3">
              <div className="h-3 bg-green-400/30 rounded"></div>
              <div className="h-3 bg-green-400/20 rounded w-4/5"></div>
              <div className="h-3 bg-green-400/20 rounded w-3/5"></div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex gap-2">
              <div className="flex-1 h-12 bg-green-400/20 rounded"></div>
              <div className="flex-1 h-12 bg-green-400/20 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-green-400 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${30 + Math.random() * 40}%`,
            animation: `pulse ${Math.random() * 2 + 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
            boxShadow: '0 0 20px #10B981'
          }}
        />
      ))}
    </div>
  );
}
