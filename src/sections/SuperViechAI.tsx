import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const SuperViechAI = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.002;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create starfield effect
      for (let i = 0; i < 100; i++) {
        const x = (Math.sin(i * 12.9898 + time) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(i * 78.233 + time * 0.5) * 0.5 + 0.5) * canvas.height;
        const size = 0.5 + Math.sin(i + time) * 0.5;
        const opacity = 0.3 + Math.sin(i * 2 + time) * 0.3;

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(x, y, size, size);
      }

      // Subtle gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(0.5, 'rgba(20, 30, 50, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M20 4L6 12v16l14 8 14-8V12L20 4z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M20 4v6 M6 12l6 3 M34 12l-6 3" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="text-3xl font-semibold text-white">SuperViechAI</span>
        </div>

        {/* Tagline */}
        <p className="text-gray-400 text-lg mb-2">Do more with ViechAI.</p>

        {/* Description */}
        <p className="text-gray-500 mb-4">
          Unlock a <span className="text-white font-medium">SuperViechAI</span> subscription on ViechAI.com.
        </p>

        <p className="text-gray-500 mb-10">
          We&apos;ve just launched <span className="text-white font-medium">SuperViechAI Heavy</span>, providing
          access to ViechAI Heavy and much higher rate limits.
        </p>

        {/* CTA Button */}
        <a
          href="#"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium transition-all duration-300 ${
            isHovered
              ? 'border-white bg-white/10 text-white'
              : 'border-gray-600 text-white hover:border-white'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          SIGN UP NOW
          <ArrowUpRight
            className={`w-4 h-4 transition-transform duration-300 ${
              isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''
            }`}
          />
        </a>
      </div>
    </section>
  );
};

export default SuperViechAI;
