'use client';
import { useEffect, useRef, useState } from 'react';

export default function RainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fullRainPool = useRef<any[]>([]);
  const intensityRef = useRef(0); // For fast access in animation loop

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate all raindrops
    fullRainPool.current = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: 10 + Math.random() * 20,
      speed: 2 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.5,
    }));

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dropCount = Math.floor(intensityRef.current * fullRainPool.current.length);
      const activeDrops = fullRainPool.current.slice(0, dropCount);

      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(100, 100, 255, 0.4)';

      for (let drop of activeDrops) {
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
      intensityRef.current = scrollProgress;
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
