'use client';
import { useEffect, useRef } from 'react';

interface Raindrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export default function RainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fullRainPool = useRef<Raindrop[]>([]);
  const intensityRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    fullRainPool.current = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: 8 + Math.random() * 15,
      speed: 0.5 + Math.random() * 1.5,
      opacity: 0.3 + Math.random() * 0.5,
    }));

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dropCount = Math.floor(intensityRef.current * fullRainPool.current.length);
      const activeDrops = fullRainPool.current.slice(0, dropCount);

      ctx.lineWidth = 1.2;

      for (const drop of activeDrops) {
        ctx.strokeStyle = `rgba(100, 100, 255, ${drop.opacity * intensityRef.current})`;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();
        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollTop / docHeight, 1);
      intensityRef.current = Math.max(0, scrollProgress - 0.15);
    };

    window.addEventListener('scroll', handleScroll);
    draw();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
    />
  );
}
