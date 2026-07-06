import { createFileRoute } from "@tanstack/react-router";
import { WhatsappFab } from "@/components/landing/WhatsappFab";
import { BriefingForm } from "@/components/landing/BriefingForm";
import {
  Nav,
  Hero,
  Authority,
  Manifesto,
  ProgramCompare,
  Gallery,
  ProgramsGrid,
  ForWhom,
  Faq,
  Footer,
} from "@/components/landing/sections";
import heroImg from "@/assets/IMG_0582.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ester Zen · O líder que a equipe segue | Palestras & Workshops de Liderança" },
      {
        name: "description",
        content:
          "Palestras e workshops de liderança comportamental para entidades e empresas. Pare de ser o teto do seu time.",
      },
      { property: "og:title", content: "Ester Zen · O líder que a equipe segue" },
      {
        property: "og:description",
        content: "Palestras e workshops de liderança comportamental para entidades e empresas.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://esterzen.com${heroImg.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `https://esterzen.com${heroImg.url}` },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Authority />
        <Manifesto />
        <ProgramCompare />
        <Gallery />
        <ProgramsGrid />
        <ForWhom />
        <section id="contato" className="py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-5 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Solicitar proposta</p>
            <h2 className="text-4xl md:text-5xl leading-tight text-balance mb-4">
              Conte o contexto.<br />
              <span className="text-muted-foreground/70">A Ester responde direto.</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-xl">
              Preencha o briefing abaixo e envie por WhatsApp ou email. Retornamos em até 1 dia útil.
            </p>
            <BriefingForm />
          </div>
        </section>
        <Faq />
      </main>
      <Footer />
      <WhatsappFab />
    </div>
  );
}
