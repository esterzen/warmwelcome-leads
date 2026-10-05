import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/landing/sections";
import { WhatsappFab } from "@/components/landing/WhatsappFab";
import { LeadQuiz } from "@/components/quiz/LeadQuiz";
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

      </main>
      <Footer />
      <WhatsappFab />
    </div>
  );
}
