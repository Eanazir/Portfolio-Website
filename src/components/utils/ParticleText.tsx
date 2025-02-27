import React, { useEffect, useRef } from 'react';

interface ParticleTextProps {
  text: string;
}

export const ParticleText: React.FC<ParticleTextProps> = ({ text }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Increase resolution for a crisper result
    const scale = window.devicePixelRatio || 1;

    // Larger base dimensions for sharper text
    const baseWidth = 800;
    const baseHeight = 200;
    canvas.width = baseWidth * scale;
    canvas.height = baseHeight * scale;
    canvas.style.width = `${baseWidth}px`;
    canvas.style.height = `${baseHeight}px`;

    ctx.scale(scale, scale);

    // Mouse starts off-canvas
    const mouse = { x: -9999, y: -9999 };
    const particles: Particle[] = [];

    // Utility to convert #RRGGBB to [r,g,b]
    function hexToRgb(hex: string): [number, number, number] {
      let normalized = hex.replace('#', '');
      // Support short #abc => #aabbcc
      if (normalized.length === 3) {
        normalized = normalized.split('').map((c) => c + c).join('');
      }
      const bigint = parseInt(normalized, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b];
    }

    // Linear interpolation between two colors
    function lerpColor(colorA: string, colorB: string, t: number): string {
      const [r1, g1, b1] = hexToRgb(colorA);
      const [r2, g2, b2] = hexToRgb(colorB);
      const r = Math.round(r1 + (r2 - r1) * t);
      const g = Math.round(g1 + (g2 - g1) * t);
      const b = Math.round(b1 + (b2 - b1) * t);
      return `rgb(${r}, ${g}, ${b})`;
    }

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        // Smaller size for more refined text
        this.size = 1.2;
        this.baseX = x;
        this.baseY = y;
        // "Springiness" range
        this.density = Math.random() * 15 + 5;
      }

      draw(color: string) {
        if (!ctx) return;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        // Avoid division by zero
        const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));

        const maxDistance = 40; // "Magnet" radius
        const force = (maxDistance - distance) / maxDistance;

        if (distance < maxDistance) {
          // Scatter away from the mouse
          const directionX = (dx / distance) * force * this.density;
          const directionY = (dy / distance) * force * this.density;
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Snap back to original position
          const homeX = this.x - this.baseX;
          const homeY = this.y - this.baseY;
          this.x -= homeX / 8;
          this.y -= homeY / 8;
        }
      }
    }

    // Initialize the particle positions based on the rendered text
    const initParticles = () => {
      particles.length = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // More professional font: bigger size for higher detail
      ctx.font = 'bold 40px Montserrat, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Subtle text shadow for clarity
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 3;
      // Temporary fill color to shape the text
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, baseWidth / 2, baseHeight / 2);
      ctx.shadowBlur = 0; // Reset

      const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Tighter sampling => more particles => crisper text
      for (let y = 0; y < textCoordinates.height; y += 2) {
        for (let x = 0; x < textCoordinates.width; x += 2) {
          const alpha = textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3];
          // If alpha channel is >128 => pixel is “inside” the text
          if (alpha > 128) {
            particles.push(new Particle(x / scale, y / scale));
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Oscillate between two brand colors
      const period = 10000; // ms for a full cycle
      const t = (Math.sin((performance.now() / period) * 2 * Math.PI - Math.PI / 2) + 1) / 2;
      // const currentColor = lerpColor('var(--accentColor)', '#8A7FD6', t);
      const currentColor = `rgba(255, 255, 255, 0.7)`;

      // Update & draw each particle
      particles.forEach((p) => {
        p.update();
        p.draw(currentColor);
      });

      requestAnimationFrame(animate);
    };

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Kick things off
    initParticles();
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        background: 'transparent',
        maxWidth: '100%',
        cursor: 'pointer',
        display: 'block',
        margin: '0 auto'
      }}
    />
  );
};