import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/landing/sections";
import { WhatsappFab } from "@/components/landing/WhatsappFab";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/contact";
import img0551 from "@/assets/IMG_0551.jpg.asset.json";

const OG_IMAGE = `https://www.esterzen.com${img0551.url}`;
const TITLE = "Tipos de Liderança: 8 estilos, quando usar e riscos | Ester Zen";
const DESC =
  "Guia prático dos principais tipos de liderança — autocrática, democrática, liberal, situacional, servidora, transformacional, coach e tóxica — com sinais no dia a dia e quando cada um funciona.";
const waMsg = "Olá, Ester! Vim pela página de tipos de liderança e quero falar sobre um treinamento para o meu time.";

const estilos = [
  {
    t: "Liderança autocrática",
    r: "O líder decide sozinho e comunica a decisão pronta.",
    sinais: "Time pergunta tudo, ninguém arrisca, erro vira busca por culpado.",
    quando: "Crise aguda, risco à segurança, equipe recém-formada sem repertório.",
    risco: "Gera obediência e mata iniciativa. É o estilo que mais aparece em times que travam quando o líder falta.",
  },
  {
    t: "Liderança democrática (participativa)",
    r: "Decisões são construídas com o time; o líder mantém a palavra final.",
    sinais: "Pessoas discordam abertamente e ainda assim executam o combinado.",
    quando: "Times maduros, mudanças que dependem de adesão, melhoria de processo.",
    risco: "Sem clareza de quem decide, vira reunião infinita e decisão que nunca sai.",
  },
  {
    t: "Liderança liberal (laissez-faire)",
    r: "Autonomia ampla, intervenção mínima do líder.",
    sinais: "Cada um faz do seu jeito; qualidade oscila muito entre pessoas.",
    quando: "Especialistas seniores com objetivo claro e indicadores bem definidos.",
    risco: "Confundida com ausência. Sem combinado e sem ritmo de acompanhamento, vira abandono.",
  },
  {
    t: "Liderança situacional",
    r: "O estilo muda conforme a maturidade da pessoa e a complexidade da tarefa.",
    sinais: "O mesmo líder direciona um novato e delega para um sênior sem parecer incoerente.",
    quando: "Equipes com níveis muito diferentes de experiência.",
    risco: "Exige leitura honesta de cada pessoa; feito no achismo, parece favoritismo.",
  },
  {
    t: "Liderança servidora",
    r: "O líder existe para remover obstáculos e desenvolver quem executa.",
    sinais: "Pessoas dizem que têm as condições para entregar bem.",
    quando: "Operações de serviço, atendimento e times em desenvolvimento.",
    risco: "Sem cobrança de padrão, vira paternalismo e a régua cai.",
  },
  {
    t: "Liderança transformacional",
    r: "Mobiliza pelo propósito e por uma imagem clara de futuro.",
    sinais: "As pessoas repetem o discurso e sabem explicar por que aquilo importa.",
    quando: "Reestruturações, novos ciclos, cultura em construção.",
    risco: "Sem rotina e indicadores, vira discurso bonito com entrega igual à de antes.",
  },
  {
    t: "Liderança coach",
    r: "Desenvolve por perguntas e devolutivas frequentes em vez de respostas prontas.",
    sinais: "1:1 acontece de verdade; a pessoa chega com proposta, não só com problema.",
    quando: "Formação de sucessores e times de alto potencial.",
    risco: "Consome tempo do líder; sem agenda protegida, some na primeira semana corrida.",
  },
  {
    t: "Liderança tóxica",
    r: "Controle por medo, ironia pública, incoerência e informação como poder.",
    sinais: "Silêncio nas reuniões, rotatividade alta, problemas que só aparecem tarde.",
    quando: "Nunca. E hoje é também um fator de risco psicossocial a ser gerenciado pela NR-1.",
    risco: "Custa gente boa, custa cliente e custa passivo trabalhista.",
  },
];

export const Route = createFileRoute("/tipos-de-lideranca")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.esterzen.com/tipos-de-lideranca" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://www.esterzen.com/tipos-de-lideranca" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Tipos de liderança: 8 estilos, quando usar e riscos",
          description: DESC,
          author: { "@type": "Person", name: "Ester Zen" },
          publisher: { "@type": "Person", name: "Ester Zen" },
          image: OG_IMAGE,
          mainEntityOfPage: "https://www.esterzen.com/tipos-de-lideranca",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Tipos de liderança",
          itemListElement: estilos.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: e.t,
            description: e.r,
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
            { "@type": "ListItem", position: 2, name: "Tipos de liderança", item: "https://www.esterzen.com/tipos-de-lideranca" },
          ],
        }),
      },
    ],
  }),
  component: TiposPage,
});

function TiposPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <section className="pt-32 md:pt-40 pb-14">
          <div className="mx-auto max-w-5xl px-5 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">Guia · Liderança</p>
            <h1 className="text-4xl md:text-6xl leading-[1.02] text-balance">
              Tipos de liderança:
              <span className="block text-muted-foreground/70">o que cada estilo produz na prática</span>
            </h1>
            <p className="mt-7 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Nenhum estilo é bom ou ruim em si — o que decide é o efeito que ele deixa no time. Abaixo, os 8 tipos mais comuns nas empresas brasileiras, com os sinais que aparecem no dia a dia, quando cada um funciona e o risco que carrega.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gap-2">
                <a href="/teste-de-lideranca">
                  Descobrir meu estilo em 2 minutos <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="mx-auto max-w-5xl px-5 md:px-10 grid md:grid-cols-2 gap-5">
            {estilos.map((e) => (
              <article key={e.t} className="rounded-2xl border border-border bg-card p-7">
                <h2 className="text-xl md:text-2xl mb-3">{e.t}</h2>
                <p className="text-foreground/90 leading-relaxed mb-5">{e.r}</p>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="uppercase tracking-widest text-xs text-primary mb-1">Sinais no dia a dia</dt>
                    <dd className="text-muted-foreground leading-relaxed">{e.sinais}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-widest text-xs text-primary mb-1">Quando funciona</dt>
                    <dd className="text-muted-foreground leading-relaxed">{e.quando}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-widest text-xs text-primary mb-1">Risco</dt>
                    <dd className="text-muted-foreground leading-relaxed">{e.risco}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="py-20 md:py-28 border-t border-border/50 bg-surface/30">
          <div className="mx-auto max-w-4xl px-5 md:px-10">
            <h2 className="text-3xl md:text-5xl leading-tight text-balance mb-6">
              A pergunta que importa mais que o estilo
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Dois líderes podem usar o mesmo estilo e colher resultados opostos. O que separa os dois não é o rótulo — é se a equipe <strong className="text-foreground">obedece</strong> ou <strong className="text-foreground">segue</strong>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Obediência se mede pela presença do líder: com ele na sala, tudo anda. Ser seguido se mede pela ausência: o padrão continua rodando mesmo quando ele não está. O indicador que denuncia a diferença é a disposição espontânea — o que as pessoas fazem sem ninguém mandar.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              É esse deslocamento que o método{" "}
              <a href="/metodo" className="text-primary underline underline-offset-4">O Líder Que a Equipe Segue</a>{" "}
              trabalha — e que a{" "}
              <a href="/nr-1-riscos-psicossociais" className="text-primary underline underline-offset-4">NR-1</a>{" "}
              hoje transforma em obrigação de gestão.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gap-2">
                <a href="/teste-de-lideranca">
                  Fazer o teste gratuito <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <a href={buildWhatsappUrl(waMsg)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> Falar com a Ester
                </a>
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
