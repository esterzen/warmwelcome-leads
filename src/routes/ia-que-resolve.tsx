import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/landing/sections";
import { WhatsappFab } from "@/components/landing/WhatsappFab";
import { PhoneDemo } from "@/components/ia/PhoneDemo";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Mail, Check, Presentation, X, ShieldCheck } from "lucide-react";
import { buildWhatsappUrl, buildMailtoUrl } from "@/lib/contact";
import {
  cenaHoje,
  comparativoIA,
  ondeEntra,
  caseItens,
  metodo,
  formatos,
  faqIA,
  mitoRealidade,
  niveis,
  seguranca,
  adesaoEquipe,
  gradeDia,
  trilhas,
} from "@/components/ia/ia-data";

const URL = "https://www.esterzen.com/ia-que-resolve";
const TITLE = "Palestra de IA para empresas: IA que resolve a rotina | Ester Zen";
const DESC =
  "Palestra e programa de inteligência artificial prática para pequenas e médias empresas: organize pedidos, metas, treinamento e fechamento no celular. Case real de uma rede de 20 lojas.";
const waMsg = "Olá, Ester! Vim pela página IA que resolve e quero entender como levar para a minha empresa.";
const waEntidade = "Olá, Ester! Represento uma entidade e quero levar a palestra IA que resolve para nossos associados.";

export const Route = createFileRoute("/ia-que-resolve")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "IA que resolve — palestra e programa de IA aplicada à gestão",
          serviceType: "Palestra de inteligência artificial para empresas",
          provider: { "@type": "Person", name: "Ester Zen", url: "https://www.esterzen.com/" },
          areaServed: ["Santa Catarina", "Paraná", "Brasil"],
          audience: { "@type": "BusinessAudience", name: "Pequenas e médias empresas, associações comerciais e entidades empresariais" },
          description: DESC,
          url: URL,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqIA.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "https://www.esterzen.com/" },
            { "@type": "ListItem", position: 2, name: "IA que resolve", item: URL },
          ],
        }),
      },
    ],
  }),
  component: IAPage,
});

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs uppercase tracking-[0.25em] text-primary">{children}</p>;
}

function IAPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        {/* HERO */}
        <section className="grain relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_30%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_60%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-10">
            <div className="animate-fade-up">
              <Eyebrow>IA que resolve · para quem é dono de empresa</Eyebrow>
              <h1 className="mt-5 text-4xl leading-[1.05] md:text-6xl text-balance">
                Você não precisa de um programador. <em className="text-primary">Precisa transformar a sua rotina</em> em ferramentas reais no celular.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Empresários comuns estão saindo dos grupos de WhatsApp para sistemas próprios que a equipe realmente usa —
                construídos por eles mesmos, explicando a rotina em português, com a IA fazendo o resto.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="gap-2">
                  <a href={buildWhatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" /> Quero na minha empresa
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <a href="#case">Ver o case funcionando <ArrowRight className="h-4 w-4" /></a>
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Case real: uma rede de <span className="text-foreground">20 lojas</span> que saiu dos grupos de WhatsApp para um painel no celular.
              </p>
            </div>
            <PhoneDemo />
          </div>
        </section>

        {/* CENA */}
        <section className="border-t border-border/60 py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-10">
            <Eyebrow>A cena de quase toda pequena empresa</Eyebrow>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {cenaHoje.map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-border bg-card p-6">
                  <p className="font-display text-2xl">{t}</p>
                  <p className="mt-2 text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl font-display text-2xl md:text-3xl text-balance">
              Funciona enquanto o dono está presente. <span className="text-primary italic">Quando a empresa cresce, ele vira o gargalo.</span>
            </p>
          </div>
        </section>

        {/* REVELAÇÃO */}
        <section className="border-t border-border/60 py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-10">
            <Eyebrow>O que ninguém te contou sobre a nova fase da IA</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-5xl text-balance">Quem constrói agora é <em className="text-primary">quem conhece a empresa</em>.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {mitoRealidade.map(([t, d], k) => (
                <div key={t} className={`rounded-2xl border p-7 ${k === 1 ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
                  <p className={`text-xs uppercase tracking-widest ${k === 0 ? "text-muted-foreground line-through" : "text-primary"}`}>{t}</p>
                  <p className="mt-3 font-display text-xl md:text-2xl">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARATIVO */}
        <section className="bg-surface/50 py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-10">
            <Eyebrow>A crença que trava</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-5xl text-balance">Usar IA é diferente de ter IA na empresa.</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Prompt é pedir. Mas pedir o quê, se a rotina não está escrita em lugar nenhum?
            </p>
            <div className="mt-10 overflow-hidden rounded-2xl border border-border">
              <div className="grid grid-cols-[1fr_1.2fr_1.2fr] bg-card text-xs uppercase tracking-widest text-muted-foreground">
                <span className="p-4" />
                <span className="p-4">Só o prompt</span>
                <span className="p-4 text-primary">IA na estrutura</span>
              </div>
              {comparativoIA.map(([k, a, b]) => (
                <div key={k} className="grid grid-cols-[1fr_1.2fr_1.2fr] border-t border-border text-sm md:text-base">
                  <span className="p-4 text-muted-foreground">{k}</span>
                  <span className="flex gap-2 p-4 text-muted-foreground"><X className="mt-1 h-4 w-4 shrink-0 opacity-60" />{a}</span>
                  <span className="flex gap-2 p-4"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 NIVEIS */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-10">
            <Eyebrow>O método dos 3 níveis</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-5xl text-balance">Onde a sua empresa está <em className="text-primary">na IA</em>?</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {niveis.map(([n, t, tipo, d], k) => (
                <div key={n} className={`rounded-2xl border p-7 ${k === 2 ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
                  <p className="text-xs uppercase tracking-widest text-primary">{n} · {tipo}</p>
                  <p className="mt-3 font-display text-2xl">{t}</p>
                  <p className="mt-3 text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CASE */}
        <section id="case" className="scroll-mt-20 py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-10">
            <PhoneDemo initial={2} className="order-2 md:order-1" />
            <div className="order-1 md:order-2">
              <Eyebrow>Caso real · Oh My Bread</Eyebrow>
              <h2 className="mt-4 text-3xl md:text-5xl text-balance">Uma rede de 20 lojas que vivia em grupos de WhatsApp.</h2>
              <p className="mt-5 text-lg text-muted-foreground">Hoje, um painel no celular de cada loja reúne:</p>
              <ul className="mt-5 space-y-3">
                {caseItens.map((c) => (
                  <li key={c} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-primary" />{c}</li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-primary/40 bg-card p-6">
                <p className="font-display text-xl">Construído por uma consultora comercial, não por um programador.</p>
                <p className="mt-2 text-muted-foreground">
                  A equipe usou desde o primeiro dia, porque o painel nasceu da rotina que ela já fazia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ONDE ENTRA */}
        <section className="border-t border-border/60 bg-surface/50 py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-10">
            <Eyebrow>Onde a IA entra na rotina</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-5xl">Do “hoje” ao “com estrutura”.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {ondeEntra.map(([t, hoje, com]) => (
                <div key={t} className="rounded-2xl border border-border bg-card p-6">
                  <p className="font-display text-xl">{t}</p>
                  <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Hoje</p>
                  <p className="mt-1 text-muted-foreground">{hoje}</p>
                  <p className="mt-4 text-xs uppercase tracking-widest text-primary">Com estrutura</p>
                  <p className="mt-1">{com}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METODO */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-10">
            <Eyebrow>O método</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-5xl text-balance">O prompt é o <em className="text-primary">quarto</em> passo.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {metodo.map(([t, d], k) => (
                <div key={t} className={`rounded-2xl border p-6 ${k === 3 ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
                  <p className="text-sm text-primary">{k + 1}</p>
                  <p className="mt-1 font-display text-2xl">{t}</p>
                  <p className="mt-1 text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-muted-foreground">
              Quando os passos 1, 2 e 3 são bem feitos, o sistema sai leve e a equipe usa sem esforço.
            </p>
          </div>
        </section>

        {/* EQUIPE + DADOS */}
        <section className="border-t border-border/60 py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:px-10">
            <div>
              <Eyebrow>Por que a equipe resiste</Eyebrow>
              <h2 className="mt-4 text-3xl md:text-4xl text-balance">E como fazer ela <em className="text-primary">abraçar a IA</em>.</h2>
              <div className="mt-8 space-y-4">
                {adesaoEquipe.map(([t, d]) => (
                  <div key={t} className="rounded-2xl border border-border bg-card p-5">
                    <p className="font-display text-xl">{t}</p>
                    <p className="mt-1 text-muted-foreground">{d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Eyebrow>Seus dados protegidos</Eyebrow>
              <h2 className="mt-4 text-3xl md:text-4xl text-balance">O concorrente <em className="text-primary">não vê</em> os seus clientes.</h2>
              <div className="mt-8 space-y-4">
                {seguranca.map(([t, d]) => (
                  <div key={t} className="flex gap-4 rounded-2xl border border-border p-5">
                    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div><p className="font-display text-xl">{t}</p><p className="mt-1 text-muted-foreground">{d}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FORMATOS */}
        <section id="formatos" className="border-t border-border/60 bg-surface/50 py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-10">
            <Eyebrow>Para empresas, associações comerciais e entidades</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-5xl">Três formas de começar.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {formatos.map(([k, t, d]) => (
                <div key={t} className="flex flex-col rounded-2xl border border-border bg-card p-7">
                  <p className="text-xs uppercase tracking-widest text-primary">{k}</p>
                  <p className="mt-3 font-display text-2xl">{t}</p>
                  <p className="mt-3 flex-1 text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
            <h3 className="mt-16 text-2xl md:text-3xl">A imersão de 1 dia, hora a hora.</h3>
            <p className="mt-2 text-muted-foreground">Manhã para entender. Tarde para construir. Você sai com a ferramenta funcionando.</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {([["Manhã", gradeDia.manha], ["Tarde", gradeDia.tarde]] as const).map(([p, itens]) => (
                <div key={p} className="rounded-2xl border border-border bg-card p-6">
                  <p className="text-xs uppercase tracking-widest text-primary">{p}</p>
                  <ol className="mt-4 space-y-4">
                    {itens.map(([t, d]) => (
                      <li key={t}><p className="font-display text-xl">{t}</p><p className="text-sm text-muted-foreground">{d}</p></li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <h3 className="mt-14 text-2xl md:text-3xl">Ninguém começa da tela em branco.</h3>
            <p className="mt-2 text-muted-foreground">Na oficina, cada empresário escolhe uma trilha e adapta ao próprio negócio.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {trilhas.map(([k, t, d]) => (
                <div key={k} className="rounded-2xl border border-border p-5">
                  <p className="text-sm text-primary">{k}</p>
                  <p className="mt-1 font-display text-xl">{t}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <a href={buildWhatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" /> Sou empresário</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <a href={buildWhatsappUrl(waEntidade)} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" /> Represento uma entidade</a>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-5 md:px-10">
            <Eyebrow>O que os empresários perguntam</Eyebrow>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {faqIA.map(([q, a]) => (
                <details key={q} className="group py-5">
                  <summary className="cursor-pointer list-none font-display text-xl flex justify-between gap-4">
                    “{q}”<span className="text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="grain border-t border-border/60 py-24">
          <div className="mx-auto max-w-4xl px-5 text-center md:px-10">
            <Eyebrow>Por onde começar na segunda-feira</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-5xl text-balance">Escolha uma rotina que se repete e dá erro. O resto a gente constrói junto.</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="gap-2">
                <a href={buildWhatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" /> Falar no WhatsApp</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <a href={buildMailtoUrl("IA que resolve", "Olá, Ester! Quero saber mais sobre o IA que resolve.")}><Mail className="h-4 w-4" /> contato@esterzen.com</a>
              </Button>
              <Button asChild size="lg" variant="ghost" className="gap-2">
                <a href="/ia-que-resolve/apresentacao"><Presentation className="h-4 w-4" /> Ver apresentação</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsappFab />
    </div>
  );
}
