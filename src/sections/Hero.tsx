import { useState, useRef, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const Hero = () => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create flowing light effect
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.7,
        canvas.height * 0.4,
        0,
        canvas.width * 0.7,
        canvas.height * 0.4,
        canvas.width * 0.6
      );
      gradient.addColorStop(0, 'rgba(100, 150, 255, 0.3)');
      gradient.addColorStop(0.3, 'rgba(80, 120, 200, 0.15)');
      gradient.addColorStop(0.6, 'rgba(60, 90, 150, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add some moving light particles
      for (let i = 0; i < 20; i++) {
        const x = canvas.width * 0.5 + Math.sin(time + i * 0.5) * 300;
        const y = canvas.height * 0.5 + Math.cos(time * 0.7 + i * 0.3) * 200;
        const radius = 2 + Math.sin(time + i) * 1;

        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 10);
        particleGradient.addColorStop(0, 'rgba(150, 180, 255, 0.4)');
        particleGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius * 10, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6 pt-20">
        {/* ViechAI Logo/Text */}
        <h1 className="text-[120px] md:text-[180px] lg:text-[220px] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 leading-none mb-12 select-none">
          ViechAI
        </h1>

        {/* Search Input */}
        <div
          className={`w-full max-w-2xl transition-all duration-300 ${
            isFocused ? 'scale-105' : 'scale-100'
          }`}
        >
          <div
            className={`relative bg-black/60 backdrop-blur-xl rounded-2xl border transition-all duration-300 ${
              isFocused
                ? 'border-gray-500 shadow-[0_0_30px_rgba(100,150,255,0.2)]'
                : 'border-gray-700'
            }`}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="What do you want to know?"
              className="w-full bg-transparent text-white placeholder-gray-500 text-lg py-5 px-6 pr-14 outline-none rounded-2xl"
            />
            <button
              className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                inputValue.trim()
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-gray-800 text-gray-500'
              }`}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Announcement Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          {/* Scroll Indicator */}
          <div className="flex items-center gap-2 text-gray-500">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>

          {/* Announcement */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-white text-sm font-medium">xAI joins SpaceX:</p>
              <p className="text-gray-400 text-sm">
                SpaceX has acquired xAI to accelerate humanity&apos;s future.
              </p>
            </div>
            <a
              href="#"
              className="px-5 py-2 border border-gray-600 rounded-full text-xs tracking-wider text-white hover:border-white hover:bg-white/5 transition-all duration-300"
            >
              READ ANNOUNCEMENT
            </a>
          </div>

          {/* Empty space for balance */}
          <div className="w-8" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
