import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
  index: number;
}

const ProductCard = ({ title, description, buttonText, icon, index }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className={`relative h-[400px] rounded-2xl border border-gray-800 bg-black/40 backdrop-blur-sm overflow-hidden transition-all duration-500 ${
          isHovered ? 'border-gray-600 scale-[1.02]' : ''
        }`}
      >
        {/* Spotlight Effect */}
        {isHovered && (
          <div
            className="absolute pointer-events-none transition-opacity duration-300"
            style={{
              left: mousePosition.x - 150,
              top: mousePosition.y - 150,
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, rgba(100,150,255,0.15) 0%, transparent 70%)',
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}

        {/* Card Content */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Title */}
          <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-8">{description}</p>

          {/* Icon/Visual Area */}
          <div className="flex-1 flex items-center justify-center">
            <div
              className={`transition-all duration-500 ${
                isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-60'
              }`}
            >
              {icon}
            </div>
          </div>

          {/* Button */}
          <div className="mt-auto">
            <button
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${
                isHovered
                  ? 'border-white bg-white/10 text-white'
                  : 'border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              {buttonText}
              <ArrowUpRight
                className={`w-4 h-4 transition-transform duration-300 ${
                  isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Border Glow on Hover */}
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            boxShadow: 'inset 0 0 30px rgba(100,150,255,0.1)',
          }}
        />
      </div>
    </div>
  );
};

const Products = () => {
  const products = [
    {
      title: 'ViechAI',
      description:
        'ViechAI is your cosmic guide, now accessible on viechai.com, iOS, and Android. Explore the universe with AI.',
      buttonText: 'USE NOW',
      icon: (
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-600"
        >
          <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="1" fill="none" />
          <path
            d="M60 10 L60 30 M60 90 L60 110 M10 60 L30 60 M90 60 L110 60"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="60" cy="10" r="3" fill="currentColor" />
          <circle cx="60" cy="110" r="3" fill="currentColor" />
          <circle cx="10" cy="60" r="3" fill="currentColor" />
          <circle cx="110" cy="60" r="3" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: 'API',
      description:
        'Supercharge your applications with ViechAI\'s enhanced speed, precision, and multilingual capabilities.',
      buttonText: 'BUILD NOW',
      icon: (
        <svg
          width="120"
          height="100"
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-600"
        >
          <rect
            x="10"
            y="10"
            width="100"
            height="80"
            rx="4"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <line x1="10" y1="25" x2="110" y2="25" stroke="currentColor" strokeWidth="1" />
          <circle cx="20" cy="17" r="2" fill="currentColor" />
          <circle cx="28" cy="17" r="2" fill="currentColor" />
          <circle cx="36" cy="17" r="2" fill="currentColor" />
          <rect x="20" y="40" width="30" height="40" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
          <line x1="60" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="1" />
          <line x1="60" y1="60" x2="90" y2="60" stroke="currentColor" strokeWidth="1" />
          <line x1="60" y1="70" x2="95" y2="70" stroke="currentColor" strokeWidth="1" />
        </svg>
      ),
    },
    {
      title: 'Developer Docs',
      description:
        'Learn how to quickly install ViechAI at the heart of your applications and explore guides covering common use cases.',
      buttonText: 'LEARN MORE',
      icon: (
        <svg
          width="120"
          height="100"
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-600"
        >
          <rect
            x="20"
            y="5"
            width="80"
            height="90"
            rx="2"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <rect
            x="30"
            y="15"
            width="80"
            height="90"
            rx="2"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <rect
            x="40"
            y="25"
            width="80"
            height="90"
            rx="2"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <line x1="55" y1="45" x2="100" y2="45" stroke="currentColor" strokeWidth="1" />
          <line x1="55" y1="55" x2="95" y2="55" stroke="currentColor" strokeWidth="1" />
          <line x1="55" y1="65" x2="100" y2="65" stroke="currentColor" strokeWidth="1" />
          <line x1="55" y1="75" x2="90" y2="75" stroke="currentColor" strokeWidth="1" />
          <line x1="55" y1="85" x2="95" y2="85" stroke="currentColor" strokeWidth="1" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Label */}
        <p className="text-gray-500 text-xs tracking-widest mb-4">[ PRODUCTS ]</p>

        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-16">
          AI for all humanity
        </h2>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.title}
              title={product.title}
              description={product.description}
              buttonText={product.buttonText}
              icon={product.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
