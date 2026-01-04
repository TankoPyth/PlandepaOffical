import { useRef, useEffect } from 'react';

class FilmGrain {
  width: number;
  height: number;
  grainCanvas: HTMLCanvasElement;
  grainCtx: CanvasRenderingContext2D;
  grainData: ImageData | null;
  frame: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grainCanvas = document.createElement('canvas');
    this.grainCanvas.width = width;
    this.grainCanvas.height = height;
    this.grainCtx = this.grainCanvas.getContext('2d')!;
    this.grainData = null;
    this.frame = 0;
    this.generateGrainPattern();
  }

  generateGrainPattern() {
    const imageData = this.grainCtx.createImageData(this.width, this.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 16) {
      const grain = Math.random();
      const value = grain * 255;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }

    this.grainData = imageData;
  }

  update() {
    this.frame++;

    if (this.frame % 6 === 0 && this.grainData) {
      const data = this.grainData.data;

      for (let i = 0; i < data.length; i += 16) {
        const grain = Math.random();
        const value = grain * 255;

        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
      }

      this.grainCtx.putImageData(this.grainData, 0, 0);
    }
  }

  apply(ctx: CanvasRenderingContext2D, intensity: number = 0.02) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = intensity * 0.5;
    ctx.drawImage(this.grainCanvas, 0, 0);
    ctx.restore();
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grainCanvas.width = width;
    this.grainCanvas.height = height;
    this.generateGrainPattern();
  }
}

interface WaveConfig {
  amplitude: number;
  frequency: number;
  speed: number;
  offset: number;
  opacity: number;
}

export function SubtleWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const filmGrainRef = useRef<FilmGrain | null>(null);
  const timeRef = useRef(0);
  const redPulseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true
    });
    if (!ctx) return;

    let frameCount = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        if (filmGrainRef.current) {
          filmGrainRef.current.resize(canvas.width, canvas.height);
        }
      }
    };

    filmGrainRef.current = new FilmGrain(canvas.width, canvas.height);
    resizeCanvas();

    const isMobile = window.innerWidth < 768;

    const waves: WaveConfig[] = isMobile ? [
      { amplitude: 25, frequency: 0.002, speed: 0.008, offset: 0, opacity: 0.22 },
      { amplitude: 30, frequency: 0.0025, speed: 0.01, offset: Math.PI, opacity: 0.18 }
    ] : [
      { amplitude: 40, frequency: 0.002, speed: 0.008, offset: 0, opacity: 0.28 },
      { amplitude: 35, frequency: 0.003, speed: 0.006, offset: Math.PI * 0.5, opacity: 0.24 },
      { amplitude: 30, frequency: 0.0025, speed: 0.01, offset: Math.PI, opacity: 0.20 },
      { amplitude: 45, frequency: 0.0015, speed: 0.005, offset: Math.PI * 1.5, opacity: 0.16 }
    ];

    const animate = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(animate);

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval) return;

      lastFrameTime = currentTime - (elapsed % frameInterval);

      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      timeRef.current += 0.3;
      frameCount++;

      redPulseRef.current = Math.sin(timeRef.current * 0.002) * 0.5 + 0.5;

      const centerY = canvas.height / 2;

      waves.forEach((wave, index) => {
        wave.offset += wave.speed;

        const colorCycle = Math.sin(timeRef.current * 0.001 + index * 0.5);

        let baseColor: string;
        let baseOpacity: number;

        if (colorCycle > 0.5 && redPulseRef.current > 0.6) {
          const redIntensity = (colorCycle - 0.5) * 2.0 * redPulseRef.current;
          baseColor = `153, 27, 27`;
          baseOpacity = wave.opacity * 0.6 * redIntensity;
        } else if (colorCycle > 0) {
          baseColor = `26, 26, 26`;
          baseOpacity = wave.opacity * (0.7 + colorCycle * 0.3);
        } else {
          baseColor = `45, 45, 45`;
          baseOpacity = wave.opacity * (0.85 + colorCycle * 0.15);
        }

        const gradient = ctx.createLinearGradient(
          0,
          centerY - wave.amplitude * 2,
          0,
          centerY + wave.amplitude * 2
        );

        gradient.addColorStop(0, `rgba(${baseColor}, 0)`);
        gradient.addColorStop(0.4, `rgba(${baseColor}, ${baseOpacity * 0.6})`);
        gradient.addColorStop(0.5, `rgba(${baseColor}, ${baseOpacity})`);
        gradient.addColorStop(0.6, `rgba(${baseColor}, ${baseOpacity * 0.6})`);
        gradient.addColorStop(1, `rgba(${baseColor}, 0)`);

        ctx.beginPath();

        for (let x = -10; x <= canvas.width + 10; x += 4) {
          const y1 = Math.sin(x * wave.frequency + wave.offset) * wave.amplitude;
          const y2 = Math.sin(x * wave.frequency * 2 + wave.offset * 1.3) * (wave.amplitude * 0.3);
          const y3 = Math.sin(x * wave.frequency * 0.5 + wave.offset * 0.8) * (wave.amplitude * 0.4);
          const y = centerY + y1 + y2 + y3;

          if (x === -10) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(canvas.width + 10, canvas.height);
        ctx.lineTo(-10, canvas.height);
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      if (frameCount % 2 === 0 && filmGrainRef.current) {
        filmGrainRef.current.update();
        filmGrainRef.current.apply(ctx, 0.01);
      }
    };

    const handleResize = () => {
      resizeCanvas();
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const shouldAnimate = !mediaQuery.matches;

    if (shouldAnimate) {
      animate(0);
    } else {
      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    />
  );
}
