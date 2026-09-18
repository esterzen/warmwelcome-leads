CREATE TABLE public.diagnostico_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  nome text NOT NULL,
  negocio text NOT NULL,
  whatsapp text NOT NULL,
  instagram text,
  consentimento boolean NOT NULL DEFAULT false,
  respostas jsonb NOT NULL DEFAULT '[]'::jsonb,
  pontuacao_etapas jsonb NOT NULL DEFAULT '[]'::jsonb,
  total integer,
  faixa text,
  origem text
);
GRANT INSERT, UPDATE ON public.diagnostico_leads TO anon, authenticated;
GRANT ALL ON public.diagnostico_leads TO service_role;
ALTER TABLE public.diagnostico_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Qualquer um pode enviar seus dados" ON public.diagnostico_leads FOR INSERT TO anon, authenticated WITH CHECK (consentimento = true);
CREATE POLICY "Qualquer um pode completar o proprio registro" ON public.diagnostico_leads FOR UPDATE TO anon, authenticated USING (created_at > now() - interval '2 hours') WITH CHECK (created_at > now() - interval '2 hours');