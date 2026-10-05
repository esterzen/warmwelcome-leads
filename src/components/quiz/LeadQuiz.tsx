import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, MessageCircle, Mail, Check } from "lucide-react";
import { buildMailtoUrl, buildWhatsappUrl } from "@/lib/contact";
import { questions, computeResult, type Choice, type Result } from "./quiz-data";

const preSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  telefone: z.string().trim().min(10, "WhatsApp inválido").max(20),
});
type PreData = z.infer<typeof preSchema>;

const leadSchema = z.object({
  email: z.string().trim().email("Email inválido").max(255),
  empresa: z.string().trim().max(150).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Necessário para enviar o resultado" }) }),
});
type LeadData = z.infer<typeof leadSchema>;

type Step = "intro" | "pre" | "questions" | "lead" | "result";

export function LeadQuiz() {
  const [step, setStep] = useState<Step>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Choice[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [pre, setPre] = useState<PreData | null>(null);
  const [lead, setLead] = useState<(PreData & LeadData) | null>(null);

  const preForm = useForm<PreData>({
    resolver: zodResolver(preSchema),
    defaultValues: { nome: "", telefone: "" },
  });

  const form = useForm<LeadData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { email: "", empresa: "", consent: false as unknown as true },
  });

  const answer = (choice: Choice) => {
    const next = [...answers.slice(0, index), choice];
    setAnswers(next);
    if (index + 1 >= questions.length) {
      setStep("lead");
    } else {
      setIndex(index + 1);
    }
  };

  const composeSummary = (d: PreData & LeadData, r: Result) => {
    const bCount = answers.filter((x) => x === "B").length;
    return [
      "Resultado do teste — Sua equipe te segue ou te obedece?",
      "",
      `Nome: ${d.nome}`,
      `Email: ${d.email}`,
      `WhatsApp: ${d.telefone}`,
      d.empresa ? `Empresa: ${d.empresa}` : null,
      "",
      `Resultado: ${r.title}`,
      `Placar: ${questions.length - bCount} respostas A · ${bCount} respostas B`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const submitPre = (d: PreData) => {
    setPre(d);
    setStep("questions");
  };

  const submitLead = (d: LeadData) => {
    const r = computeResult(answers);
    setLead({ ...(pre ?? { nome: "", telefone: "" }), ...d });
    setResult(r);
    setStep("result");
  };

  const restart = () => {
    setAnswers([]);
    setIndex(0);
    setResult(null);
    setLead(null);
    form.reset();
    setStep("intro");
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
      {step === "intro" && (
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Teste gratuito</p>
          <p className="text-lg leading-relaxed mb-2">
            7 perguntas. Cerca de 2 minutos. Responda com o que sua equipe <strong className="text-foreground">faz hoje</strong>, não com o que você gostaria que ela fizesse.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            No final você recebe um diagnóstico com o que está travando a entrega do seu time.
          </p>
          <Button size="lg" className="gap-2" onClick={() => setStep("pre")}>
            Começar o teste <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {step === "pre" && (
        <div className="max-w-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Antes de começar</p>
          <h2 className="text-2xl md:text-3xl leading-tight text-balance mb-3">
            Para onde enviamos seu diagnóstico?
          </h2>
          <p className="text-muted-foreground mb-8">
            Preencha para iniciar o teste e receber o resultado no final.
          </p>
          <form className="grid gap-4" onSubmit={preForm.handleSubmit(submitPre)}>
            <div>
              <Label htmlFor="p-nome">Nome</Label>
              <Input id="p-nome" {...preForm.register("nome")} className="mt-1.5" />
              {preForm.formState.errors.nome && (
                <p className="text-xs text-destructive mt-1">{preForm.formState.errors.nome.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="p-tel">WhatsApp</Label>
              <Input id="p-tel" {...preForm.register("telefone")} className="mt-1.5" placeholder="(47) 99999-0000" />
              {preForm.formState.errors.telefone && (
                <p className="text-xs text-destructive mt-1">{preForm.formState.errors.telefone.message}</p>
              )}
            </div>
            <Button type="submit" size="lg" className="gap-2 mt-2">
              Ir para o teste <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
          <button
            type="button"
            onClick={() => setStep("intro")}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-underline hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar
          </button>
        </div>
      )}

      {step === "questions" && (
        <div className="max-w-2xl">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground mb-3">
            <span>
              Pergunta {index + 1} de {questions.length}
            </span>
            {index > 0 && (
              <button
                type="button"
                onClick={() => setIndex(index - 1)}
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Voltar
              </button>
            )}
          </div>
          <Progress value={((index + 1) / questions.length) * 100} className="mb-8 h-1" />
          <h2 className="text-2xl md:text-3xl leading-snug text-balance mb-8">{questions[index].prompt}</h2>
          <div className="grid gap-4">
            {(["A", "B"] as Choice[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => answer(c)}
                className="text-left rounded-2xl border border-border bg-background p-5 md:p-6 transition-colors hover:border-primary/60 hover:bg-surface/60"
              >
                <span className="text-xs uppercase tracking-widest text-primary">{c}</span>
                <span className="block mt-2 text-foreground/90 leading-relaxed">
                  {c === "A" ? questions[index].a : questions[index].b}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "lead" && (
        <div className="max-w-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Último passo</p>
          <h2 className="text-3xl md:text-4xl leading-tight text-balance mb-3">
            Falta um passo para ver seu resultado
          </h2>
          <p className="text-muted-foreground mb-8">
            Seus dados são usados apenas para enviar o diagnóstico e materiais da Ester Zen.
          </p>
          <form className="grid gap-4" onSubmit={form.handleSubmit(submitLead)}>
            <div>
              <Label htmlFor="q-email">Email</Label>
              <Input id="q-email" type="email" {...form.register("email")} className="mt-1.5" />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="q-empresa">Empresa</Label>
              <Input id="q-empresa" {...form.register("empresa")} className="mt-1.5" placeholder="Opcional" />
            </div>
            <div className="flex items-start gap-3 mt-1">
              <Checkbox
                id="q-consent"
                checked={form.watch("consent") as unknown as boolean}
                onCheckedChange={(v) => form.setValue("consent", (v === true) as true, { shouldValidate: true })}
              />
              <Label htmlFor="q-consent" className="text-sm font-normal leading-relaxed text-muted-foreground">
                Autorizo receber o resultado e conteúdos da Ester Zen.
              </Label>
            </div>
            {form.formState.errors.consent && (
              <p className="text-xs text-destructive">{form.formState.errors.consent.message}</p>
            )}
            <Button type="submit" size="lg" className="gap-2 mt-2">
              Ver meu resultado <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {step === "result" && result && lead && (
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Seu diagnóstico</p>
          <h2 className="text-3xl md:text-5xl leading-tight text-balance mb-2">{result.title}</h2>
          <p className="text-xl text-muted-foreground mb-8">{result.headline}</p>
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            {result.body.map((p) => (
              <p key={p} className="flex gap-3">
                <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                <span>{p}</span>
              </p>
            ))}
          </div>
          <p className="mt-8 text-lg text-balance">{result.cta}.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="gap-2">
              <a href={buildWhatsappUrl(result.waMessage)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> Falar com a Ester
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a
                href={buildMailtoUrl(
                  `Resultado do teste — ${lead.nome}`,
                  composeSummary(lead, result),
                )}
              >
                <Mail className="h-4 w-4" /> Receber por email
              </a>
            </Button>
          </div>

          <div className="mt-16 pt-12 border-t border-border/50">
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

          <button
            type="button"
            onClick={restart}
            className="mt-8 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Refazer o teste
          </button>
        </div>
      )}
    </div>
  );
}
