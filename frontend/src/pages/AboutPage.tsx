import { useRef, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { gsap } from 'gsap';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
  color: string;
}

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    fetch(`${baseURL}/about/team`)
      .then(res => res.json())
      .then(data => {
        setTeam(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
    // Animation logic if needed
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />

      {/* Original About Section Content */}
      <section ref={sectionRef} className="relative py-32 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
            <div className="space-y-8">
              <h2 className="font-['Montserrat'] font-black text-5xl md:text-7xl leading-none text-white tracking-tighter">
                Redefining <br />
                <span className="text-yellow-400">Digital Excellence</span>
              </h2>
              <div className="space-y-6">
                <p className="font-['Inter'] text-gray-300 text-lg md:text-xl leading-relaxed font-light border-l-2 border-yellow-400/50 pl-6">
                  At The Coimbatore Media, we engineer digital ecosystems that bridge the gap between tradition and innovation. Our mission is to empower local enterprises with world-class technology, fostering a connected community where businesses thrive.
                </p>
                <p className="font-['Inter'] text-gray-400 text-lg leading-relaxed">
                  From hyper-local news to advanced AI analytics, our portfolio represents a commitment to precision and impact. We don't just build products; we cultivate digital experiences that resonate with the heart of the city.
                </p>
              </div>
            </div>

            <div className="relative mt-8 md:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 to-transparent rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 hover:border-yellow-400/30 transition-colors duration-500">
                <div className="grid grid-cols-1 gap-10">
                  <div className="flex items-start justify-between border-b border-white/5 pb-8">
                    <div>
                      <div className="text-5xl font-['Anton'] text-white mb-2">07<span className="text-yellow-400">+</span></div>
                      <div className="text-sm font-['Montserrat'] text-gray-400 uppercase tracking-widest">Premium Products</div>
                    </div>
                    <div className="text-right max-w-[120px]">
                      <p className="text-xs text-gray-500 font-['Inter']">Diverse solutions across media, AI, and events.</p>
                    </div>
                  </div>

                  <div className="flex items-start justify-between border-b border-white/5 pb-8">
                    <div>
                      <div className="text-5xl font-['Anton'] text-white mb-2">10K<span className="text-yellow-400">+</span></div>
                      <div className="text-sm font-['Montserrat'] text-gray-400 uppercase tracking-widest">Active Users</div>
                    </div>
                    <div className="text-right max-w-[120px]">
                      <p className="text-xs text-gray-500 font-['Inter']">Engaged community members daily.</p>
                    </div>
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-5xl font-['Anton'] text-white mb-2">99<span className="text-yellow-400">%</span></div>
                      <div className="text-sm font-['Montserrat'] text-gray-400 uppercase tracking-widest">Client Satisfaction</div>
                    </div>
                    <div className="text-right max-w-[120px]">
                      <p className="text-xs text-gray-500 font-['Inter']">Based on direct customer feedback ratings.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="relative pt-20">
            <div className="text-center mb-20">
              <h2 className="font-['Montserrat'] font-black text-5xl md:text-7xl mb-6">Our Team</h2>
              <p className="text-gray-400 text-xl font-['Inter']">The minds behind the revolution.</p>
            </div>

            {loading ? (
              <div className="text-center text-white">Loading team...</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                <div key={member._id} className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer">
                  {/* Image */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                  {/* Border Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ border: `2px solid ${member.color}`, borderRadius: '1.5rem', boxShadow: `inset 0 0 20px ${member.color}40` }}
                  ></div>

                  {/* Text Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div
                      className="w-12 h-1 bg-white mb-4 transition-all duration-300 group-hover:w-full"
                      style={{ backgroundColor: member.color }}
                    ></div>
                    <h3 className="font-['Montserrat'] font-bold text-2xl text-white mb-1">{member.name}</h3>
                    <p className="font-['Inter'] text-gray-300 text-sm tracking-widest uppercase">{member.role}</p>
                  </div>
                </div>
              ))}
              </div>
            )}
          </div>
        </div>
      </section >

      <Footer />
      <BackToTop />
    </div >
  );
}