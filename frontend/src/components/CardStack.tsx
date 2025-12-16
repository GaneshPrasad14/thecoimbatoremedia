import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Product } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

interface CardStackProps {
  products: Product[];
  onCardClick: (id: string) => void;
  isTransitioning: boolean;
}

export default function CardStack({ products, onCardClick, isTransitioning }: CardStackProps) {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTransitioning) return;

    // Kill old triggers and animations
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf(cardsRef.current);

    const cards = cardsRef.current;
    const totalCards = products.length;
    let currentIndex = 0;
    let isAutoPlaying = true;
    let intervalId: NodeJS.Timeout;

    // Initial setup
    gsap.set(cards, {
      y: 0,
      opacity: 1,
      scale: (i) => 1 - (i * 0.05),
      zIndex: (i) => totalCards - i,
      pointerEvents: 'auto' // All clickable
    });

    const animateNext = () => {
      if (!isAutoPlaying || isTransitioning) return;

      const topCard = cards[currentIndex];
      const nextIndex = (currentIndex + 1) % totalCards;

      // Animate top card away
      gsap.to(topCard, {
        y: -window.innerHeight * 1.2,
        rotation: -5 + Math.random() * 10,
        opacity: 0,
        duration: 1.2,
        ease: "power3.inOut",
        onComplete: () => {
          // Reset card to bottom of stack
          gsap.set(topCard, {
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1 - ((totalCards - 1) * 0.05), // Smallest scale
            zIndex: 0 // Will be corrected by shift
          });

          // Shift Z-indices for all cards
          // The card that just left (currentIndex) becomes the "last" visually
          // The next card (nextIndex) becomes the "first"

          for (let i = 0; i < totalCards; i++) {
            // Calculate "visual index" relative to the new top (nextIndex)
            // If nextIndex is 0, then 0 is top (index 0), 1 is 2nd...
            // visualPosition from 0 (top) to N-1 (bottom)

            const actualIndex = (nextIndex + i) % totalCards;
            const card = cards[actualIndex];

            // Top card gets highest Z, bottom lowest
            const newZ = totalCards - i;
            card.style.zIndex = newZ.toString();

            // Animate scales to move up smoothly
            gsap.to(card, {
              scale: 1 - (i * 0.05),
              duration: 0.8,
              ease: "power2.out"
            });
          }

          currentIndex = nextIndex;
        }
      });
    };

    // Start loop
    // Use interval for regular updates
    intervalId = setInterval(animateNext, 2500);

    // Pause on hover (handled by mouse events on container)
    // Actually, let's keep it simple: just run loop.

    // Cleanup
    return () => {
      clearInterval(intervalId);
      gsap.killTweensOf(cards);
    };
  }, [isTransitioning, products.length]);

  return (
    // Fixed height container, no scroll dependence
    <div
      ref={containerRef}
      id="projects"
      className="relative bg-black w-full overflow-hidden pt-10 pb-0 md:py-20"
      style={{ minHeight: '100vh' }}
    >
      <div className="text-center mb-0 md:mb-12 pt-4 md:pt-8">
        <h2 className="font-['Montserrat'] font-black text-white text-3xl md:text-5xl mb-3 md:mb-4 tracking-tighter">
          OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">PRODUCTS</span>
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto rounded-full"></div>
      </div>
      <div className="relative w-full flex items-center justify-center -mt-4 md:mt-20" style={{ height: '65vh' }}>
        {products.map((product, index) => (
          <div
            key={product.id}
            ref={el => { if (el) cardsRef.current[index] = el; }}
            onClick={() => !isTransitioning && onCardClick(product.id)}
            className="absolute left-0 right-0 mx-auto cursor-pointer transition-transform duration-300 hover:scale-[1.05] active:scale-95 h-[30vh] -mt-[15vh] md:h-[80vh] md:-mt-[40vh]"
            style={{
              width: '95vw',
              maxWidth: '1600px',
              top: '50%',
            }}
          >
            <div
              className="w-full h-full flex items-center justify-center relative overflow-hidden group rounded-[1.5rem] md:rounded-[2.5rem] border-4 border-yellow-400 bg-[#0a0a0a]"
              style={{
                boxShadow: `0 0 50px rgba(250, 204, 21, 0.4), 0 0 100px rgba(250, 204, 21, 0.2)`
              }}
            >
              {/* Subtle background pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(250, 204, 21, 0.1) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              ></div>

              <div className="relative z-10 text-center px-8">
                <h2 className="font-['Berkshire_Swash'] mb-6 leading-tight tracking-tighter whitespace-nowrap">
                  <span
                    className="text-white relative z-10 inline mr-2"
                    style={{
                      fontSize: 'clamp(1.5rem, 6vw, 6rem)',
                      textShadow: '4px 4px 0px rgba(0,0,0,0.2)'
                    }}
                  >
                    coimbatore
                  </span>
                  <span
                    className="text-yellow-400 inline"
                    style={{
                      fontSize: 'clamp(1.5rem, 6vw, 6rem)',
                      textShadow: '2px 2px 0px rgba(0,0,0,0.1)'
                    }}
                  >
                    {product.name.replace(/coimbatore\s+/i, '')}
                  </span>
                </h2>
                <p
                  className="font-['Inter'] text-gray-400 text-lg md:text-2xl tracking-wide font-medium"
                >
                  {product.tagline}
                </p>
              </div>

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                  backgroundSize: '50px 50px'
                }}
              ></div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="w-1 h-12 bg-gradient-to-b from-yellow-400 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
}
