import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/landing/sections";
import { WhatsappFab } from "@/components/landing/WhatsappFab";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, MessageCircle, Check } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/contact";
import img0527 from "@/assets/IMG_0527.jpg.asset.json";

const OG_IMAGE = `https://www.esterzen.com${img0527.url}`;
const TITLE = "NR-1 e Riscos Psicossociais: o que a liderança precisa fazer | Ester Zen";
const DESC =
  "A NR-1 passou a exigir o gerenciamento de riscos psicossociais no trabalho. Entenda o que muda, onde a liderança entra e como transformar a exigência em plano de ação prático.";
const waMsg =
  "Olá, Ester! Vim pela página de NR-1 e riscos psicossociais. Quero falar sobre o workshop de liderança para a nossa empresa.";

const faq = [
  {
    q: "O que a NR-1 exige em relação a riscos psicossociais?",
    a: "A NR-1 estabelece o Gerenciamento de Riscos Ocupacionais (GRO) e o PGR. Com a inclusão explícita dos fatores de risco psicossociais, a empresa precisa identificar, avaliar, registrar no inventário de riscos e definir medidas de prevenção para fatores como sobrecarga, assédio, falta de clareza de papéis, jornada e estilo de gestão.",
  },
  {
    q: "Riscos psicossociais têm relação com liderança?",
    a: "Sim, direta. Boa parte dos fatores psicossociais nasce na relação diária com a chefia: cobrança sem clareza, feedback inexistente ou humilhante, incoerência entre o que se pede e o que se pratica, e falta de previsibilidade. Sem trabalhar conduta de liderança, o plano de ação fica só no papel.",
  },
  {
    q: "Treinamento de liderança conta como medida de controle?",
    a: "Capacitação é uma medida administrativa reconhecida dentro da hierarquia de controles da NR-1, desde que registrada com conteúdo programático, carga horária, lista de presença e plano de ação decorrente. Ela não substitui mudanças organizacionais, mas compõe a evidência do que a empresa fez.",
  },
  {
    q: "Que evidência a empresa fica com depois do workshop?",
    a: "Cada líder sai com o Plano de Conduta preenchido — documento com os comportamentos que ele se compromete a praticar e a revisar por trimestre. Junto vai o registro do treinamento (conteúdo, carga horária, participantes), que pode ser anexado ao plano de ação do PGR.",
  },
  {
    q: "Quanto tempo dura e para quantas pessoas?",
    a: "O formato in-company tem de 3 a 4 horas e funciona muito bem com grupos de 15 a 40 líderes. Turmas maiores são possíveis com ajuste de dinâmica.",
  },
];

export const Route = createFileRoute("/nr-1-riscos-psicossociais")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.esterzen.com/nr-1-riscos-psicossociais" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://www.esterzen.com/nr-1-riscos-psicossociais" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "NR-1 e riscos psicossociais: o papel da liderança",
          description: DESC,
          author: { "@type": "Person", name: "Ester Zen" },
          publisher: { "@type": "Person", name: "Ester Zen" },
          image: OG_IMAGE,
          mainEntityOfPage: "https://www.esterzen.com/nr-1-riscos-psicossociais",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "https://www.esterzen.com/" },
            { "@type": "ListItem", position: 2, name: "NR-1 e riscos psicossociais", item: "https://www.esterzen.com/nr-1-riscos-psicossociais" },
          ],
        }),
      },
    ],
  }),
  component: Nr1Page,
});

const fatores = [
  { t: "Sobrecarga e ritmo", d: "Volume de demanda acima da capacidade real, prazos definidos sem conversa e jornada que invade o descanso." },
  { t: "Falta de clareza de papéis", d: "A pessoa não sabe exatamente o que é dela, o que é do outro e o que é sucesso na função." },
  { t: "Baixo controle sobre o trabalho", d: "Executar sem poder decidir nada — o cenário que mais adoece equipes operacionais." },
  { t: "Relações e assédio", d: "Cobrança humilhante, ironia pública, favoritismo e silêncio diante de conflitos." },
  { t: "Feedback ausente ou destrutivo", d: "A pessoa só descobre que errou quando o erro vira problema — ou na frente de todo mundo." },
  { t: "Insegurança e imprevisibilidade", d: "Regras que mudam sem aviso, decisões sem explicação, promessas não cumpridas." },
];

const etapas = [
  { n: "01", t: "Identificar", d: "Levantar os fatores psicossociais presentes na operação, por área e por função — inclusive os que nascem no estilo de gestão." },
  { n: "02", t: "Avaliar e registrar", d: "Classificar os riscos e registrá-los no inventário de riscos do PGR, com a mesma seriedade dada aos riscos físicos." },
  { n: "03", t: "Definir medidas", d: "Plano de ação com medidas organizacionais e administrativas: revisão de processos, combinados de comunicação e capacitação de liderança." },
  { n: "04", t: "Capacitar a liderança", d: "É aqui que entra o workshop: conduta diária de quem lidera — como decide, como comunica, como corrige e como aparece." },
  { n: "05", t: "Monitorar", d: "Revisão periódica com indicadores observáveis, incluindo disposição espontânea, rotatividade e absenteísmo." },
];

function Nr1Page() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <img src={img0527.url} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">NR-1 · Riscos psicossociais</p>
            <h1 className="text-4xl md:text-6xl leading-[1.02] text-balance">
              A NR-1 tirou o clima da equipe do campo subjetivo.
              <span className="block text-muted-foreground/70">Agora ele é risco a ser gerenciado.</span>
            </h1>
            <p className="mt-7 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Fatores psicossociais entraram de vez no Gerenciamento de Riscos Ocupacionais. Isso significa identificar, registrar no PGR e agir. E boa parte desses fatores não nasce no processo — nasce na relação diária com quem lidera.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gap-2">
                <a href={buildWhatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> Falar sobre o workshop
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <a href="/teste-de-lideranca">
                  Fazer o teste de liderança <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 border-t border-border/50">
          <div className="mx-auto max-w-5xl px-5 md:px-10">
            <h2 className="text-3xl md:text-5xl leading-tight text-balance mb-4">
              Quais fatores psicossociais a norma alcança
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-12 leading-relaxed">
              Não é sobre "clima ruim". São condições concretas de organização do trabalho que aumentam a chance de adoecimento — e que precisam aparecer no inventário de riscos.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {fatores.map((f) => (
                <div key={f.t} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-lg mb-2">{f.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 border-t border-border/50 bg-surface/30">
          <div className="mx-auto max-w-4xl px-5 md:px-10">
            <h2 className="text-3xl md:text-5xl leading-tight text-balance mb-12">
              Do papel ao plano de ação, em 5 passos
            </h2>
            <ol className="space-y-8">
              {etapas.map((e) => (
                <li key={e.n} className="flex gap-6">
                  <span className="font-display text-2xl text-primary shrink-0">{e.n}</span>
                  <div>
                    <h3 className="text-xl mb-1.5">{e.t}</h3>
                    <p className="text-muted-foreground leading-relaxed">{e.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-20 md:py-28 border-t border-border/50">
          <div className="mx-auto max-w-4xl px-5 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">O que a empresa leva</p>
            <h2 className="text-3xl md:text-5xl leading-tight text-balance mb-8">
              Workshop de liderança que vira evidência no PGR
            </h2>
            <ul className="space-y-4 text-lg">
              {[
                "3 a 4 horas, in-company, para grupos de 15 a 40 líderes.",
                "Plano de Conduta preenchido e assinado por cada líder — documento revisável por trimestre.",
                "Registro completo do treinamento: conteúdo programático, carga horária e participantes.",
                "Foco nas 4 condutas diárias: como decide, como comunica, como corrige e como aparece.",
                "Linguagem de operação, sem jurídiquês e sem discurso motivacional.",
              ].map((i) => (
                <li key={i} className="flex gap-3 text-foreground/90">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{i}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gap-2">
                <a href={buildWhatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> Pedir proposta no WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <a href="/#contato">
                  Enviar briefing <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Esta página tem caráter informativo e não substitui orientação jurídica ou o trabalho do SESMT. Ela trata da parte que cabe à liderança.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28 border-t border-border/50">
          <div className="mx-auto max-w-3xl px-5 md:px-10">
            <h2 className="text-3xl md:text-4xl leading-tight text-balance mb-10">Perguntas frequentes</h2>
            <Accordion type="single" collapsible className="w-full">
              {faq.map((f, i) => (
                <AccordionItem key={f.q} value={`i${i}`}>
                  <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsappFab />
    </div>
  );
}
