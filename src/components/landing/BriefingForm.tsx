import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Mail } from "lucide-react";
import { buildMailtoUrl, buildWhatsappUrl } from "@/lib/contact";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  entidade: z.string().trim().min(2, "Informe entidade ou empresa").max(150),
  cargo: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Email inválido").max(255),
  telefone: z.string().trim().min(10, "WhatsApp inválido").max(20),
  formato: z.enum(["Palestra", "Workshop", "In-company", "Outro"]),
  data: z.string().trim().max(80).optional().or(z.literal("")),
  mensagem: z.string().trim().max(1000).optional().or(z.literal("")),
});
type FormData = z.infer<typeof schema>;

export function BriefingForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", entidade: "", cargo: "", email: "", telefone: "", formato: "Palestra", data: "", mensagem: "" },
  });

  const compose = (data: FormData) => {
    const lines = [
      `Olá, Ester!`,
      ``,
      `Nome: ${data.nome}`,
      `Entidade/Empresa: ${data.entidade}`,
      data.cargo ? `Cargo: ${data.cargo}` : null,
      `Email: ${data.email}`,
      `WhatsApp: ${data.telefone}`,
      `Formato de interesse: ${data.formato}`,
      data.data ? `Data prevista: ${data.data}` : null,
      data.mensagem ? `\nMensagem:\n${data.mensagem}` : null,
    ].filter(Boolean);
    return lines.join("\n");
  };

  const sendWhats = (data: FormData) => {
    window.open(buildWhatsappUrl(compose(data)), "_blank", "noopener,noreferrer");
  };
  const sendMail = (data: FormData) => {
    window.location.href = buildMailtoUrl(`Contato pelo site — ${data.nome}`, compose(data));
  };

  return (
    <form className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <Label htmlFor="b-nome">Nome</Label>
        <Input id="b-nome" {...form.register("nome")} className="mt-1.5" />
        {form.formState.errors.nome && <p className="text-xs text-destructive mt-1">{form.formState.errors.nome.message}</p>}
      </div>
      <div>
        <Label htmlFor="b-entidade">Entidade ou empresa</Label>
        <Input id="b-entidade" {...form.register("entidade")} className="mt-1.5" />
        {form.formState.errors.entidade && <p className="text-xs text-destructive mt-1">{form.formState.errors.entidade.message}</p>}
      </div>
      <div>
        <Label htmlFor="b-cargo">Cargo</Label>
        <Input id="b-cargo" {...form.register("cargo")} className="mt-1.5" placeholder="Opcional" />
      </div>
      <div>
        <Label htmlFor="b-email">Email</Label>
        <Input id="b-email" type="email" {...form.register("email")} className="mt-1.5" />
        {form.formState.errors.email && <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="b-telefone">WhatsApp</Label>
        <Input id="b-telefone" {...form.register("telefone")} className="mt-1.5" placeholder="(47) 99999-0000" />
        {form.formState.errors.telefone && <p className="text-xs text-destructive mt-1">{form.formState.errors.telefone.message}</p>}
      </div>
      <div>
        <Label>Formato de interesse</Label>
        <Select value={form.watch("formato")} onValueChange={(v) => form.setValue("formato", v as FormData["formato"])}>
          <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Palestra">Palestra</SelectItem>
            <SelectItem value="Workshop">Workshop</SelectItem>
            <SelectItem value="In-company">In-company</SelectItem>
            <SelectItem value="Outro">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="b-data">Data prevista</Label>
        <Input id="b-data" {...form.register("data")} className="mt-1.5" placeholder="Ex.: março/2027" />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="b-mensagem">Mensagem</Label>
        <Textarea id="b-mensagem" {...form.register("mensagem")} className="mt-1.5 min-h-28" placeholder="Conte um pouco do contexto: público, momento, objetivo..." />
      </div>
      <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
        <Button type="button" size="lg" className="gap-2 flex-1" onClick={form.handleSubmit(sendWhats)}>
          <MessageCircle className="h-4 w-4" /> Enviar via WhatsApp
        </Button>
        <Button type="button" size="lg" variant="outline" className="gap-2 flex-1" onClick={form.handleSubmit(sendMail)}>
          <Mail className="h-4 w-4" /> Enviar por email
        </Button>
      </div>
    </form>
  );
}
