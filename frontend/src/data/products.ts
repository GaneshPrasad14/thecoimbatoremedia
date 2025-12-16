export interface Product {
    id: string;
    name: string;
    tagline: string;
    url: string;
    color: string;
    longDescription: string;
    features: string[];
    benefits: string[];
}

export const products: Product[] = [
    {
        id: 'coimbatore-ai',
        name: 'coimbatore ai',
        tagline: 'AI for smarter coimbatore',
        url: 'https://coimbatore.ai',
        color: '#00F0FF',
        longDescription: 'The ultimate AI-powered search engine dedicated to Coimbatore. Find anything and everything about the city—from local businesses to hidden gems—instantly. We organize the city\'s information to make it universally accessible and useful for every citizen.',
        features: [
            'Hyper-Local Search Engine',
            'Context-Aware Results',
            'Real-Time Local Data',
            'Voice Search Integration'
        ],
        benefits: [
            'Find local info instantly',
            'Tailored results for Coimbatore',
            'Smarter daily decisions',
            'Connect with the city better'
        ]
    },
    {
        id: 'coimbatore-media',
        name: 'coimbatore media',
        tagline: 'Digital Excellence',
        url: 'https://coimbatoremedia.com',
        color: '#FFFFFF',
        longDescription: 'A powerhouse of digital solutions delivering excellence across four key pillars. We specialize in transforming businesses through superior Web Development, strategic Google My Business (GMB) management, high-impact Digital Marketing, and results-driven Lead Generation.',
        features: [
            'Website Development (All Types)',
            'Google My Business (GMB) Optimization',
            'Digital Marketing (DM)',
            'High-Quality Lead Generation (LG)'
        ],
        benefits: [
            'Dominant online presence',
            'Higher search rankings',
            'Increased brand visibility',
            'Consistent revenue growth'
        ]
    },
    {
        id: 'coimbatore-events',
        name: 'coimbatore events',
        tagline: 'The City\'s Pulse, Live',
        url: 'https://coimbatore.events',
        color: '#FF00E6',
        longDescription: 'The comprehensive guide to every event happening in Coimbatore and its surroundings. From cultural fests and tech conferences to workshops and music shows, we curate the city\'s vibrant social calendar so you never miss out.',
        features: [
            'All Event Types Covered',
            'Surroundings & City-Wide Listings',
            'Real-Time Updates',
            'Easy Booking Integration'
        ],
        benefits: [
            'Never miss a local event',
            'Explore city culture',
            'Plan weekends easily',
            'Connect with communities'
        ]
    },
    {
        id: 'coimbatore-express',
        name: 'coimbatore express',
        tagline: 'The english voice of coimbatore',
        url: 'https://coimbatoreexpress.com',
        color: '#FF4D4D',
        longDescription: 'Coimbatore\'s premier digital magazine and daily news source. We bring you the latest updates, stories, and developments from across the city, delivered with journalistic integrity and a fresh perspective.',
        features: [
            'Daily City Updates',
            'In-Depth Magazine Features',
            'Hyperlocal News Coverage',
            'Community Spotlights'
        ],
        benefits: [
            'Stay updated daily',
            'Reliable english news source',
            'Know your neighborhood',
            'Engage with city stories'
        ]
    },
    {
        id: 'coimbatore-properties',
        name: 'coimbatore properties',
        tagline: 'Premium Real Estate Solutions',
        url: 'https://coimbatore.properties',
        color: '#39FF14',
        longDescription: 'Your one-stop destination for all property needs in Coimbatore. Whether you want to rent, sell, buy, or rent out, our platform simplifies the entire process with verified listings and transparent dealings.',
        features: [
            'Buy & Sell Properties',
            'Rental & Lease Listings',
            'Residential & Commercial',
            'Verified Local Listings'
        ],
        benefits: [
            'Hassle-free transactions',
            'Wide range of options',
            'Direct owner connections',
            'Market-accurate pricing'
        ]
    },
    {
        id: 'coimbatore-matrimony',
        name: 'coimbatore matrimony',
        tagline: 'Trusted Local Connections',
        url: 'https://coimbatorematrimony.in',
        color: '#FFD700',
        longDescription: 'The most trustworthy matrimonial site dedicated to Coimbatore and its surroundings. We focus on building genuine relationships through verified profiles, helping you find your perfect life partner within your community.',
        features: [
            '100% Trustworthy Platform',
            'Coimbatore & Surroundings Focus',
            'Verified Profiles',
            'Secure Matchmaking'
        ],
        benefits: [
            'Find legitimate matches',
            'Safe and secure search',
            'Community-centric approach',
            'Serious relationship focus'
        ]
    },
    {
        id: 'coimbatore-academy',
        name: 'coimbatore academy',
        tagline: 'Excellence in Creative Tech',
        url: 'https://coimbatoreacademy.com',
        color: '#9D00FF',
        longDescription: 'A premier educational hub focusing on modern creative skills. We provide expert training in Video Editing, Graphic Designing, AI Video creation, and more, equipping you with the tools to thrive in the digital creator economy.',
        features: [
            'Video Editing Mastery',
            'Graphic Design Courses',
            'AI Video Generation',
            'Practical Hands-on Training'
        ],
        benefits: [
            'Master high-demand skills',
            'Launch a creative career',
            'Learn modern AI tools',
            'Industry-ready portfolio'
        ]
    }
];
