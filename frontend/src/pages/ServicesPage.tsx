import { useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

const servicesList = [
  {
    title: 'Coimbatore AI',
    description: 'Pioneering artificial intelligence solutions for local enterprises. Empowering businesses with predictive analytics and intelligent automation.'
  },
  {
    title: 'Coimbatore Media',
    description: 'The city\'s premier digital media network connecting brands with audiences. Delivering impactful stories and innovative marketing strategies.'
  },
  {
    title: 'Coimbatore Events',
    description: 'Your ultimate guide to the city\'s vibrant social calendar. Discover, book, and experience the best local happenings in real-time.'
  },
  {
    title: 'Coimbatore Express',
    description: 'Hyperlocal news delivered with speed and integrity. Stay informed about neighborhood updates and city-wide developments instantly.'
  },
  {
    title: 'Coimbatore Properties',
    description: 'Redefining real estate discovery with immersive virtual tours. Connect directly with verified sellers for a seamless property buying experience.'
  },
  {
    title: 'Coimbatore Matrimony',
    description: 'Trusted local matchmaking for authentic connections. Helping you find your perfect life partner within the community you know.'
  },
  {
    title: 'Coimbatore Academy',
    description: 'Bridging the gap between academics and industry. Empowering the next generation with practical skills and expert-led mentorship.'
  }
];

export default function ServicesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Default closed

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Header />

      <main className="flex-grow pt-32 pb-20 px-8 container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8">
          {/* Left Column - Large Title */}
          <div className="flex flex-col justify-center">
            <h1 className="font-['Anton'] text-[clamp(4rem,10vw,8rem)] leading-[0.9] text-white tracking-tight">
              OUR
              <br />
              <span className="text-transparent stroke-text">PRODUCTS</span>
            </h1>
            <style>{`
              .stroke-text {
                -webkit-text-stroke: 2px white;
              }
            `}</style>
          </div>

          {/* Right Column - Accordion */}
          <div className="flex flex-col justify-center">
            <div className="w-full max-w-2xl divide-y divide-white/10">
              {servicesList.map((service, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index} className="py-6 group">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between text-left focus:outline-none"
                    >
                      <h3 className={`font-['Montserrat'] text-2xl md:text-3xl font-bold transition-colors duration-300 ${isOpen ? 'text-yellow-400' : 'text-gray-400 group-hover:text-white'}`}>
                        {service.title}
                      </h3>
                      <div className={`p-2 rounded-full border transition-all duration-300 ${isOpen ? 'bg-black border-white rotate-0' : 'bg-transparent border-white/20 -rotate-90 group-hover:border-white'}`}>
                        {isOpen ? <ArrowDown size={20} /> : <ArrowRight size={20} />}
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="font-['Inter'] text-gray-400 text-lg leading-relaxed pr-12">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}