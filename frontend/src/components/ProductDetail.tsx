import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { Product } from '../data/products';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  isTransitioning: boolean;
}

export default function ProductDetail({ product, onBack, isTransitioning }: ProductDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (containerRef.current && !isTransitioning) {
      const tl = gsap.timeline();

      tl.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out'
        }
      );



      // Animate Title Color
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { color: '#ffffff', textShadow: '0 0 0px rgba(250, 204, 21, 0)' },
          {
            color: '#facc15', // yellow-400
            textShadow: '0 0 30px rgba(250, 204, 21, 0.6)',
            duration: 1.2,
            ease: 'power2.out'
          },
          "-=0.5"
        );
      }
    }
  }, [isTransitioning]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full relative bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Moving Spotlight Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${product.color}, transparent 70%)`,
          animation: 'spotlight-move 10s infinite alternate ease-in-out'
        }}
      ></div>
      <style>{`
        @keyframes spotlight-move {
            0% { transform: translate(-20%, -20%) scale(1); }
            100% { transform: translate(20%, 20%) scale(1.2); }
        }
      `}</style>

      <button
        onClick={onBack}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-6 py-3 bg-black/80 backdrop-blur-md text-white rounded-full hover:bg-black transition-all duration-300 hover:scale-105 border border-yellow-400/20"
      >
        <ArrowLeft size={20} />
        <span className="font-['Inter']">Back</span>
      </button>

      <div className="relative z-10 px-8 w-full">
        <div className="max-w-7xl mx-auto">
          <h1
            ref={titleRef}
            className="font-['Berkshire_Swash'] text-white mb-6 tracking-tighter whitespace-nowrap"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 6rem)' }}
          >
            <span className="inline-block mr-3 text-white">
              coimbatore
            </span>
            <span className="inline-block">
              {product.name.replace(/coimbatore\s+/i, '')}
            </span>
          </h1>
          <p className="font-['Inter'] text-gray-300 text-lg md:text-2xl mb-12 max-w-4xl leading-relaxed font-light">
            {product.longDescription}
          </p>

          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-['Montserrat'] font-bold text-lg rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Visit Website
            <ExternalLink size={20} />
          </a>
        </div>
      </div>


    </div>
  );
}
