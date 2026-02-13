import { useState } from 'react';

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const footerLinks = {
    'TRY VIECHAI ON': [
      { label: 'Web', href: '#' },
      { label: 'iOS', href: '#' },
      { label: 'Android', href: '#' },
      { label: 'ViechAI on X', href: '#' },
    ],
    PRODUCTS: [
      { label: 'ViechAI', href: '#' },
      { label: 'X', href: '#' },
      { label: 'API', href: '#' },
      { label: 'ViechAI Enterprise', href: '#' },
      { label: 'ViechAIpedia', href: '#' },
    ],
    COMPANY: [
      { label: 'Company', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'News', href: '#' },
    ],
    RESOURCES: [
      { label: 'Documentation', href: '#' },
      { label: 'Privacy policy', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Safety', href: '#' },
      { label: 'Legal', href: '#' },
      { label: 'Status', href: '#' },
    ],
  };

  return (
    <footer className="relative bg-black pt-20 pb-10 overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(139, 69, 19, 0.3) 0%, rgba(139, 69, 19, 0.1) 30%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              {/* Category Title */}
              <h4 className="text-gray-500 text-xs tracking-widest mb-6">{category}</h4>

              {/* Links */}
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`text-sm transition-all duration-200 ${
                        hoveredLink === `${category}-${link.label}`
                          ? 'text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                      onMouseEnter={() => setHoveredLink(`${category}-${link.label}`)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <svg
              width="24"
              height="24"
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

          {/* Copyright */}
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} ViechAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
