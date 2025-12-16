
export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-yellow-400/20 py-8 px-8">
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-['Inter'] text-gray-500 text-sm order-2 md:order-1">
          © 2025 The Coimbatore Media. All rights reserved.
        </p>

        <h3 className="font-['Anton'] text-xl md:text-2xl tracking-wider text-white order-1 md:order-2">
          THE COIMBATORE<span className="font-['Anton'] text-yellow-400"> MEDIA</span>
        </h3>
      </div>
    </footer>
  );
}
