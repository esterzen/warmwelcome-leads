
## Objetivo

Landing page única (single-page) em português-BR, direção visual **C · Cinematográfico Escuro**, para lead frio contratar palestras e workshops da Ester Zen. Inclui **quiz interativo "Sua equipe te segue — ou te obedece?"** com captura de nome, telefone e email antes de mostrar o resultado.

## Estrutura da página (ordem de scroll)

1. **Hero cinematográfico** — Fundo grafite/quase-preto, foto grande da Ester (IMG_0483 ou IMG_0496) com tratamento cinemático, headline serifada display: *"Obedecido × Seguido"*, subhead e 2 CTAs: **Fazer o teste** (abre modal do quiz) + **Falar no WhatsApp**.
2. **Prova de autoridade** — Faixa horizontal: 20 anos em gestão comercial · Credenciada SEBRAE (SC/PR/SP/RJ) · SESCOOP.
3. **Manifesto/Promessa** — Bloco tipográfico grande com a tensão OBEDECIDO × SEGUIDO e o custo invisível de ser só obedecido.
4. **Chamada para o quiz (banner destacado)** — *"7 perguntas. 2 minutos. Descubra se sua equipe te segue ou só te obedece."* → botão abre modal.
5. **Produto principal — comparativo lado-a-lado**
   - Card A: **Palestra "O líder que a equipe segue"** (50–60 min, plateia aberta, promessa, sobre o que se fala, público, CTA WhatsApp).
   - Card B: **Workshop "Como se tornar o líder que a equipe segue"** (3–4h, 5 etapas, Plano de Conduta como entregável, apoio à NR-1, CTA WhatsApp).
6. **Bastidores** — Galeria com 4–6 fotos das palestras (imagens enviadas), tratamento escuro.
7. **Outros programas** — 3 cards: Vendas · Atendimento & Experiência · Marca & Mulheres Empreendedoras.
8. **Para quem é** — Bloco de qualificação rápida (entidades / empresas / líderes).
9. **Formulário de briefing** — Nome, entidade/empresa, cargo, formato (Palestra/Workshop/In-company/Outro), data prevista, mensagem. Dois botões: **Enviar via WhatsApp** e **Enviar por email**.
10. **FAQ curto** — 4–5 perguntas (deslocamento, formatos, turmas, NR-1, prazo).
11. **Rodapé** — WhatsApp (47) 99254-3200 · contato@esterzen.com · @esterzen · @aesterzen.
12. **FAB WhatsApp** — Botão verde flutuante, sempre visível.

## Quiz "Sua equipe te segue — ou te obedece?" (modal)

Fluxo em 3 etapas dentro de um `<Dialog>` full-screen em mobile:

**Etapa 1 · Intro (1 tela)**
- Título, tempo estimado ("2 minutos · 7 perguntas"), instrução ("responda com o que sua equipe FAZ hoje").
- Botão **Começar**.

**Etapa 2 · Perguntas (7 telas, uma por vez)**
- Barra de progresso 1/7 … 7/7.
- Enunciado + 2 cartões grandes A / B (textos exatos do PDF).
- Auto-avança ao clicar. Botão "voltar" disponível.
- Estado do quiz mantido em memória.

**Etapa 3 · Captura de lead (obrigatória antes do resultado)**
- Título: *"Falta um passo para ver seu resultado"*.
- Campos: **Nome** (obrigatório), **Email** (obrigatório, formato válido), **WhatsApp** (obrigatório, máscara BR), **Empresa** (opcional), consent LGPD ("Autorizo receber o resultado e conteúdos da Ester Zen").
- Validação com **zod + react-hook-form**.
- Botão **Ver meu resultado**.

**Etapa 4 · Resultado personalizado**
- Contagem A/B computada.
- 3 resultados possíveis (textos exatos do PDF): **Obedecido** (5+ A) · **Zona de transição** (misto) · **Seguido** (5+ B).
- Cada resultado com CTA contextual:
  - Obedecido → *"O workshop foi feito para esse padrão. Falar sobre o workshop"* → WhatsApp com mensagem pré-preenchida indicando resultado.
  - Transição → *"Vamos mapear onde trava. Falar com a Ester"* → WhatsApp.
  - Seguido → *"Traga isso para a sua equipe/entidade. Ver formatos"* → scroll para comparativo.
- Botão secundário: **Receber resultado detalhado por email** (dispara mailto com resumo).

**Como o lead é capturado (sem backend próprio):**
Como não vamos habilitar Lovable Cloud, o envio dos dados usa **dois caminhos simultâneos** no submit:
1. Abre `wa.me/5547992543200` com mensagem pré-preenchida contendo nome, email, telefone, empresa, contagem A/B e resultado (a Ester recebe o lead no WhatsApp dela).
2. Dispara `mailto:contato@esterzen.com` com o mesmo conteúdo estruturado como fallback.

Se preferir armazenar leads em banco (recomendado para não depender do WhatsApp abrir), me avise que eu habilito Lovable Cloud e crio a tabela `quiz_leads` com RLS e uma tela simples de exportação — **isso não está incluído neste plano**, é uma opção pós-aprovação.

**Gatilhos do modal:**
- Botão "Fazer o teste" no hero.
- Banner dedicado no meio da página.
- Exit-intent (mouse saindo pelo topo em desktop) + 30s de permanência em mobile — só dispara **uma vez por sessão** (flag em `sessionStorage`).

## Direção visual C · Cinematográfico Escuro

- **Paleta (oklch em `src/styles.css`):** fundo grafite quase-preto `#0a0a0b`, superfície `#141416`, texto off-white `#f5f1e8`, acento bege quente `#c9a878`, borda sutil `#2a2a2d`.
- **Tipografia:** Fraunces (display serifada) para headlines + Inter para corpo, carregadas via `<link>` no `__root.tsx` (Google Fonts).
- **Fotos:** grão sutil, vinheta, overlay escuro para legibilidade. Fotos das palestras enviadas via `lovable-assets` (não commitar binários).
- **Motion:** fades suaves on-scroll, headline com reveal por linha, hover discreto nos cards.
- **Tokens shadcn:** remapeados no `@theme inline` do `src/styles.css` para dark permanente (sem toggle).

## Arquivos e componentes

- `src/routes/index.tsx` — substitui placeholder, monta head() completo (title, description, og:title/description/type, twitter:card, og:image apontando para foto hero via URL absoluta do CDN de assets).
- `src/components/landing/` — `Hero.tsx`, `Authority.tsx`, `Manifesto.tsx`, `QuizBanner.tsx`, `ProgramCompare.tsx`, `Gallery.tsx`, `ProgramsGrid.tsx`, `ForWhom.tsx`, `BriefingForm.tsx`, `Faq.tsx`, `Footer.tsx`, `WhatsappFab.tsx`.
- `src/components/quiz/` — `QuizDialog.tsx` (state machine intro→questions→lead→result), `quiz-data.ts` (7 perguntas e 3 resultados), `LeadForm.tsx`, `ResultCard.tsx`.
- `src/lib/contact.ts` — helpers `buildWhatsappUrl(message)` e `buildMailtoUrl(subject, body)` com `encodeURIComponent`.
- `src/styles.css` — atualiza tokens oklch para paleta cinemática, mapeia via `@theme inline`, adiciona `--font-display` e `--font-body`.
- `src/routes/__root.tsx` — adiciona `<link>` das fontes, atualiza meta padrão (title/description da marca Ester Zen).
- Assets via CLI `lovable-assets` a partir de `/mnt/user-uploads/IMG_04*.jpg` para hero e galeria.

## Validação e segurança do formulário

- **zod** para schemas do formulário de briefing e do lead form do quiz (nome ≤100, email válido ≤255, telefone regex BR 10–15 dígitos, mensagem ≤1000, consent boolean).
- Sanitização com `encodeURIComponent` antes de compor URLs WhatsApp/mailto.
- Sem `dangerouslySetInnerHTML`. Sem log de dados sensíveis no console.

## SEO

- Title: *"Ester Zen — O líder que a equipe segue | Palestras & Workshops de Liderança"*.
- Description: *"Palestras e workshops de liderança comportamental para entidades e empresas. Faça o teste: sua equipe te segue ou só te obedece?"* (< 160).
- og:image e twitter:image apontando para a foto hero (URL absoluta).
- H1 único no hero. Alt em todas as imagens. Lazy loading nas fotos abaixo da dobra.

## O que fica fora deste plano (podemos fazer depois)

- Persistência dos leads em banco (Lovable Cloud + tabela `quiz_leads`).
- Envio automatizado do resultado por email (Resend via server function).
- Painel para a Ester ver leads capturados.

Se quiser qualquer um desses três, me diz depois de aprovar este plano que eu já emendo.
