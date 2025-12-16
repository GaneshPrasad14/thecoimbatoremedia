import { useState, useEffect } from 'react';
import { ArrowRight, Briefcase, Coffee, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ApplicationModal from '../components/ApplicationModal';
import BackToTop from '../components/BackToTop';

const benefits = [
    { icon: <Shield className="w-5 h-5 md:w-6 md:h-6" />, title: 'Job Security' },
    { icon: <Coffee className="w-5 h-5 md:w-6 md:h-6" />, title: 'Work-Life Balance' },
    { icon: <Briefcase className="w-5 h-5 md:w-6 md:h-6" />, title: 'Career Growth' }
];

interface Position {
    _id: string;
    role: string;
    dept: string;
    type: string;
    location: string;
    description: string;
}

export default function CareersPage() {
    const [positions, setPositions] = useState<Position[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState('');

    useEffect(() => {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        fetch(`${baseURL}/careers`)
            .then(res => res.json())
            .then(data => {
                setPositions(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleApply = (position: string) => {
        setSelectedPosition(position);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-black min-h-screen text-white font-['Inter'] selection:bg-yellow-500/30">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-600/20 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="font-['Anton'] text-7xl md:text-[10rem] leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-wider">
                        BUILD THE <br /> <span className="text-stroke-white text-transparent">FUTURE</span>
                    </h1>
                    <p className="font-['Montserrat'] text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
                        Join the visionaries redefineing Coimbatore's digital landscape.
                    </p>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-20 px-6 bg-white/5 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-3 gap-4 md:gap-12">
                        {benefits.map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center space-y-2 md:space-y-4 group">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="font-['Montserrat'] font-bold text-[11px] md:text-xl whitespace-nowrap">{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Openings */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="font-['Montserrat'] font-black text-5xl mb-16 text-center">Open Positions</h2>

                    {loading ? (
                        <div className="text-center text-white">Loading positions...</div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {positions.map((job, i) => (
                                <div key={job._id} className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/10 group-hover:to-transparent rounded-3xl transition-all duration-500"></div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="mb-6 flex justify-between items-start">
                                            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium tracking-wider uppercase text-yellow-300 border border-yellow-500/20">
                                                {job.dept}
                                            </span>
                                            <ArrowRight className="text-gray-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" size={20} />
                                        </div>

                                        <h3 className="font-['Montserrat'] font-bold text-2xl mb-2 group-hover:text-yellow-300 transition-colors">{job.role}</h3>

                                        <div className="flex items-center gap-3 text-sm text-gray-400 mb-6 font-mono">
                                            <span>{job.location}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                            <span>{job.type}</span>
                                        </div>

                                        <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                                            {job.description}
                                        </p>

                                        <button
                                            onClick={() => handleApply(job.role)}
                                            className="w-full py-3 rounded-xl border border-white/20 hover:bg-white hover:text-black transition-colors font-bold tracking-wide text-sm uppercase"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-20 text-center">
                        <p className="text-gray-500 mb-4">Don't see your perfect role?</p>
                        <a href="mailto:careers@coimbatoremedia.com" className="font-['Montserrat'] font-bold text-white border-b-2 border-yellow-500 hover:text-yellow-400 transition-colors pb-1">
                            Drop us a line
                        </a>
                    </div>
                </div>
            </section>

            <Footer />

            <ApplicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                position={selectedPosition}
            />
            <BackToTop />
        </div>
    );
}