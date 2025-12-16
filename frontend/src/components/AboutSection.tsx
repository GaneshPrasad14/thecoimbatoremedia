import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelector('.about-content'),
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen bg-black py-32 px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="about-content">
          <h2 className="font-['Montserrat'] font-black text-white text-6xl md:text-8xl mb-12 tracking-tighter"
            style={{ textShadow: '0 0 60px #FFD40080, 0 10px 40px rgba(0,0,0,0.8)' }}>
            About Coimbatore Media
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="font-['Inter'] text-gray-300 text-xl leading-relaxed">
                Coimbatore Media is a pioneering digital solutions provider, dedicated to transforming
                the local business landscape through innovative technology platforms.
              </p>
              <p className="font-['Inter'] text-gray-300 text-xl leading-relaxed">
                We specialize in creating powerful, user-centric digital experiences that connect
                communities, streamline operations, and drive growth for businesses across various sectors.
              </p>
              <p className="font-['Inter'] text-gray-300 text-xl leading-relaxed">
                Our portfolio of products demonstrates our commitment to excellence, combining
                cutting-edge technology with deep local market knowledge.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-yellow-400/10 to-transparent p-12 rounded-3xl border border-yellow-400/20 backdrop-blur-sm">
                <div className="space-y-8">
                  {[
                    { number: '6+', label: 'Products' },
                    { number: '10K+', label: 'Active Users' },
                    { number: '98%', label: 'Satisfaction' }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-6">
                      <div className="text-6xl font-['Montserrat'] font-black text-yellow-400">
                        {stat.number}
                      </div>
                      <div className="text-2xl font-['Inter'] text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            boxShadow: '0 0 20px #FFD400'
          }}
        />
      ))}
    </section>
  );
}
