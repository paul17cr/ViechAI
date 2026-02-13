import { useState } from 'react';

interface NavbarProps {
  scrollY: number;
}

const Navbar = ({ scrollY }: NavbarProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = ['VIECHAI', 'API', 'COMPANY', 'COLOSSUS', 'SPACEX', 'CAREERS', 'NEWS', 'SHOP'];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 100 ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M16 2L4 8v16l12 6 12-6V8L16 2z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M16 12L10 15v6l6 3 6-3v-6l-6-3z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </a>

        {/* Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`text-xs tracking-wider transition-all duration-200 ${
                hoveredItem === item ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#"
          className="px-5 py-2 border border-gray-600 rounded-full text-xs tracking-wider text-white hover:border-white hover:bg-white/5 transition-all duration-300"
        >
          TRY VIECHAI
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
