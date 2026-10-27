import { createFileRoute, notFound } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/landing/sections";
import { WhatsappFab } from "@/components/landing/WhatsappFab";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/contact";
import { publicados, formatarData } from "@/lib/artigos";

const BASE = "https://www.esterzen.com";

export const Route = createFileRoute("/artigos/$slug")({
  loader: ({ params }) => {
    const artigo = publicados().find((a) => a.slug === params.slug);
    if (!artigo) throw notFound();
    return artigo;
  },
  head: ({ loaderData: a }) => {
    if (!a) return {};
    const url = `${BASE}/artigos/${a.slug}`;
    const title = `${a.titulo} | Ester Zen`;
    return {
      meta: [
        { title },
        { name: "description", content: a.descricao },
        { property: "og:title", content: title },
        { property: "og:description", content: a.descricao },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: a.data },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.titulo,
            description: a.descricao,
            datePublished: a.data,
            author: { "@type": "Person", name: "Ester Zen", url: BASE + "/" },
            publisher: { "@type": "Person", name: "Ester Zen" },
            mainEntityOfPage: url,
            inLanguage: "pt-BR",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Início", item: BASE + "/" },
              { "@type": "ListItem", position: 2, name: "Artigos", item: BASE + "/artigos" },
              { "@type": "ListItem", position: 3, name: a.titulo, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: ArtigoPage,
});

function ArtigoPage() {
  const a = Route.useLoaderData();
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <article className="pt-32 md:pt-40 pb-20">
          <div className="mx-auto max-w-2xl px-5 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
              <a href="/artigos" className="hover:underline underline-offset-4">Artigos</a> · {a.tema}
            </p>
            <h1 className="text-4xl md:text-5xl leading-[1.05] text-balance">{a.titulo}</h1>
            <p className="mt-5 text-sm text-muted-foreground">
              Ester Zen · {formatarData(a.data)}
            </p>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/90">
              {a.blocos.map((b, i) =>
                "p" in b ? (
                  <p key={i}>{b.p}</p>
                ) : (
                  <ol key={i} className="list-decimal pl-6 space-y-2">
                    {b.ol.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                ),
              )}
            </div>
            <div className="mt-14 rounded-2xl border border-border bg-card p-7">
              <p className="text-lg mb-5">
                Quer ver em que nível estão os processos da liderança na sua empresa?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="gap-2">
                  <a href="/teste-de-lideranca">
                    Fazer o teste de liderança <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <a
                    href={buildWhatsappUrl(`Olá, Ester! Li o artigo "${a.titulo}" e quero conversar.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" /> Conversar no WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsappFab />
    </div>
  );
}
