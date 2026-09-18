import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, MessageCircle, Loader2 } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/contact";
import { supabase } from "@/integrations/supabase/client";
import { etapas, opcoes, faixaDe } from "./diagnostico-data";

const cadastroSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  negocio: z.string().trim().min(2, "Informe o nome do negócio").max(150),
  whatsapp: z
    .string()
    .trim()
    .min(14, "Informe um WhatsApp válido com DDD")
    .max(16),
  consentimento: z.literal(true, {
    errorMap: () => ({ message: "É necessário autorizar o contato" }),
  }),
});
type Cadastro = z.infer<typeof cadastroSchema>;

type Step = "intro" | "cadastro" | "perguntas" | "resultado";

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const TOTAL_PERGUNTAS = etapas.reduce((n, e) => n + e.perguntas.length, 0);

export function DiagnosticoApp() {
  const [step, setStep] = useState<Step>("intro");
  const [etapaIndex, setEtapaIndex] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const [leadId, setLeadId] = useState<string | null>(null);
  const [cadastro, setCadastro] = useState<Cadastro | null>(null);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const form = useForm<Cadastro>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      nome: "",
      negocio: "",
      whatsapp: "",

      consentimento: false as unknown as true,
    },
  });

  const submitCadastro = async (d: Cadastro) => {
    setSaving(true);
    setErro(null);
    const id = crypto.randomUUID();
    const { error } = await supabase.from("diagnostico_leads").insert({
      id,
      nome: d.nome,
      negocio: d.negocio,
      whatsapp: d.whatsapp,
      consentimento: true,
      origem: "Diagnóstico do perfil",

    });
    setSaving(false);
    if (error) {
      setErro("Não foi possível enviar seus dados. Tente novamente.");
      return;
    }
    setLeadId(id);
    setCadastro(d);
    setStep("perguntas");
  };

  const etapa = etapas[etapaIndex];
  const etapaCompleta = etapa.perguntas.every(
    (_, i) => respostas[`${etapaIndex}-${i}`] !== undefined,
  );

  const pontuacaoEtapas = etapas.map((e, ei) =>
    e.perguntas.reduce((sum, _, pi) => sum + (respostas[`${ei}-${pi}`] ?? 0), 0),
  );
  const total = pontuacaoEtapas.reduce((a, b) => a + b, 0);
  const faixa = faixaDe(total);
  const piorIndex = pontuacaoEtapas.reduce(
    (min, v, i) => (v < pontuacaoEtapas[min] ? i : min),
    0,
  );

  const finalizar = async () => {
    setStep("resultado");
    if (!leadId) return;
    const lista = etapas.flatMap((e, ei) =>
      e.perguntas.map((p, pi) => ({ pergunta: p, pontos: respostas[`${ei}-${pi}`] ?? 0 })),
    );
    await supabase
      .from("diagnostico_leads")
      .update({
        respostas: lista,
        pontuacao_etapas: etapas.map((e, i) => ({ etapa: e.titulo, pontos: pontuacaoEtapas[i] })),
        total,
        faixa: faixa.titulo,
      })
      .eq("id", leadId);
  };

  const avancar = () => {
    if (etapaIndex + 1 >= etapas.length) {
      void finalizar();
    } else {
      setEtapaIndex(etapaIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const reiniciar = () => {
    setRespostas({});
    setEtapaIndex(0);
    setLeadId(null);
    setCadastro(null);
    form.reset();
    setStep("intro");
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
      {step === "intro" && (
        <div className="max-w-xl">
          <p className="text-muted-foreground leading-relaxed mb-8">
            Leva cerca de 3 minutos.
          </p>
          <Button size="lg" className="gap-2 w-full sm:w-auto" onClick={() => setStep("cadastro")}>
            Começar <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {step === "cadastro" && (
        <div className="max-w-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Antes de começar</p>
          <h2 className="text-2xl md:text-3xl leading-tight text-balance mb-3">
            Seus dados para receber o diagnóstico
          </h2>
          <p className="text-muted-foreground mb-8">
            Usamos apenas para enviar seu resultado e o material da palestra.
          </p>
          <form className="grid gap-4" onSubmit={form.handleSubmit(submitCadastro)}>
            <div>
              <Label htmlFor="d-nome">Nome</Label>
              <Input id="d-nome" {...form.register("nome")} className="mt-1.5 h-12" />
              {form.formState.errors.nome && (
                <p className="text-xs text-destructive mt-1">{form.formState.errors.nome.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="d-negocio">Nome do negócio</Label>
              <Input id="d-negocio" {...form.register("negocio")} className="mt-1.5 h-12" />
              {form.formState.errors.negocio && (
                <p className="text-xs text-destructive mt-1">{form.formState.errors.negocio.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="d-whats">WhatsApp</Label>
              <Input
                id="d-whats"
                inputMode="numeric"
                placeholder="(48) 99999-0000"
                className="mt-1.5 h-12"
                value={form.watch("whatsapp")}
                onChange={(e) =>
                  form.setValue("whatsapp", maskPhone(e.target.value), { shouldValidate: true })
                }
              />
              {form.formState.errors.whatsapp && (
                <p className="text-xs text-destructive mt-1">{form.formState.errors.whatsapp.message}</p>
              )}
            </div>
            <div className="flex items-start gap-3 mt-1">
              <Checkbox
                id="d-consent"
                checked={form.watch("consentimento") as unknown as boolean}
                onCheckedChange={(v) =>
                  form.setValue("consentimento", (v === true) as true, { shouldValidate: true })
                }
              />
              <Label htmlFor="d-consent" className="text-sm font-normal leading-relaxed text-muted-foreground">
                Autorizo o contato de Ester Zen pelos dados informados, conforme a LGPD.
              </Label>
            </div>
            {form.formState.errors.consentimento && (
              <p className="text-xs text-destructive">{form.formState.errors.consentimento.message}</p>
            )}
            {erro && <p className="text-sm text-destructive">{erro}</p>}
            <Button type="submit" size="lg" className="gap-2 mt-2 w-full sm:w-auto" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Ir para as perguntas <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {step === "perguntas" && (
        <div className="max-w-2xl">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground mb-3">
            <span>
              Etapa {etapaIndex + 1} de {etapas.length}
            </span>
            {etapaIndex > 0 && (
              <button
                type="button"
                onClick={() => setEtapaIndex(etapaIndex - 1)}
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Voltar
              </button>
            )}
          </div>
          <Progress value={((etapaIndex + 1) / etapas.length) * 100} className="mb-8 h-1" />
          <h2 className="text-2xl md:text-3xl leading-snug mb-8">{etapa.titulo}</h2>

          <div className="space-y-8">
            {etapa.perguntas.map((p, pi) => {
              const key = `${etapaIndex}-${pi}`;
              return (
                <div key={key}>
                  <p className="text-foreground/90 leading-relaxed mb-3">{p}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {opcoes.map((o) => {
                      const ativo = respostas[key] === o.valor;
                      return (
                        <button
                          key={o.label}
                          type="button"
                          onClick={() => setRespostas({ ...respostas, [key]: o.valor })}
                          className={`rounded-xl border px-3 py-4 text-sm transition-colors ${
                            ativo
                              ? "border-primary bg-primary/15 text-foreground"
                              : "border-border bg-background text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            size="lg"
            className="gap-2 mt-10 w-full sm:w-auto"
            disabled={!etapaCompleta}
            onClick={avancar}
          >
            {etapaIndex + 1 === etapas.length ? "Ver meu resultado" : "Continuar"}
            <ArrowRight className="h-4 w-4" />
          </Button>
          {!etapaCompleta && (
            <p className="text-xs text-muted-foreground mt-3">Responda todas as perguntas desta etapa.</p>
          )}
        </div>
      )}

      {step === "resultado" && (
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Seu resultado</p>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-6xl md:text-7xl leading-none text-primary">{total}</span>
            <span className="text-muted-foreground mb-2">de 40 pontos</span>
          </div>
          <h2 className="text-2xl md:text-3xl leading-tight mb-2">{faixa.titulo}</h2>
          <p className="text-muted-foreground leading-relaxed mb-10">{faixa.texto}</p>

          <div className="space-y-4 mb-10">
            {etapas.map((e, i) => (
              <div key={e.titulo}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-foreground/90">{e.titulo}</span>
                  <span className="text-muted-foreground">{pontuacaoEtapas[i]}/8</span>
                </div>
                <div className="h-2 rounded-full bg-background overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(pontuacaoEtapas[i] / 8) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 mb-8">
            <p className="text-xs uppercase tracking-widest text-primary mb-2">Comece por aqui</p>
            <h3 className="text-xl mb-2">{etapas[piorIndex].titulo}</h3>
            <p className="text-muted-foreground leading-relaxed">{etapas[piorIndex].recomendacao}</p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 mb-8">
            <p className="text-xs uppercase tracking-widest text-primary mb-2">Próximo passo</p>
            <h3 className="text-2xl leading-snug mb-2">
              Consultoria e Treinamento prático de vendas e atendimento
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Para equipes que atendem no balcão, no direct e no WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="gap-2">
              <a
                href={buildWhatsappUrl(
                  `Olá, Ester! Fiz o diagnóstico do perfil e tirei ${total} pontos.${
                    cadastro ? ` Sou ${cadastro.nome}, do ${cadastro.negocio}.` : ""
                  }`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" /> Falar com a Ester no WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" onClick={reiniciar}>
              Refazer diagnóstico
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
