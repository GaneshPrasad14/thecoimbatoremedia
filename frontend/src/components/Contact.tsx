import { Mail, MapPin, Phone, Linkedin, Instagram, Twitter } from 'lucide-react';

export default function Contact() {
    return (
        <section id="contact" className="py-32 bg-black px-8 relative overflow-hidden">
            <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-20">
                    <div>
                        <h2 className="font-['Montserrat'] font-black text-white text-5xl md:text-7xl mb-8 tracking-tighter">
                            Let's Talk
                        </h2>
                        <p className="font-['Inter'] text-gray-400 text-xl mb-12 max-w-lg leading-relaxed">
                            Have a project in mind or want to partner with us? We'd love to hear from you.
                        </p>

                        <div className="space-y-8 font-['Inter']">
                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors">
                                    <Mail className="text-gray-300 group-hover:text-yellow-400 transition-colors" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1">Email Us</h3>
                                    <a href="mailto:contact@coimbatoremedia.com" className="text-gray-400 hover:text-white transition-colors">contact@coimbatoremedia.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors">
                                    <Phone className="text-gray-300 group-hover:text-yellow-400 transition-colors" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1">Call Us</h3>
                                    <a href="tel:+919514195242" className="text-gray-400 hover:text-white transition-colors">+91 95141 95242</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors">
                                    <MapPin className="text-gray-300 group-hover:text-yellow-400 transition-colors" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1">Visit Us</h3>
                                    <p className="text-gray-400">
                                        3G-1, KK Residency Building,<br /> Venkatasamy Road East, R.S Puram,<br /> Coimbatore, Tamil Nadu, India - 641002.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-sm">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-white font-['Inter'] text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors font-['Inter']"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-white font-['Inter'] text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors font-['Inter']"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-white font-['Inter'] text-sm font-medium mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors font-['Inter']"
                                    placeholder="Tell us about your project..."
                                />
                            </div>
                            <button className="w-full bg-white text-black font-['Montserrat'] font-bold py-4 rounded-xl hover:bg-yellow-400 transition-colors duration-300 mt-4">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
