import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Megaphone, Palette, BarChart, Users, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies'
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Strategic campaigns that drive results and engagement'
  },
  {
    icon: Palette,
    title: 'Brand Design',
    description: 'Creating memorable visual identities that stand out'
  },
  {
    icon: BarChart,
    title: 'Analytics',
    description: 'Data-driven insights for informed business decisions'
  },
  {
    icon: Users,
    title: 'Social Media',
    description: 'Building communities and fostering meaningful connections'
  },
  {
    icon: Rocket,
    title: 'Growth Strategy',
    description: 'Scaling your business with proven methodologies'
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.service-card');

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1
          }
        }
      );
    });
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative min-h-screen bg-black py-32 px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="font-['Montserrat'] font-black text-white text-6xl md:text-8xl mb-20 tracking-tighter text-center"
          style={{ textShadow: '0 0 60px #FFD40080, 0 10px 40px rgba(0,0,0,0.8)' }}>
          Our Services
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="service-card group relative p-8 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-3xl border border-yellow-400/20 backdrop-blur-sm hover:border-yellow-400/40 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 rounded-3xl transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-yellow-400/20 flex items-center justify-center group-hover:bg-yellow-400/30 transition-all duration-300">
                    <Icon className="text-yellow-400" size={32} />
                  </div>

                  <h3 className="font-['Montserrat'] font-bold text-white text-2xl mb-4">
                    {service.title}
                  </h3>

                  <p className="font-['Inter'] text-gray-400 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl group-hover:bg-yellow-400/20 transition-all duration-500"></div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <button className="px-12 py-5 bg-yellow-400 text-black font-['Montserrat'] font-bold text-xl rounded-full hover:bg-yellow-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/50">
            Book Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
