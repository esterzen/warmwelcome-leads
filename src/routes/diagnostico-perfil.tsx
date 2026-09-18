import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/landing/sections";
import { WhatsappFab } from "@/components/landing/WhatsappFab";
import { DiagnosticoApp } from "@/components/diagnostico/DiagnosticoApp";

const TITLE = "Diagnóstico do Perfil — Do post ao caixa | Ester Zen";
const DESC =
  "Diagnóstico gratuito em 20 perguntas: posicionamento, bio, conteúdo, atendimento e pós-venda do seu perfil nas redes sociais. Receba sua pontuação e por onde começar.";

export const Route = createFileRoute("/diagnostico-perfil")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.esterzen.com/diagnostico-perfil" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DiagnosticoPage,
});

function DiagnosticoPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <section className="pt-28 md:pt-36 pb-6">
          <div className="mx-auto max-w-3xl px-5 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-5">
              Do post ao caixa
            </p>
            <h1 className="text-3xl md:text-5xl leading-[1.05] text-balance">
              Diagnóstico do seu <span className="italic text-primary">perfil</span>
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              20 perguntas sobre posicionamento, conteúdo e atendimento nas redes sociais. Responda com o
              que você faz hoje, não com o que pretende fazer.
            </p>
          </div>
        </section>

        <section className="pb-12">
          <div className="mx-auto max-w-3xl px-5 md:px-10">
            <DiagnosticoApp />
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="mx-auto max-w-3xl px-5 md:px-10">
            <div className="rounded-3xl border border-border bg-card p-6 md:p-10 flex flex-col sm:flex-row items-center gap-6">
              <img
                src="/qr-diagnostico-perfil.svg"
                alt="QR Code para acessar o diagnóstico do perfil"
                width={200}
                height={200}
                className="h-44 w-44 rounded-xl bg-white p-2 shrink-0"
              />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Compartilhe</p>
                <h2 className="text-xl md:text-2xl leading-snug mb-2">
                  Aponte a câmera para fazer o diagnóstico
                </h2>
                <p className="text-muted-foreground leading-relaxed break-all">
                  www.esterzen.com/diagnostico-perfil
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsappFab />
    </div>
  );
}
