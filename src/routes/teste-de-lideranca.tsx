import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/landing/sections";
import { WhatsappFab } from "@/components/landing/WhatsappFab";
import { LeadQuiz } from "@/components/quiz/LeadQuiz";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import img0565 from "@/assets/IMG_0565.jpg.asset.json";

const OG_IMAGE = `https://www.esterzen.com${img0565.url}`;
const TITLE = "Teste de Liderança: sua equipe te segue ou te obedece? | Ester Zen";
const DESC =
  "Teste de liderança gratuito, 7 perguntas em 2 minutos. Descubra se sua equipe te segue de verdade ou apenas cumpre ordens — e o que fazer a partir do resultado.";

export const Route = createFileRoute("/teste-de-lideranca")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.esterzen.com/teste-de-lideranca" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://www.esterzen.com/teste-de-lideranca" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Quiz",
          name: "Sua equipe te segue ou te obedece?",
          about: { "@type": "Thing", name: "Liderança comportamental" },
          educationalLevel: "Profissional",
          url: "https://www.esterzen.com/teste-de-lideranca",
          author: { "@type": "Person", name: "Ester Zen" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "https://www.esterzen.com/" },
            { "@type": "ListItem", position: 2, name: "Teste de liderança", item: "https://www.esterzen.com/teste-de-lideranca" },
          ],
        }),
      },
    ],
  }),
  component: TestePage,
});

function TestePage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <section className="pt-32 md:pt-40 pb-10">
          <div className="mx-auto max-w-5xl px-5 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">Teste de liderança · gratuito</p>
            <h1 className="text-4xl md:text-6xl leading-[1] text-balance">
              Sua equipe te <span className="italic text-primary">segue</span>
              <span className="block text-muted-foreground/70">— ou apenas te obedece?</span>
            </h1>
            <p className="mt-7 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Obediência é o que a equipe faz porque precisa. Seguir é o que ela faz mesmo quando você não está na sala. Este teste de liderança mostra em qual dos dois cenários o seu time está hoje — e qual comportamento seu está sustentando isso.
            </p>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="mx-auto max-w-5xl px-5 md:px-10">
            <LeadQuiz />
          </div>
        </section>

        <section className="py-20 md:py-28 border-t border-border/50">
          <div className="mx-auto max-w-4xl px-5 md:px-10">
            <h2 className="text-3xl md:text-4xl leading-tight text-balance mb-8">
              Como interpretar o resultado
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  t: "Obedecido",
                  d: "A entrega depende da sua presença e da sua cobrança. Você virou o teto do time: nada anda sem você.",
                },
                {
                  t: "Zona de transição",
                  d: "Parte do time já segue o padrão, parte ainda só cumpre. Normalmente trava em um ponto só — clareza, feedback ou coerência.",
                },
                {
                  t: "Seguido",
                  d: "Existe disposição espontânea: as pessoas fazem além do pedido. O risco aqui é o padrão viver só na sua figura.",
                },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-lg mb-2">{c.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-7">
              <h2 className="text-2xl mb-3">O indicador que não dá para fingir</h2>
              <p className="text-muted-foreground leading-relaxed">
                Metas, presença e clima podem ser maquiados por um tempo. Disposição espontânea, não. Quando a equipe faz o que ninguém mandou — avisa antes do problema estourar, corrige sem ser cobrada, cuida do detalhe que não estava no processo —, é porque segue. Todo o método{" "}
                <a href="/metodo" className="text-primary underline underline-offset-4">O Líder Que a Equipe Segue</a>{" "}
                trabalha em cima desse indicador.
              </p>
              <Button asChild size="lg" className="gap-2 mt-7">
                <a href="/#programas">
                  Ver palestra e workshop <ArrowRight className="h-4 w-4" />
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
