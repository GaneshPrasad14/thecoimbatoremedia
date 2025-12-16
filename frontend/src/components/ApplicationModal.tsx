import { useState, useEffect } from 'react';
import { X, Upload, Send, Briefcase } from 'lucide-react';

interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    position: string;
}

export default function ApplicationModal({ isOpen, onClose, position }: ApplicationModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        resume: null as File | null,
        coverLetter: null as File | null
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: '',
                email: '',
                phone: '',
                resume: null,
                coverLetter: null
            });
            setIsSubmitted(false);
        }
    }, [isOpen, position]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted for:', position, formData);
        setIsSubmitted(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'resume' | 'coverLetter') => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, [field]: e.target.files![0] }));
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            ></div>

            <div className="bg-[#111] border border-white/10 rounded-xl w-full max-w-lg relative z-10 overflow-hidden animate-fade-in shadow-xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#111] sticky top-0 z-20">
                    <div>
                        <h2 className="font-['Manrope'] font-bold text-white text-xl">
                            Apply for Position
                        </h2>
                        <p className="font-['Inter'] text-gray-400 text-sm mt-1">
                            {position}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 font-['Inter'] text-sm font-medium mb-1.5">Full Name <span className="text-red-500">*</span></label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all font-['Inter'] placeholder:text-gray-600"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-300 font-['Inter'] text-sm font-medium mb-1.5">Email <span className="text-red-500">*</span></label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all font-['Inter'] placeholder:text-gray-600"
                                            placeholder="name@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 font-['Inter'] text-sm font-medium mb-1.5">Phone <span className="text-red-500">*</span></label>
                                        <input
                                            required
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all font-['Inter'] placeholder:text-gray-600"
                                            placeholder="+91 00000 00000"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-white/5 space-y-4">
                                <h3 className="text-sm font-medium text-gray-300">Documents</h3>

                                {/* Resume Upload */}
                                <div className="relative">
                                    <input
                                        required
                                        type="file"
                                        id="resume"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => handleFileChange(e, 'resume')}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="resume"
                                        className={`flex items-center justify-between w-full p-4 rounded-lg border border-dashed transition-all cursor-pointer group ${formData.resume
                                                ? 'bg-white/5 border-white/30'
                                                : 'bg-[#1a1a1a] border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded bg-white/5 text-gray-400 group-hover:text-white transition-colors">
                                                <Upload size={18} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-200">
                                                    {formData.resume ? formData.resume.name : 'Upload Resume'}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {formData.resume ? 'Ready to upload' : 'PDF, DOC, DOCX (Max 5MB)'}
                                                </div>
                                            </div>
                                        </div>
                                        {formData.resume && (
                                            <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded">
                                                Attached
                                            </span>
                                        )}
                                    </label>
                                </div>

                                {/* Cover Letter Upload */}
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="coverLetter"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => handleFileChange(e, 'coverLetter')}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="coverLetter"
                                        className={`flex items-center justify-between w-full p-4 rounded-lg border border-dashed transition-all cursor-pointer group ${formData.coverLetter
                                                ? 'bg-white/5 border-white/30'
                                                : 'bg-[#1a1a1a] border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded bg-white/5 text-gray-400 group-hover:text-white transition-colors">
                                                <Upload size={18} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-200">
                                                    {formData.coverLetter ? formData.coverLetter.name : 'Cover Letter (Optional)'}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {formData.coverLetter ? 'Ready to upload' : 'Share why you are a good fit'}
                                                </div>
                                            </div>
                                        </div>
                                        {formData.coverLetter && (
                                            <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded">
                                                Attached
                                            </span>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-white text-black font-['Manrope'] font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    <span>Submit Application</span>
                                    <Send size={16} />
                                </button>
                                <p className="text-center text-xs text-gray-500 mt-4">
                                    By submitting, you agree to our privacy policy.
                                </p>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center py-12 flex flex-col items-center animate-fade-in">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-green-400 border border-white/10">
                                <Send size={32} />
                            </div>
                            <h3 className="font-['Manrope'] font-bold text-white text-xl mb-2">Application Received</h3>
                            <p className="font-['Inter'] text-gray-400 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
                                Thanks for applying to the <strong>{position}</strong> role. We'll be in touch soon.
                            </p>
                            <button
                                onClick={onClose}
                                className="text-white bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-lg font-medium text-sm transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
