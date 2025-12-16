import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
    id: number;
    name: string;
    rating: number;
    text: string;
}

export default function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        fetch(`${baseURL}/reviews`)
            .then(response => response.json())
            .then(data => {
                setReviews(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (reviews.length > 0) {
            const interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % reviews.length);
            }, 5000); // Auto-slide every 5 seconds

            return () => clearInterval(interval);
        }
    }, [reviews.length]);

    if (loading) {
        return (
            <section className="pt-0 pb-24 md:py-24 bg-black relative overflow-hidden -mt-48 md:mt-0">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="font-['Montserrat'] font-black text-white text-3xl md:text-5xl mb-4 tracking-tighter">
                            What People <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Say</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="text-center text-white">Loading reviews...</div>
                </div>
            </section>
        );
    }

    if (reviews.length === 0) {
        return (
            <section className="pt-0 pb-24 md:py-24 bg-black relative overflow-hidden -mt-48 md:mt-0">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="font-['Montserrat'] font-black text-white text-3xl md:text-5xl mb-4 tracking-tighter">
                            What People <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Say</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="text-center text-white">No reviews yet.</div>
                </div>
            </section>
        );
    }

    return (
        <section className="pt-0 pb-24 md:py-24 bg-black relative overflow-hidden -mt-48 md:mt-0">
            {/* Background Decorations */}
            <div className="absolute left-1/4 top-0 w-[500px] h-[500px] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="absolute right-1/4 bottom-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse py-4"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-['Montserrat'] font-black text-white text-3xl md:text-5xl mb-4 tracking-tighter">
                        What People <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Say</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto rounded-full"></div>
                </div>

                <div className="max-w-4xl mx-auto relative group/carousel">
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
                        className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-30 p-3 text-white/30 hover:text-white transition-colors duration-300 md:opacity-0 md:group-hover/carousel:opacity-100"
                        aria-label="Previous review"
                    >
                        <ChevronLeft size={48} strokeWidth={1} />
                    </button>

                    <button
                        onClick={() => setActiveIndex((prev) => (prev + 1) % reviews.length)}
                        className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-30 p-3 text-white/30 hover:text-white transition-colors duration-300 md:opacity-0 md:group-hover/carousel:opacity-100"
                        aria-label="Next review"
                    >
                        <ChevronRight size={48} strokeWidth={1} />
                    </button>

                    <div className="relative h-[400px] md:h-[300px]">
                        {reviews.map((review, index) => {
                            // Calculate position relative to active index
                            let position = 'opacity-0 scale-90 translate-x-full pointer-events-none';
                            if (index === activeIndex) {
                                position = 'opacity-100 scale-100 translate-x-0 z-20';
                            } else if (index === (activeIndex - 1 + reviews.length) % reviews.length) {
                                position = 'opacity-0 scale-90 -translate-x-full pointer-events-none';
                            }

                            return (
                                <div
                                    key={review.id}
                                    className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${position}`}
                                >
                                    <div className="h-full flex items-center justify-center p-4">
                                        <div className="bg-gradient-to-br from-neutral-900/90 to-neutral-900/50 border border-white/10 rounded-[2rem] p-8 md:p-12 relative w-full backdrop-blur-xl shadow-2xl shadow-yellow-500/5 group hover:border-yellow-500/30 transition-colors">
                                            {/* Glowing border effect */}
                                            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-yellow-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>

                                            <Quote className="absolute top-6 right-8 text-neutral-800 group-hover:text-yellow-500/20 transition-colors duration-500 rotate-180" size={60} />

                                            <div className="flex flex-col items-center text-center gap-6 relative z-10">
                                                {/* Numeric Rating Badge */}
                                                <div className="flex flex-col items-center">
                                                    <div className="text-4xl md:text-5xl font-['Montserrat'] font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                                                        {review.rating}
                                                    </div>
                                                    <div className="text-gray-500 font-['Inter'] text-xs uppercase tracking-widest mt-1">
                                                        out of 100
                                                    </div>
                                                </div>

                                                <p className="font-['Inter'] text-gray-300 text-lg md:text-xl leading-relaxed font-light font-italic">
                                                    "{review.text}"
                                                </p>

                                                <div>
                                                    <h3 className="text-white font-['Montserrat'] font-bold text-xl tracking-wide">
                                                        {review.name}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Progress Bar Indicators */}
                    <div className="flex justify-center gap-3 mt-8">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className="group relative py-2"
                                aria-label={`Go to slide ${index + 1}`}
                            >
                                <div className={`h-1 rounded-full transition-all duration-500 ${index === activeIndex
                                    ? 'w-12 bg-gradient-to-r from-yellow-500 to-amber-500'
                                    : 'w-3 bg-gray-700 group-hover:bg-gray-600'
                                    }`}></div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
