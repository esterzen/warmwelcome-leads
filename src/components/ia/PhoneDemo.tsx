import { useEffect, useRef, useState, type ReactNode } from "react";
import { Bell, Search, Check, Clock, Trophy, Package, Receipt, Target, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export type DemoScreen = { id: string; label: string; caption: string };

export const demoScreens: DemoScreen[] = [
  { id: "avisos", label: "Avisos", caption: "O sistema avisa quem falta" },
  { id: "pedidos", label: "Pedidos", caption: "A loja pede no painel, a fábrica vê o que separar" },
  { id: "fechamento", label: "Fechamento", caption: "Fechamento com a conta feita" },
  { id: "busca", label: "Busca", caption: "Busca por ingrediente para atender" },
  { id: "trilha", label: "Trilha", caption: "Treinamento com trilha e ranking" },
  { id: "metas", label: "Metas", caption: "Meta do dia visível para quem vende" },
];

const INTERVAL = 4800;

/**
 * Celular com as telas do app da Oh My Bread em loop.
 * Telas desenhadas em HTML/CSS (leves, nítidas em qualquer tela, sem vídeo pesado).
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
  const [i, setI] = useState(initial);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible) return;
    const t = setTimeout(() => {
      setI((v) => (v + 1) % demoScreens.length);
      setCycle((c) => c + 1);
    }, INTERVAL);
    return () => clearTimeout(t);
  }, [i, paused, visible]);

  const go = (n: number) => {
    setI(n);
    setCycle((c) => c + 1);
    setPaused(true);
    setTimeout(() => setPaused(false), 12000);
  };

  const screen = demoScreens[i];

  return (
    <div ref={ref} className={cn("flex flex-col items-center", className)}>
      <div
        className="relative w-[280px] aspect-[9/19.3] rounded-[46px] bg-device p-[10px] shadow-[0_40px_80px_-20px_color-mix(in_oklab,var(--primary)_35%,transparent),0_0_0_1px_color-mix(in_oklab,var(--foreground)_14%,transparent)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="absolute left-1/2 top-[18px] z-20 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-device" />
        <div className="relative h-full w-full overflow-hidden rounded-[37px] bg-app-bg text-app-fg">
          <StatusBar />
          <div key={`${screen.id}-${cycle}`} className="animate-screen-in absolute inset-x-0 top-[44px] bottom-0 px-4 pb-4">
            <ScreenBody id={screen.id} />
          </div>
          {/* barra de progresso do loop */}
          {!paused && visible && (
            <div className="absolute bottom-0 inset-x-0 h-[3px] bg-app-line">
              <div
                key={`p-${cycle}`}
                className="h-full bg-app-brand origin-left"
                style={{ animation: `bar-grow ${INTERVAL}ms linear both` }}
              />
            </div>
          )}
        </div>
      </div>

      {showCaption && (
        <p key={`c-${cycle}`} className="animate-fade-up mt-6 text-center font-display text-lg italic text-foreground/90 min-h-[3.5rem] max-w-xs">
          {screen.caption}
        </p>
      )}

      {showTabs && (
        <div className="mt-3 flex flex-wrap justify-center gap-1.5" role="tablist" aria-label="Telas do app">
          {demoScreens.map((s, n) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={n === i}
              onClick={() => go(n)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                n === i
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
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

function StatusBar() {
  return (
    <div className="flex h-[44px] items-center justify-between px-7 pt-1 text-[11px] font-semibold">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="h-2 w-3 rounded-[2px] bg-app-fg/80" />
        <span className="h-2.5 w-5 rounded-[3px] border border-app-fg/70 p-[1px]">
          <span className="block h-full w-3/4 rounded-[1px] bg-app-fg/80" />
        </span>
      </span>
    </div>
  );
}

function AppHeader({ icon, title, sub }: { icon: ReactNode; title: string; sub: string }) {
  return (
    <div className="mb-3 flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-app-brand text-app-brand-fg">{icon}</div>
      <div className="leading-tight">
        <p className="text-[10px] uppercase tracking-wider text-app-muted">Oh My Bread</p>
        <p className="text-[15px] font-semibold">{title}</p>
      </div>
      <span className="ml-auto text-[10px] text-app-muted">{sub}</span>
    </div>
  );
}

function Row({ children, d = 0, className }: { children: ReactNode; d?: number; className?: string }) {
  return (
    <div
      className={cn("animate-row-in rounded-xl border border-app-line bg-app-card px-3 py-2.5", className)}
      style={{ animationDelay: `${d}ms` }}
    >
      {children}
    </div>
  );
}

function ScreenBody({ id }: { id: string }) {
  switch (id) {
    case "avisos":
      return (
        <div className="space-y-2">
          <AppHeader icon={<Bell className="h-4 w-4" />} title="Avisos de hoje" sub="18:30" />
          <Row d={100} className="border-app-warn/50">
            <p className="text-[11px] font-semibold text-app-warn flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-app-warn animate-ping-soft" /> Fechamento pendente
            </p>
            <p className="mt-0.5 text-[12px]">3 lojas ainda não fecharam o caixa</p>
          </Row>
          {[
            ["Loja Centro", "pendente"],
            ["Loja Shopping", "pendente"],
            ["Loja Praia", "pendente"],
            ["Loja Avenida", "ok"],
            ["Loja Bairro", "ok"],
          ].map(([n, s], k) => (
            <Row key={n} d={250 + k * 120} className="flex items-center justify-between">
              <span className="text-[12px]">{n}</span>
              {s === "ok" ? (
                <span className="flex items-center gap-1 text-[10px] font-medium text-app-ok"><Check className="h-3 w-3" /> Fechou</span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-medium text-app-warn"><Clock className="h-3 w-3" /> Aguardando</span>
              )}
            </Row>
          ))}
          <p className="animate-row-in pt-1 text-center text-[10px] text-app-muted" style={{ animationDelay: "1000ms" }}>
            Aviso enviado no WhatsApp do gerente
          </p>
        </div>
      );
    case "pedidos":
      return (
        <div className="space-y-2">
          <AppHeader icon={<Package className="h-4 w-4" />} title="Pedidos das lojas" sub="Amanhã" />
          {[
            ["Pão de fermentação natural", "48 un", "Centro"],
            ["Croissant", "120 un", "Shopping"],
            ["Baguete", "60 un", "Praia"],
            ["Focaccia", "24 un", "Avenida"],
          ].map(([p, q, l], k) => (
            <Row key={p} d={100 + k * 130}>
              <div className="flex justify-between text-[12px]">
                <span className="font-medium">{p}</span>
                <span className="font-semibold text-app-brand">{q}</span>
              </div>
              <p className="text-[10px] text-app-muted">{l} · recebido</p>
            </Row>
          ))}
          <div className="animate-row-in rounded-xl bg-app-brand px-3 py-2.5 text-center text-[12px] font-semibold text-app-brand-fg" style={{ animationDelay: "800ms" }}>
            Lista de separação pronta
          </div>
        </div>
      );
    case "fechamento":
      return (
        <div className="space-y-2">
          <AppHeader icon={<Receipt className="h-4 w-4" />} title="Fechamento" sub="Loja Centro" />
          {[
            ["Dinheiro", "R$ 1.240,00"],
            ["Cartão", "R$ 3.980,50"],
            ["Pix", "R$ 2.115,30"],
            ["Sangria", "− R$ 300,00"],
          ].map(([k2, v], k) => (
            <Row key={k2} d={100 + k * 120} className="flex justify-between text-[12px]">
              <span className="text-app-muted">{k2}</span>
              <span className="font-medium tabular-nums">{v}</span>
            </Row>
          ))}
          <div className="animate-row-in rounded-xl border-2 border-app-ok/60 bg-app-card px-3 py-3" style={{ animationDelay: "700ms" }}>
            <div className="flex justify-between text-[13px] font-semibold">
              <span>Total do dia</span>
              <span className="tabular-nums">R$ 7.035,80</span>
            </div>
            <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-app-ok"><Check className="h-3 w-3" /> Conta conferida pelo sistema</p>
          </div>
        </div>
      );
    case "busca":
      return (
        <div className="space-y-2">
          <AppHeader icon={<Search className="h-4 w-4" />} title="Produtos" sub="Atendimento" />
          <div className="animate-row-in flex items-center gap-2 rounded-xl border border-app-brand/50 bg-app-card px-3 py-2.5 text-[12px]">
            <Search className="h-3.5 w-3.5 text-app-muted" />
            <span>castanha</span>
            <span className="h-3.5 w-px bg-app-fg animate-ping-soft" />
          </div>
          <p className="animate-row-in text-[10px] text-app-muted" style={{ animationDelay: "250ms" }}>3 produtos com o ingrediente</p>
          {[
            ["Pão de castanhas", "Contém glúten e castanhas"],
            ["Cookie de chocolate", "Contém castanha-de-caju"],
            ["Granola da casa", "Castanha-do-pará e mel"],
          ].map(([p, d], k) => (
            <Row key={p} d={350 + k * 140}>
              <p className="text-[12px] font-medium">{p}</p>
              <p className="text-[10px] text-app-muted">{d}</p>
            </Row>
          ))}
          <p className="animate-row-in pt-1 text-center text-[10px] text-app-muted" style={{ animationDelay: "900ms" }}>
            Resposta ao cliente na hora, sem ligar para ninguém
          </p>
        </div>
      );
    case "trilha":
      return (
        <div className="space-y-2">
          <AppHeader icon={<GraduationCap className="h-4 w-4" />} title="Trilha da equipe" sub="7 etapas" />
          <Row d={100}>
            <div className="flex justify-between text-[11px]"><span>Seu progresso</span><span className="font-semibold">5 de 7</span></div>
            <div className="mt-2 flex gap-1">
              {Array.from({ length: 7 }).map((_, k) => (
                <span key={k} className={cn("h-1.5 flex-1 rounded-full", k < 5 ? "bg-app-brand" : "bg-app-line")} />
              ))}
            </div>
          </Row>
          <p className="animate-row-in pt-1 flex items-center gap-1 text-[11px] font-semibold" style={{ animationDelay: "300ms" }}>
            <Trophy className="h-3.5 w-3.5 text-app-warn" /> Ranking das lojas
          </p>
          {[
            ["1", "Loja Avenida", 96],
            ["2", "Loja Centro", 88],
            ["3", "Loja Praia", 74],
            ["4", "Loja Shopping", 61],
          ].map(([pos, n, v], k) => (
            <Row key={n as string} d={400 + k * 130}>
              <div className="flex items-center gap-2 text-[12px]">
                <span className="w-4 font-semibold text-app-brand">{pos}</span>
                <span className="flex-1">{n}</span>
                <span className="text-[10px] tabular-nums text-app-muted">{v}%</span>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-app-line">
                <div className="animate-bar-grow h-full rounded-full bg-app-ok" style={{ width: `${v}%`, animationDelay: `${500 + k * 130}ms` }} />
              </div>
            </Row>
          ))}
        </div>
      );
    default:
      return (
        <div className="space-y-2">
          <AppHeader icon={<Target className="h-4 w-4" />} title="Meta do dia" sub="Hoje" />
          <Row d={100} className="py-4 text-center">
            <p className="text-[10px] uppercase tracking-wider text-app-muted">Loja Centro</p>
            <p className="mt-1 text-[26px] font-semibold tabular-nums">82%</p>
            <div className="mt-2 h-2 rounded-full bg-app-line">
              <div className="animate-bar-grow h-full rounded-full bg-app-brand" style={{ width: "82%", animationDelay: "300ms" }} />
            </div>
            <p className="mt-2 text-[10px] text-app-muted">Faltam 18% para bater a meta</p>
          </Row>
          {[
            ["Croissant", 100],
            ["Pão especial", 76],
            ["Café + doce", 64],
          ].map(([n, v], k) => (
            <Row key={n as string} d={500 + k * 130}>
              <div className="flex justify-between text-[11px]"><span>{n}</span><span className="tabular-nums text-app-muted">{v}%</span></div>
              <div className="mt-1.5 h-1 rounded-full bg-app-line">
                <div className={cn("animate-bar-grow h-full rounded-full", (v as number) >= 100 ? "bg-app-ok" : "bg-app-warn")} style={{ width: `${v}%`, animationDelay: `${600 + k * 130}ms` }} />
              </div>
            </Row>
          ))}
          <p className="animate-row-in pt-1 text-center text-[10px] text-app-muted" style={{ animationDelay: "1000ms" }}>
            Resultado no fim do dia, para quem vendeu
          </p>
        </div>
      );
  }
}
