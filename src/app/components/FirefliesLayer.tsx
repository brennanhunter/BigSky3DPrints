'use client';
import { useEffect, useRef } from 'react';

interface Firefly {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  dx: number;
  dy: number;
  da: number;
}

export default function FirefliesLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fireflies = useRef<Firefly[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // More fireflies + bigger & brighter
    fireflies.current = Array.from({ length: 75 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 1.5 + Math.random() * 2,
      alpha: 0.6 + Math.random() * 0.4,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      da: (Math.random() - 0.5) * 0.015,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const f of fireflies.current) {
        f.x += f.dx;
        f.y += f.dy;
        f.alpha += f.da;

        if (f.alpha <= 0.4 || f.alpha >= 1) f.da *= -1;
        if (f.x < 0 || f.x > canvas.width) f.dx *= -1;
        if (f.y < 0 || f.y > canvas.height) f.dy *= -1;

        const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 6);
        gradient.addColorStop(0, `rgba(255, 255, 200, ${f.alpha})`);
        gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
