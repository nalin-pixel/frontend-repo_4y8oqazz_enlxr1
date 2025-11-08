import { useEffect, useRef } from 'react';

// Lightweight animated route using Canvas to avoid adding heavy map libs
export default function RouteVisualizer({ route, t }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const DPR = window.devicePixelRatio || 1;

    const resize = () => {
      const { width } = canvas.getBoundingClientRect();
      const height = Math.round(width * 0.45);
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.height = `${height}px`;
      draw(0);
    };

    let raf;
    let tAnim = 0;
    const draw = (tick) => {
      tAnim = (tick / 1000) % 1; // 0..1 loop each second
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // background
      ctx.fillStyle = getComputedStyle(document.documentElement).classList.contains('dark')
        ? '#0a0a0a'
        : '#ffffff';
      ctx.fillRect(0, 0, w, h);

      // world grid
      ctx.strokeStyle = 'rgba(100,100,100,0.15)';
      ctx.lineWidth = 1 * DPR;
      for (let x = 0; x <= w; x += 80 * DPR) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y <= h; y += 60 * DPR) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // route path (bezier)
      const p0 = { x: 60 * DPR, y: h - 80 * DPR };
      const p3 = { x: w - 60 * DPR, y: 80 * DPR };
      const p1 = { x: w * 0.35, y: h * 0.15 };
      const p2 = { x: w * 0.65, y: h * 0.85 };

      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 3 * DPR;
      ctx.setLineDash([8 * DPR, 10 * DPR]);
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // airplane position along path
      const pos = cubicBezierPoint(p0, p1, p2, p3, easeInOutCubic(tAnim));
      // trail
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 4 * DPR;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, pos.x, pos.y);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // plane dot
      ctx.fillStyle = '#111827';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 6 * DPR, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    const handle = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    return () => {
      cancelAnimationFrame(handle);
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [route]);

  return (
    <section className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h3 className="font-semibold text-neutral-900 dark:text-white">{t('routeTitle')}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{t('routeHint')}</p>
        </div>
        <div className="text-sm text-neutral-500 dark:text-neutral-400">{route.from} → {route.to}</div>
      </div>
      <div className="p-2">
        <canvas ref={canvasRef} className="w-full block rounded-lg" />
      </div>
      <div className="px-4 sm:px-6 pb-4 text-sm text-neutral-700 dark:text-neutral-300">
        <span className="mr-4">⏱ {t('eta')}: ~1h 55m</span>
        <span>⛅ {t('weather')}: {t('weatherClear')}</span>
      </div>
    </section>
  );
}

function cubicBezierPoint(p0, p1, p2, p3, t) {
  const x = Math.pow(1 - t, 3) * p0.x + 3 * Math.pow(1 - t, 2) * t * p1.x + 3 * (1 - t) * Math.pow(t, 2) * p2.x + Math.pow(t, 3) * p3.x;
  const y = Math.pow(1 - t, 3) * p0.y + 3 * Math.pow(1 - t, 2) * t * p1.y + 3 * (1 - t) * Math.pow(t, 2) * p2.y + Math.pow(t, 3) * p3.y;
  return { x, y };
}

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
