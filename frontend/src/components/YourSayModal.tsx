import { useState } from 'react';
import { Send, ThumbsUp, X } from 'lucide-react';

interface YourSayModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function YourSayModal({ isOpen, onClose }: YourSayModalProps) {
    const [rating, setRating] = useState(50);
    const [name, setName] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const baseURL = import.meta.env.VITE_API_BASE_URL;
            const response = await fetch(`${baseURL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    rating,
                    text: feedback,
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                console.error('Failed to submit review');
                // You could show an error message here
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            // You could show an error message here
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setIsSubmitted(false);
        setRating(50);
        setName('');
        setFeedback('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
                onClick={handleClose}
            ></div>

            <div className="bg-neutral-900 border border-white/10 rounded-[2rem] w-full max-w-md relative z-10 overflow-hidden animate-fade-in shadow-2xl shadow-yellow-500/20">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-[60px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none"></div>

                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full z-20"
                >
                    <X size={18} />
                </button>

                <div className="p-6 relative z-10">
                    <div className="text-center mb-6">
                        <h2 className="font-['Montserrat'] font-black text-white text-2xl mb-1 tracking-tighter">
                            Rate <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Us</span>
                        </h2>
                        <p className="font-['Inter'] text-gray-400 text-xs max-w-xs mx-auto leading-tight">
                            Rate your experience with us.
                        </p>
                    </div>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Rating Section */}
                            <div className="text-center bg-white/5 rounded-xl p-4 border border-white/5">
                                <label className="block text-white font-['Inter'] text-xs font-bold uppercase tracking-wider mb-3">
                                    How would you rate our service?
                                </label>

                                <div className="flex flex-col items-center">
                                    <div className="text-4xl font-['Montserrat'] font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-1">
                                        {rating}
                                    </div>
                                    <div className="text-gray-500 font-['Inter'] text-[10px] uppercase tracking-widest mb-3">
                                        out of 100
                                    </div>

                                    <div className="w-full px-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={rating}
                                            onChange={(e) => setRating(Number(e.target.value))}
                                            className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-yellow-500 hover:accent-yellow-400 transition-colors"
                                        />
                                        <div className="flex justify-between text-gray-500 text-[10px] mt-1.5 font-['Inter'] font-medium">
                                            <span>0</span>
                                            <span>100</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-gray-300 font-['Inter'] text-[10px] font-bold uppercase tracking-wider pl-1">Name</label>
                                <input
                                    required
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs focus:outline-none focus:border-yellow-500/50 focus:bg-black/60 transition-all font-['Inter']"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-gray-300 font-['Inter'] text-[10px] font-bold uppercase tracking-wider pl-1">Your Feedback</label>
                                <textarea
                                    required
                                    rows={2}
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs focus:outline-none focus:border-yellow-500/50 focus:bg-black/60 transition-all font-['Inter'] resize-none"
                                    placeholder="Tell us what you think..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-['Montserrat'] font-bold py-3 rounded-lg hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-yellow-500/25 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</span>
                                <Send size={14} className={`transition-transform ${isSubmitting ? '' : 'group-hover:translate-x-1'}`} />
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-12 animate-fade-in flex flex-col items-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-green-500/30">
                                <ThumbsUp size={36} className="text-green-400" />
                            </div>
                            <h3 className="font-['Montserrat'] font-black text-white text-3xl mb-3">Thank You!</h3>
                            <p className="font-['Inter'] text-gray-400 text-base mb-8 max-w-sm">
                                We appreciate your feedback. It helps us improve our services for you.
                            </p>
                            <button
                                onClick={handleClose}
                                className="text-white bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 rounded-xl font-['Montserrat'] font-bold text-sm transition-all hover:border-white/20"
                            >
                                Close Window
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
