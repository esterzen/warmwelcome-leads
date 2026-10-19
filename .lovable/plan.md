# Apresentação legível no celular

## Problema
No celular em pé, a apresentação é um "telão" encolhido: o slide ocupa uma faixa pequena no meio da tela, o texto fica minúsculo e sobra preto em cima e embaixo.

## O que muda
Quando a tela estiver em pé (celular), a apresentação passa a ter **versão vertical própria**, como um story:
- Slide ocupa a tela inteira, em formato vertical.
- Textos grandes e legíveis; cards empilhados um embaixo do outro em vez de lado a lado.
- Tabela "Usar IA vs. ter IA" vira cartões de comparação (prompt x estrutura) por linha.
- Slides com o celular da Oh My Bread: título em cima, vídeo grande embaixo.
- Slides com 4 itens (encontros, perguntas) ficam mais enxutos; se não couber, rolam dentro do slide.
- Navegação: deslizar para os lados (já existe) + toque nas laterais; barra de controles menor e sem cobrir o conteúdo.
- Botão de tela cheia some no iPhone (não funciona no Safari).

No computador, iPad deitado e telão, nada muda.

## Detalhes técnicos
- Em `ia-que-resolve_.apresentacao.tsx`, detectar orientação (`innerWidth < innerHeight`) e usar canvas 1080x1920 em vez de 1920x1080, com o mesmo cálculo de escala.
- `Frame` recebe `portrait` (via contexto) e ajusta paddings; grids `grid-cols-2/3/4` trocam para 1 coluna em portrait; layouts lado a lado com `BigPhone` viram coluna.
- Tabela comparativa: renderização alternativa em cards quando portrait.
- Tokens `--slide-*` com valores próprios numa classe `.slide-portrait` em `styles.css` (título ~96px, corpo ~40px no canvas 1080 de largura).
- Controles com `safe-area-inset-bottom`; esconder tela cheia quando `requestFullscreen` não existir.
- Validar com Playwright em 390x844 percorrendo os 17 slides com screenshots.
