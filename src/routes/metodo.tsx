import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, MessageCircle, Compass, Users, Target, Repeat, Award } from "lucide-react";
import { Nav, Footer } from "@/components/landing/sections";
import { WhatsappFab } from "@/components/landing/WhatsappFab";
import { buildWhatsappUrl } from "@/lib/contact";
import img0442 from "@/assets/IMG_0442.jpg.asset.json";
import img0565 from "@/assets/IMG_0565.jpg.asset.json";

const METHOD_NAME = "O Líder Que a Equipe Segue";
const METHOD_DESC =
  "Método de liderança comportamental criado por Ester Zen. 5 etapas práticas para o líder parar de ser o teto do próprio time e entregar um Plano de Conduta que a equipe segue mesmo quando ele não está na sala.";
const OG_IMAGE = `https://www.esterzen.com${img0442.url}`;
const waMsg = "Olá, Ester! Quero conhecer o Método O Líder Que a Equipe Segue para minha empresa.";

export const Route = createFileRoute("/metodo")({
  head: () => ({
    meta: [
      { title: "Método O Líder Que a Equipe Segue | Ester Zen" },
      {
        name: "description",
        content:
          "Método de liderança comportamental de Ester Zen. 5 etapas + Plano de Conduta por líder. Palestra, workshop in-company, mentoria e consultoria em todo o Brasil.",
      },
      { property: "og:title", content: "Método O Líder Que a Equipe Segue | Ester Zen" },
      {
        property: "og:description",
        content:
          "5 etapas práticas de liderança comportamental. Cada líder sai com um Plano de Conduta aplicável no dia seguinte. Apoio à NR-1.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.esterzen.com/metodo" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://www.esterzen.com/metodo" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Método de liderança comportamental",
          name: METHOD_NAME,
          provider: { "@type": "Person", name: "Ester Zen", url: "https://www.esterzen.com/" },
          areaServed: "BR",
          description: METHOD_DESC,
          url: "https://www.esterzen.com/metodo",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Formatos disponíveis",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Palestra — O Líder Que a Equipe Segue" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Workshop in-company (3–4h)" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mentoria de liderança" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Consultoria em liderança e gestão comercial" } },
            ],
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "https://www.esterzen.com/" },
            { "@type": "ListItem", position: 2, name: "Método", item: "https://www.esterzen.com/metodo" },
          ],
        }),
      },
    ],
  }),
  component: MetodoPage,
});

const stages = [
  {
    icon: Compass,
    n: "01",
    name: "Diagnóstico de comportamento",
    body: "O líder identifica onde está sendo o teto do time: onde a equipe apenas obedece, onde trava sem ele, onde repete padrões que ele mesmo instalou sem perceber.",
  },
  {
    icon: Target,
    n: "02",
    name: "Padrão de conduta",
    body: "Definição clara do padrão que esse líder quer ver replicado na equipe — em decisão, comunicação, entrega e postura. É o que a equipe vai imitar, queira você ou não.",
  },
  {
    icon: Users,
    n: "03",
    name: "Contrato com a equipe",
    body: "Como esse padrão é comunicado, combinado e cobrado — sem virar discurso motivacional. É onde a maioria dos líderes falha e a NR-1 hoje cobra.",
  },
  {
    icon: Repeat,
    n: "04",
    name: "Ritmo de repetição",
    body: "Rotina prática de reforço: 1:1, reuniões, feedbacks curtos. Comportamento novo não instala em treinamento — instala em repetição.",
  },
  {
    icon: Award,
    n: "05",
    name: "Plano de Conduta",
    body: "Cada líder sai com o seu Plano de Conduta preenchido e assinado — o entregável do método. Documento vivo, revisado a cada trimestre.",
  },
];

const formats = [
  {
    name: "Palestra",
    time: "50–60 min",
    to: "Congressos, convenções, eventos de entidades e kick-offs",
    bullets: ["Provocação de abertura", "3 quebras de padrão", "Case ao vivo do público"],
  },
  {
    name: "Workshop in-company",
    time: "3–4 horas",
    to: "Times de liderança de 15 a 40 pessoas",
    bullets: ["As 5 etapas do método aplicadas", "Plano de Conduta por líder", "Apoio direto à NR-1"],
  },
  {
    name: "Mentoria",
    time: "Ciclos de 3 meses",
    to: "Líder ou dupla de sócios",
    bullets: ["Encontros quinzenais 1:1", "Revisão do Plano de Conduta", "Acompanhamento entre sessões"],
  },
  {
    name: "Consultoria",
    time: "Projeto sob medida",
    to: "Empresas em reestruturação de gestão ou área comercial",
    bullets: ["Diagnóstico + plano de ação", "Aplicação do método na operação", "20+ anos em gestão comercial"],
  },
];

function MetodoPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={img0442.url} alt="" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">Método autoral · Ester Zen</p>
            <h1 className="text-5xl md:text-7xl leading-[0.95] text-balance">
              O Líder Que a<br />
              <span className="italic text-primary">Equipe Segue</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Um método de liderança comportamental com 5 etapas práticas. Cada líder sai com um <strong className="text-foreground">Plano de Conduta</strong> aplicável no dia seguinte — e a equipe passa a seguir o padrão mesmo quando o líder não está na sala.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gap-2">
                <a href={buildWhatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> Levar para minha empresa
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <a href="/#contato">
                  Solicitar proposta <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-20 md:py-28 border-t border-border/50">
          <div className="mx-auto max-w-4xl px-5 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">O problema que o método resolve</p>
            <h2 className="text-3xl md:text-5xl leading-tight text-balance mb-8">
              O problema não é a equipe cansada. <span className="text-muted-foreground/70">É a equipe que não entrega quando o líder não está.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Líderes bem-intencionados viram o teto do próprio time: nada anda sem eles, todo mundo pergunta, todo mundo espera. A equipe entrega — mas só o mínimo, e sempre no ritmo dele.
              </p>
              <p>
                Não é falta de treinamento técnico. É falta de <strong className="text-foreground">padrão de conduta visível</strong>. O método corrige isso na raiz: define o padrão, comunica, repete e mede pelo único KPI que não dá pra fingir — <strong className="text-foreground">a disposição espontânea da equipe</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* 5 stages */}
        <section className="py-20 md:py-28 bg-muted/20 border-y border-border/50">
          <div className="mx-auto max-w-6xl px-5 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">As 5 etapas</p>
            <h2 className="text-3xl md:text-5xl leading-tight text-balance mb-14 max-w-3xl">
              De diagnóstico a Plano de Conduta em uma única jornada.
            </h2>
            <div className="grid gap-6 md:gap-8">
              {stages.map((s) => (
                <div key={s.n} className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start p-6 md:p-8 rounded-2xl border border-border/50 bg-card/40">
                  <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3">
                    <div className="h-14 w-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-display text-3xl text-primary">{s.n}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl mb-3">{s.name}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverable */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-10 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <img
                src={img0565.url}
                alt="Ester Zen conduzindo workshop de liderança"
                loading="lazy"
                decoding="async"
                className="w-full rounded-2xl object-cover aspect-[4/5]"
              />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">O entregável</p>
              <h2 className="text-3xl md:text-5xl leading-tight text-balance mb-6">
                O Plano de Conduta.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Documento assinado pelo próprio líder ao final do workshop. Define o padrão que ele vai sustentar, como vai comunicar à equipe e o ritmo de revisão. É o que fica depois que a Ester vai embora.
              </p>
              <ul className="space-y-3">
                {[
                  "Padrão de comportamento por líder, escrito na 1ª pessoa",
                  "Combinados com a equipe — o que muda a partir de amanhã",
                  "Ritmo de reforço (1:1, reuniões, feedback)",
                  "Revisão trimestral prevista",
                  "Ativo aceito no plano de ação da NR-1",
                ].map((b) => (
                  <li key={b} className="flex gap-3 text-muted-foreground">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Formats — includes CONSULTORIA */}
        <section className="py-20 md:py-28 bg-muted/20 border-y border-border/50">
          <div className="mx-auto max-w-6xl px-5 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Como aplicar</p>
            <h2 className="text-3xl md:text-5xl leading-tight text-balance mb-14 max-w-3xl">
              4 formatos. Um mesmo método.
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {formats.map((f) => (
                <div key={f.name} className="p-8 rounded-2xl border border-border/50 bg-card/40 flex flex-col">
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="text-2xl">{f.name}</h3>
                    <span className="text-xs uppercase tracking-widest text-primary">{f.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{f.to}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="gap-2 w-full">
                    <a href={buildWhatsappUrl(`Olá, Ester! Quero saber sobre ${f.name} do Método O Líder Que a Equipe Segue.`)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" /> Falar sobre {f.name.toLowerCase()}
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-5 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Para quem</p>
            <h2 className="text-3xl md:text-5xl leading-tight text-balance mb-10">
              Feito para quem precisa de resultado — não de discurso motivacional.
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-muted-foreground">
              {[
                { t: "Entidades e cooperativas", d: "SEBRAE, SESCOOP, sindicatos, associações — eventos e capacitação de líderes associados." },
                { t: "Empresas de médio porte", d: "Times de liderança de 15 a 100 pessoas em fase de profissionalização de gestão." },
                { t: "Áreas comerciais", d: "Diretorias e gerências comerciais que precisam de padrão de conduta — e não só de meta." },
              ].map((c) => (
                <div key={c.t} className="p-6 rounded-2xl border border-border/50">
                  <h3 className="text-foreground text-lg mb-2">{c.t}</h3>
                  <p className="text-sm leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 border-t border-border/50">
          <div className="mx-auto max-w-3xl px-5 md:px-10 text-center">
            <h2 className="text-4xl md:text-6xl leading-tight text-balance mb-6">
              Levar o método para <span className="italic text-primary">sua equipe</span>.
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Palestra, workshop, mentoria ou consultoria. A Ester responde direto — em até 1 dia útil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <a href={buildWhatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="/#contato">Preencher briefing</a>
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
