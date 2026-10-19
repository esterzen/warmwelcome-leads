import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import v1 from "@/assets/ia/demo1.mp4.asset.json";
import v2 from "@/assets/ia/demo2.mp4.asset.json";
import v3 from "@/assets/ia/demo3.mp4.asset.json";
import p1 from "@/assets/ia/demo1.jpg.asset.json";
import p2 from "@/assets/ia/demo2.jpg.asset.json";
import p3 from "@/assets/ia/demo3.jpg.asset.json";

export type DemoScreen = { id: string; label: string; caption: string; src: string; poster: string };

export const demoScreens: DemoScreen[] = [
  { id: "pedidos", label: "Pedido da loja", caption: "A loja conta o estoque e o pedido sai calculado", src: v1.url, poster: p1.url },
  { id: "agenda", label: "Clientes", caption: "Cliente que quer um produto: registrado, não esquecido", src: v2.url, poster: p2.url },
  { id: "conferencia", label: "Conferência", caption: "Conferência de estoque e envio direto no WhatsApp", src: v3.url, poster: p3.url },
];

/**
 * Celular com gravações reais do app da Oh My Bread em loop (sem áudio).
 * Usado na landing /ia-que-resolve e na apresentação.
 */
export function PhoneDemo({
  className,
  showTabs = true,
  showCaption = true,
  initial = 0,
}: {
  className?: string;
  showTabs?: boolean;
  showCaption?: boolean;
  initial?: number;
}) {
  const [i, setI] = useState(initial % demoScreens.length);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [visible, i]);

  const screen = demoScreens[i];
  const next = () => setI((n) => (n + 1) % demoScreens.length);

  return (
    <div ref={ref} className={cn("flex flex-col items-center", className)}>
      <div className="relative w-[280px] aspect-[9/19.5] rounded-[46px] bg-device p-[9px] shadow-[0_40px_90px_-20px_color-mix(in_oklab,var(--primary)_40%,transparent),0_0_0_1px_color-mix(in_oklab,var(--foreground)_16%,transparent),inset_0_0_0_2px_color-mix(in_oklab,var(--foreground)_10%,transparent)]">
        <span className="absolute -left-[3px] top-[110px] h-[34px] w-[3px] rounded-l bg-device" />
        <span className="absolute -left-[3px] top-[160px] h-[54px] w-[3px] rounded-l bg-device" />
        <span className="absolute -right-[3px] top-[140px] h-[70px] w-[3px] rounded-r bg-device" />
        <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-app-bg">
          <video
            key={screen.id}
            ref={videoRef}
            src={screen.src}
            poster={screen.poster}
            muted
            playsInline
            autoPlay={visible}
            preload="metadata"
            onEnded={next}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.duration) setProgress(v.currentTime / v.duration);
            }}
            className="animate-screen-in h-full w-full object-cover object-top"
            aria-label={screen.caption}
          />
          {/* reflexo do vidro */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,color-mix(in_oklab,var(--foreground)_10%,transparent)_0%,transparent_28%,transparent_70%,color-mix(in_oklab,var(--foreground)_5%,transparent)_100%)]" />
          <div className="absolute inset-x-6 bottom-2 h-[3px] overflow-hidden rounded-full bg-app-line/60">
            <div className="h-full bg-primary transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
      {showCaption && <p className="mt-6 max-w-[300px] text-center text-sm text-muted-foreground">{screen.caption}</p>}
      {showTabs && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {demoScreens.map((s, k) => (
            <button
              key={s.id}
              type="button"
              onClick={() => { setI(k); setProgress(0); }}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                k === i ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
