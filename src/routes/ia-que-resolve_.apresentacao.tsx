import { createFileRoute } from "@tanstack/react-router";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Maximize, Minimize, Check, X } from "lucide-react";
import { PhoneDemo } from "@/components/ia/PhoneDemo";
import {
  cenaHoje,
  comparativoIA,
  ondeEntra,
  gatilhos,
  caseItens,
  metodo,
  encontros,
  formatos,
  faqIA,
  mitoRealidade,
} from "@/components/ia/ia-data";

export const Route = createFileRoute("/ia-que-resolve_/apresentacao")({
  head: () => ({
    meta: [
      { title: "Apresentação — IA que resolve | Ester Zen" },
      { name: "description", content: "Apresentação IA que resolve: a rotina da sua empresa organizada no celular, com o case Oh My Bread." },
      { property: "og:title", content: "Apresentação — IA que resolve | Ester Zen" },
      { property: "og:description", content: "A rotina da sua empresa organizada no celular, com o case Oh My Bread." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: Deck,
});

/* ---------- moldura ---------- */
const PortraitCtx = createContext(false);
function Frame({ children, n }: { children: ReactNode; n?: number }) {
  const portrait = useContext(PortraitCtx);
  return (
    <div className={`slide-content grain bg-background text-foreground ${portrait ? "slide-portrait" : ""}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_55%)]" />
      <div
        className={portrait ? "slide-scroll relative h-full overflow-y-auto px-[72px] pt-[110px] pb-[200px] [&>div.h-full]:h-auto [&>div.h-full]:min-h-full" : "relative h-full px-[120px] pt-[100px] pb-[110px]"}
      >{children}</div>
      <div className={`absolute flex justify-between text-muted-foreground slide-chrome ${portrait ? "top-[48px] left-[72px] right-[72px]" : "bottom-[44px] left-[120px] right-[120px]"}`}>
        <span>Ester Zen · IA que resolve</span>
        {n !== undefined && <span>{String(n).padStart(2, "0")}</span>}
      </div>
    </div>
  );
}
const K = ({ children }: { children: ReactNode }) => <p className="slide-kicker text-primary">{children}</p>;

/** Celular em tamanho de palco */
function BigPhone({ initial = 0, caption = true }: { initial?: number; caption?: boolean }) {
  const portrait = useContext(PortraitCtx);
  const sc = portrait ? 1.75 : caption ? 1.25 : 1.38;
  return (
    <div className="origin-top" style={{ transform: `scale(${sc})`, height: portrait ? (607 + (caption ? 70 : 0)) * sc : undefined }}>
      <PhoneDemo initial={initial} showTabs={false} showCaption={caption} />
    </div>
  );
}

/* ---------- slides ---------- */
const slides: { title: string; render: (n: number) => ReactNode }[] = [
  {
    title: "IA que resolve",
    render: () => (
      <Frame>
        <div className="grid h-full grid-cols-[1.15fr_0.85fr] items-center gap-10">
          <div>
            <K>IA que resolve</K>
            <h1 className="slide-title mt-8">Você não precisa de um programador.</h1>
            <p className="slide-subtitle mt-8 text-muted-foreground">Precisa aprender a transformar a rotina da sua empresa em <em className="text-primary">ferramentas reais no celular</em>.</p>
            <p className="slide-caption mt-14">Ester Zen · Comportamento, relacionamento e resultado</p>
          </div>
          <div className="flex justify-center pt-[40px]"><BigPhone caption={false} /></div>
        </div>
      </Frame>
    ),
  },
  {
    title: "A cena",
    render: (n) => (
      <Frame n={n}>
        <K>A cena de quase toda pequena empresa</K>
        <div className="mt-16 grid grid-cols-3 gap-10">
          {cenaHoje.map(([t, d]) => (
            <div key={t} className="min-h-[300px] rounded-3xl border border-border bg-card p-12">
              <p className="slide-subtitle">{t}</p>
              <p className="slide-body mt-6 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <p className="slide-subtitle mt-20 max-w-[1500px]">
          Funciona enquanto o dono está presente. <em className="text-primary">Quando a empresa cresce, ele vira o gargalo.</em>
        </p>
      </Frame>
    ),
  },
  {
    title: "A crença que trava",
    render: (n) => (
      <Frame n={n}>
        <div className="flex h-full flex-col justify-center">
          <K>A crença que trava</K>
          <h2 className="slide-title mt-10 max-w-[1500px]">Para a maioria, IA ainda é escrever uma pergunta no ChatGPT.</h2>
          <p className="slide-body-lg mt-14 max-w-[1300px] text-muted-foreground">
            Prompt é pedir. <span className="text-foreground">Mas pedir o quê, se a rotina não está escrita em lugar nenhum?</span>
          </p>
        </div>
      </Frame>
    ),
  },
  {
    title: "A nova fase da IA",
    render: (n) => (
      <Frame n={n}>
        <K>O que ninguém te contou sobre a nova fase da IA</K>
        <h2 className="slide-title mt-8">Quem constrói agora é <em className="text-primary">quem conhece a empresa</em>.</h2>
        <div className="mt-14 grid grid-cols-3 gap-10">
          {mitoRealidade.map(([t, d], k) => (
            <div key={t} className={`min-h-[340px] rounded-3xl border p-12 ${k === 1 ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
              <p className={`slide-kicker ${k === 0 ? "text-muted-foreground line-through" : "text-primary"}`}>{t}</p>
              <p className="slide-body-lg mt-6">{d}</p>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },
  {
    title: "Usar vs. ter IA",
    render: (n) => (
      <Frame n={n}>
        <h2 className="slide-title">Usar IA é diferente de <em className="text-primary">ter IA</em> na empresa.</h2>
        <div className="mt-14 overflow-hidden rounded-3xl border border-border">
          <div className="portrait-hide grid grid-cols-[0.8fr_1.2fr_1.2fr] bg-card slide-kicker text-muted-foreground">
            <span className="p-6" /><span className="p-6">Só o prompt</span><span className="p-6 text-primary">IA na estrutura</span>
          </div>
          {comparativoIA.map(([k, a, b]) => (
            <div key={k} className="cmp-row grid grid-cols-[0.8fr_1.2fr_1.2fr] border-t border-border slide-body">
              <span className="px-6 py-5 text-muted-foreground">{k}</span>
              <span className="flex items-center gap-4 px-6 py-5 text-muted-foreground"><X className="h-7 w-7 shrink-0 opacity-50" />{a}</span>
              <span className="flex items-center gap-4 px-6 py-5"><Check className="h-7 w-7 shrink-0 text-primary" />{b}</span>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },
  {
    title: "Onde a IA entra",
    render: (n) => (
      <Frame n={n}>
        <K>Onde a IA entra na rotina</K>
        <div className="mt-12 grid grid-cols-3 gap-8">
          {ondeEntra.map(([t, , com]) => (
            <div key={t} className="min-h-[300px] rounded-3xl border border-border bg-card p-9">
              <p className="slide-subtitle !text-[40px]">{t}</p>
              <p className="slide-caption mt-5">{com}</p>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },
  {
    title: "Quando ninguém lembra",
    render: (n) => (
      <Frame n={n}>
        <h2 className="slide-title">O sistema trabalha <em className="text-primary">quando ninguém lembra.</em></h2>
        <div className="mt-20 grid grid-cols-3 gap-10">
          {gatilhos.map(([t, d], k) => (
            <div key={t} className="min-h-[380px] rounded-3xl border border-border p-12">
              <p className="slide-title text-primary">{k + 1}</p>
              <p className="slide-body-lg mt-6">{t}</p>
              <p className="slide-body mt-4 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },
  {
    title: "Case Oh My Bread",
    render: (n) => (
      <Frame n={n}>
        <div className="grid h-full grid-cols-[1.2fr_0.8fr] gap-10">
          <div className="flex flex-col justify-center">
            <K>Caso real · Oh My Bread</K>
            <h2 className="slide-title mt-8">Uma rede de <em className="text-primary">20 lojas</em> que vivia em grupos de WhatsApp.</h2>
            <p className="slide-body mt-10 text-muted-foreground">Hoje, um painel no celular reúne:</p>
            <ul className="mt-6 space-y-4">
              {caseItens.map((c) => (
                <li key={c} className="slide-body flex items-center gap-5"><Check className="h-8 w-8 text-primary" />{c}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center pt-[10px]"><BigPhone initial={1} caption={false} /></div>
        </div>
      </Frame>
    ),
  },
  {
    title: "Por dentro do painel",
    render: (n) => (
      <Frame n={n}>
        <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-10">
          <div className="flex flex-col justify-center">
            <K>Por dentro do painel</K>
            <h2 className="slide-title mt-8">No celular de cada loja.</h2>
            <div className="mt-12 rounded-3xl border border-primary/50 bg-card p-10">
              <p className="slide-body-lg">Construído por uma consultora comercial, não por um programador.</p>
              <p className="slide-body mt-5 text-muted-foreground">A equipe usou desde o primeiro dia, porque o painel nasceu da rotina que ela já fazia.</p>
            </div>
          </div>
          <div className="flex justify-center pt-[0px]"><BigPhone initial={0} /></div>
        </div>
      </Frame>
    ),
  },
  {
    title: "O método",
    render: (n) => (
      <Frame n={n}>
        <h2 className="slide-title">O método: o prompt é o <em className="text-primary">quarto</em> passo.</h2>
        <div className="mt-14 grid grid-cols-3 gap-8">
          {metodo.map(([t, d], k) => (
            <div key={t} className={`min-h-[240px] rounded-3xl border p-9 ${k === 3 ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
              <p className="slide-caption text-primary">{k + 1}</p>
              <p className="slide-subtitle mt-2">{t}</p>
              <p className="slide-caption mt-3 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <p className="slide-body mt-12 text-muted-foreground">Quando os passos 1, 2 e 3 são bem feitos, o sistema sai leve e a equipe usa sem esforço.</p>
      </Frame>
    ),
  },
  ...[0, 2].map((start) => ({
    title: "O que os empresários perguntam",
    render: (n: number) => (
      <Frame n={n}>
        <K>O que os empresários perguntam</K>
        <div className="mt-14 grid grid-cols-2 gap-10">
          {faqIA.slice(start, start + 2).concat(start === 2 ? faqIA.slice(4, 6) : []).slice(0, start === 2 ? 4 : 2).map(([q, a]) => (
            <div key={q} className="rounded-3xl border border-border bg-card p-10">
              <p className="slide-subtitle !text-[40px]">“{q}”</p>
              <p className="slide-caption mt-5 text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </Frame>
    ),
  })),
  {
    title: "Drucker",
    render: (n) => (
      <Frame n={n}>
        <div className="flex h-full flex-col justify-center">
          <p className="slide-title max-w-[1550px] italic">“Não há nada tão inútil quanto fazer com grande eficiência algo que nem deveria ser feito.”</p>
          <p className="slide-body-lg mt-10 text-primary">Peter Drucker</p>
          <p className="slide-body mt-16 max-w-[1300px] text-muted-foreground">
            Antes de automatizar, corte. A primeira pergunta do diagnóstico é: o que a equipe faz que ninguém usa?
          </p>
        </div>
      </Frame>
    ),
  },
  {
    title: "Segunda-feira",
    render: (n) => (
      <Frame n={n}>
        <h2 className="slide-title">Por onde começar na segunda-feira</h2>
        <ol className="mt-16 space-y-10">
          {["Escolha uma rotina que se repete toda semana e dá erro.", "Escreva como ela é feita hoje, passo a passo.", "Marque onde trava e quem resolve."].map((t, k) => (
            <li key={t} className="slide-body-lg flex items-baseline gap-8"><span className="slide-subtitle text-primary">{k + 1}</span>{t}</li>
          ))}
        </ol>
        <p className="slide-subtitle mt-16 italic text-primary">Só depois abra a ferramenta.</p>
      </Frame>
    ),
  },
  {
    title: "Quatro encontros",
    render: (n) => (
      <Frame n={n}>
        <h2 className="slide-title">Quatro encontros, mão na massa.</h2>
        <p className="slide-body mt-6 text-muted-foreground">Cada empresa sai com o próprio sistema funcionando.</p>
        <div className="mt-14 grid grid-cols-4 gap-8">
          {encontros.map(([t, o, s], k) => (
            <div key={t} className="min-h-[400px] rounded-3xl border border-border bg-card p-9">
              <p className="slide-caption text-primary">Encontro {k + 1}</p>
              <p className="slide-subtitle mt-3 !text-[42px]">{t}</p>
              <p className="slide-caption mt-5 text-muted-foreground">{o}</p>
              <p className="slide-caption mt-6">Sai com: <span className="text-primary">{s}</span></p>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },
  {
    title: "Três formas",
    render: (n) => (
      <Frame n={n}>
        <h2 className="slide-title">Três formas de começar.</h2>
        <div className="mt-16 grid grid-cols-3 gap-10">
          {formatos.map(([k, t, d]) => (
            <div key={t} className="min-h-[440px] rounded-3xl border border-border bg-card p-12">
              <p className="slide-kicker text-primary">{k}</p>
              <p className="slide-subtitle mt-6">{t}</p>
              <p className="slide-body mt-6 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },
  {
    title: "Ester Zen",
    render: () => (
      <Frame>
        <div className="flex h-full flex-col justify-center">
          <K>Vamos começar pela sua rotina?</K>
          <h2 className="slide-title-lg mt-8">Ester Zen</h2>
          <p className="slide-subtitle mt-6 text-muted-foreground">Comportamento, relacionamento e resultado</p>
          <p className="slide-body mt-8 max-w-[1300px]">Mais de 20 anos em gestão comercial. Liderança, vendas e IA aplicada à gestão.</p>
          <div className="slide-body-lg mt-20 flex gap-16 text-primary">
            <span>esterzen.com</span><span>@esterzen</span><span>(47) 99254-3200</span><span>contato@esterzen.com</span>
          </div>
        </div>
      </Frame>
    ),
  },
];

/* ---------- deck ---------- */
function Deck() {
  const [i, setI] = useState(0);
  const [scale, setScale] = useState(0.5);
  const [fs, setFs] = useState(false);
  const [chrome, setChrome] = useState(true);
  const [portrait, setPortrait] = useState(false);
  const [canFs, setCanFs] = useState(false);
  const W = portrait ? 1080 : 1920;
  const H = portrait ? 1920 : 1080;
  const box = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);
  const hideT = useRef<ReturnType<typeof setTimeout>>(undefined);
  const total = slides.length;

  useEffect(() => {
    const s = Number(new URLSearchParams(window.location.search).get("slide"));
    if (s >= 1 && s <= total) setI(s - 1);
  }, [total]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(i + 1));
    window.history.replaceState(null, "", url);
    document.title = `${i + 1}/${total} — ${slides[i].title} · IA que resolve`;
  }, [i, total]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    setCanFs(!!document.documentElement.requestFullscreen);
    const fit = () => {
      const p = el.clientWidth < el.clientHeight;
      setPortrait(p);
      setScale(Math.min(el.clientWidth / (p ? 1080 : 1920), el.clientHeight / (p ? 1920 : 1080)));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const next = useCallback(() => setI((v) => Math.min(v + 1, total - 1)), [total]);
  const prev = useCallback(() => setI((v) => Math.max(v - 1, 0)), []);
  const toggleFs = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); next(); }
      if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); prev(); }
      if (e.key === "Home") setI(0);
      if (e.key === "End") setI(total - 1);
      if (e.key.toLowerCase() === "f") toggleFs();
    };
    const onFs = () => setFs(!!document.fullscreenElement);
    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFs);
    return () => { window.removeEventListener("keydown", onKey); document.removeEventListener("fullscreenchange", onFs); };
  }, [next, prev, toggleFs, total]);

  const poke = () => {
    setChrome(true);
    clearTimeout(hideT.current);
    hideT.current = setTimeout(() => setChrome(false), 2500);
  };

  return (
    <div
      className={`fixed inset-0 bg-background select-none ${chrome ? "" : "cursor-none"}`}
      onMouseMove={poke}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; poke(); }}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touch.current = null;
      }}
    >
      <div ref={box} className="absolute inset-0 overflow-hidden" onClick={(e) => (e.clientX > window.innerWidth / 2 ? next() : prev())}>
        <div
          className="absolute left-1/2 top-1/2"
          style={{ width: W, height: H, marginLeft: -W / 2, marginTop: -H / 2, transform: `scale(${scale})`, transformOrigin: "center center" }}
        >
          <div key={i} className="animate-fade-up" style={{ animationDuration: "0.5s" }}>
            <PortraitCtx.Provider value={portrait}>{slides[i].render(i + 1)}</PortraitCtx.Provider>
          </div>
        </div>
      </div>

      <div className="absolute top-0 inset-x-0 h-1 bg-border/40">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((i + 1) / total) * 100}%` }} />
      </div>

      <div style={{ bottom: "max(12px, env(safe-area-inset-bottom))" }} className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full border border-border bg-card/90 px-2 py-1.5 backdrop-blur transition-opacity ${chrome ? "opacity-100" : "opacity-0"}`}>
        <button aria-label="Anterior" onClick={prev} className="rounded-full p-2 hover:bg-secondary"><ChevronLeft className="h-4 w-4" /></button>
        <span className="px-2 text-xs tabular-nums text-muted-foreground">{i + 1} / {total}</span>
        <button aria-label="Próximo" onClick={next} className="rounded-full p-2 hover:bg-secondary"><ChevronRight className="h-4 w-4" /></button>
        {canFs && (
          <button aria-label={fs ? "Sair da tela cheia" : "Tela cheia"} onClick={toggleFs} className="rounded-full p-2 hover:bg-secondary">
            {fs ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
