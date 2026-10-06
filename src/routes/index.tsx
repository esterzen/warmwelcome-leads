import { createFileRoute } from "@tanstack/react-router";
import { WhatsappFab } from "@/components/landing/WhatsappFab";
import { BriefingForm } from "@/components/landing/BriefingForm";
import {
  Nav,
  Hero,
  Authority,
  VideoShowcase,
  Manifesto,
  ProgramCompare,
  Gallery,
  Testimonials,
  ProgramsGrid,
  ForWhom,
  Faq,
  Footer,
} from "@/components/landing/sections";
import heroImg from "@/assets/IMG_0582.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Palestra de Liderança e Gestão de Equipes em SC | Ester Zen" },
      {
        name: "description",
        content:
          "Palestras e workshops de liderança e gestão de equipes para entidades e empresas em Santa Catarina e todo o Brasil. Do líder gargalo ao líder que desenvolve.",
      },
      { property: "og:title", content: "Palestra de Liderança e Gestão de Equipes em SC | Ester Zen" },
      {
        property: "og:description",
        content: "Palestras e workshops de liderança e gestão de equipes para entidades e empresas em Santa Catarina e todo o Brasil. Do líder gargalo ao líder que desenvolve.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.esterzen.com/" },
      { property: "og:image", content: `https://www.esterzen.com${heroImg.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `https://www.esterzen.com${heroImg.url}` },
    ],
    links: [{ rel: "canonical", href: "https://www.esterzen.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ester Zen",
          url: "https://www.esterzen.com/",
          jobTitle: "Palestrante de liderança e gestão de equipes",
          areaServed: ["Santa Catarina", "Paraná", "Brasil"],
          sameAs: [
            "https://instagram.com/esterzen",
            "https://www.youtube.com/@aesterzen",
          ],
          knowsAbout: ["Liderança", "Gestão de equipes", "Gestão de pessoas", "Liderança comercial", "NR-1 e riscos psicossociais", "IA aplicada à gestão"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Palestra de liderança",
          name: "Palestra — Do líder gargalo ao líder que desenvolve",
          provider: { "@type": "Person", name: "Ester Zen" },
          areaServed: ["Santa Catarina", "Paraná", "Brasil"],
          description:
            "Palestra de 50–60 minutos de liderança e gestão de equipes: como o líder deixa de ser o gargalo do time. Para congressos, convenções e eventos de entidades.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Workshop de liderança",
          name: "Workshop — Como deixar de ser o gargalo da sua equipe",
          provider: { "@type": "Person", name: "Ester Zen" },
          areaServed: ["Santa Catarina", "Paraná", "Brasil"],
          description:
            "Workshop in-company de 3–4 horas com 5 etapas práticas e entrega de Plano de Conduta por líder; apoio à NR-1.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: "Vendas começa na gestão — trecho de palestra de Ester Zen",
          description: "Trecho de palestra de liderança e gestão de equipes: quando dá errado lá na frente, a gestão está errada. A venda é resultado de estratégia.",
          thumbnailUrl: "https://www.esterzen.com/video/ester-zen-palestra-lideranca.jpg",
          contentUrl: "https://www.esterzen.com/video/ester-zen-palestra-lideranca.mp4",
          uploadDate: "2026-10-06",
          duration: "PT1M8S",
          inLanguage: "pt-BR",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "A Ester atende fora de Santa Catarina?", acceptedAnswer: { "@type": "Answer", text: "Sim. Palestras e workshops são realizados em todo o Brasil. Deslocamento e hospedagem são combinados no orçamento." } },
            { "@type": "Question", name: "Qual o tamanho ideal de turma para o workshop?", acceptedAnswer: { "@type": "Answer", text: "O formato roda muito bem com grupos de 15 a 40 líderes. Turmas maiores são possíveis mediante ajuste de dinâmica." } },
            { "@type": "Question", name: "O workshop ajuda no cumprimento da NR-1?", acceptedAnswer: { "@type": "Answer", text: "Sim. O conteúdo endereça diretamente riscos psicossociais ligados à liderança e é um ativo aceito no plano de ação da NR-1." } },
            { "@type": "Question", name: "Qual o prazo para agendar?", acceptedAnswer: { "@type": "Answer", text: "Recomendamos com pelo menos 30 dias de antecedência. Datas em alta estação (novembro/dezembro e março) costumam fechar cedo." } },
            { "@type": "Question", name: "Vocês emitem certificado?", acceptedAnswer: { "@type": "Answer", text: "Sim, para todos os participantes do workshop, com carga horária e conteúdo programático." } },
          ],
        }),
      },
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
        <VideoShowcase />
        <Manifesto />
        <ProgramCompare />
        <Gallery />
        <Testimonials />
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
