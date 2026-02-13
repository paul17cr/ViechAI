import { useEffect, useRef } from 'react';

const Universe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Create particles
    for (let i = 0; i < 80; i++) {
      const angle = (Math.PI * 2 * i) / 80;
      const distance = 100 + Math.random() * 300;
      particles.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        vx: Math.cos(angle) * 0.3,
        vy: Math.sin(angle) * 0.3,
        size: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.5,
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const currentCenterX = canvas.width / 2;
      const currentCenterY = canvas.height / 2;

      // Draw connections
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Orbit around center
        const dx = currentCenterX - particle.x;
        const dy = currentCenterY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
          particle.vx += (dx / dist) * 0.02;
          particle.vy += (dy / dist) * 0.02;
        }

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw connection to center
        ctx.beginPath();
        ctx.moveTo(currentCenterX, currentCenterY);
        ctx.lineTo(particle.x, particle.y);
        ctx.strokeStyle = `rgba(100, 150, 255, ${particle.opacity * 0.2})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Draw connections to nearby particles
        particles.slice(i + 1).forEach((other) => {
          const pdx = particle.x - other.x;
          const pdy = particle.y - other.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pdist < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(100, 150, 255, ${(1 - pdist / 150) * 0.15})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        });

        // Draw particle
        ctx.fillStyle = `rgba(150, 180, 255, ${particle.opacity})`;
        ctx.fillRect(
          particle.x - particle.size / 2,
          particle.y - particle.size / 2,
          particle.size,
          particle.size
        );

        // Glow effect
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        gradient.addColorStop(0, `rgba(150, 180, 255, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Central glow
      const centerGradient = ctx.createRadialGradient(
        currentCenterX,
        currentCenterY,
        0,
        currentCenterX,
        currentCenterY,
        100
      );
      centerGradient.addColorStop(0, 'rgba(100, 150, 255, 0.3)');
      centerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = centerGradient;
      ctx.beginPath();
      ctx.arc(currentCenterX, currentCenterY, 100, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white/90 leading-tight">
            <span className="block">Understand</span>
            <span className="block text-right mt-4">The Universe</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Universe;
