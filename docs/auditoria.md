# Auditoria do site (antes da reformulação)

Data: 26/09/2026 · Base: commit `48f383b` (`index.html`, `styles.css`, `script.js`, `README.md`) comparado com o manual da marca e o kit digital v1.0.

Classificação: 🔴 Crítico · 🟠 Importante · 🟡 Melhoria · 🟢 Opcional

## Diagnóstico geral

O site era tecnicamente bem feito: estático, leve, sem dependências, semântico e com suporte a movimento reduzido. Porém seguia outra identidade:

- logo, cores, fontes, slogan (em inglês), ícones, formas e grafismo diferentes do manual;
- estética de "startup tech" genérica (glow, órbitas, pulsos, fundo roxo, inclinação 3D, pílulas), que enfraquece a percepção de profissionalismo;
- hero sem CTA e dados de contato fictícios visíveis ("placeholder" no rodapé).

## Problemas

### 🔴 Críticos
- **C1. Logo antigo.** `assets/brand/n3x-wordmark-transparent.png` tem outro desenho: o "3" é quadrado e o braço do X é diferente. O SVG oficial não era usado.
- **C2. Slogan.** Aparecia "Software & Infrastructure", em inglês e escrito com fonte. O manual define "Software & Infraestrutura" e proíbe trocar a fonte ou reposicionar o slogan.
- **C3. Placeholders visíveis.** Telefone `99999-9999`, domínio `n3x.dev` e a etiqueta amarela "placeholder".
- **C4. Hero sem CTA.** O único contato era um `mailto:` no fim da página.
- **C5. Favicons antigos.** O pacote novo inclui SVG e PNGs de 16 a 512 px.

### 🟠 Importantes
- **I1. Paleta divergente.** `#00D4FF`, `#2563EB`, `#8B5CF6` e `#0A0F1C` no lugar de `#2FC4E4`, `#3F63D9`, `#7E62E0` e `#161B28`. O roxo tinha o mesmo peso do azul e do ciano; no manual, o lilás é só um toque.
- **I2. Tipografia.** Space Grotesk, Inter e JetBrains Mono no lugar de Archivo (largura 112%), IBM Plex Sans e IBM Plex Mono. O corpo tinha 16 px; o token pede 17 px.
- **I3. Grafismo do hero.** Malha e circuito com glow. O grafismo oficial são cortes diagonais a cerca de 54° saindo pela borda, sobre listras com no máximo 8% de opacidade.
- **I4. Excesso de movimento.** 7 animações infinitas, parallax, inclinação 3D e luz que segue o cursor.
- **I5. Formas.** Raios de 8, 14 e 24 px e botões em pílula. A marca usa 4, 8 e 14 px.
- **I6. Ícones.** Traço de 1,6 px arredondado, com uma cor por pilar. O padrão é traço de 1,75 px, pontas e cantos retos, ciano sobre escuro.
- **I7. Ordem do conteúdo.** "O que significa N3X" vinha antes dos serviços.
- **I8. Prova e confiança.** Não havia clientes, localização, redes sociais nem canal direto.
- **I9. Acessibilidade.** Sem `:focus-visible` e sem skip link. `--text-muted` tinha contraste de 2,99 a 3,22:1 em textos de 10,5 a 11,5 px. O slogan chegava a 7,5 px no mobile.
- **I10. SEO.** Sem Open Graph, canonical, dados estruturados, robots e sitemap; o título estava em inglês.

### 🟡 Melhorias
- **M1.** Textos dos pilares e do conceito N/3/X divergiam do manual e do kit.
- **M2.** Frases genéricas ("Soluções que impulsionam o futuro") e tagline redundante no hero.
- **M3.** O menu mobile não fechava com Esc nem com clique fora, não tinha `aria-controls` e o botão tinha 40 px.
- **M4.** `background-attachment: fixed`, `backdrop-filter` e filtros SVG animados pesam no mobile; o logo era PNG em vez de SVG.
- **M5.** CSS desorganizado: blocos duplicados, cores fixas no código, cores por `nth-child`, tokens com nomes fora do padrão oficial.
- **M6.** README desatualizado.

### 🟢 Opcionais
- **O1.** 16 MB em `assets/`, incluindo PDFs e artes originais, que não deveriam ser publicados.
- **O2.** O logo da assinatura de e-mail precisa estar publicado em `/assets/brand/n3x-assinatura-logo.png`.
- **O3.** Faltavam página 404 e `manifest.webmanifest`.

## Contraste medido (WCAG)

| Combinação | Razão |
| --- | --- |
| Antigo `--text-muted` sobre fundo | 3,22 ❌ |
| Antigo `--text-muted` sobre painel | 2,99 ❌ |
| Novo texto-2 `#A7B1C8` sobre grafite | 7,99 ✅ |
| Novo texto-3 `#6F7A94` sobre grafite | 4,00 (só texto ≥ 18 px ou negrito ≥ 14 px) |
| Ciano sobre grafite, ou grafite sobre ciano (botão) | 8,30 ✅ |
| Azul `#3F63D9` sobre grafite | 3,27 ❌ para texto; usar só em grafismos |
| Azul sobre branco | 5,25 ✅ |
| Aço `#5B6680` sobre branco | 5,74 ✅ |

## O que foi preservado
- Stack estática, HTML semântico e suporte a movimento reduzido.
- Os 3 pilares e o conceito N/3/X.
- O padrão de rótulo em mono caixa alta e a grade com divisórias de 1 px.
- A largura máxima de 1180 px.
- Parte dos textos de "Como atuamos".

## Identidade antiga × nova

| Aspecto | Antiga | Nova |
| --- | --- | --- |
| Logo | Wordmark PNG + slogan em HTML | SVG oficial: secundário no cabeçalho, principal no rodapé |
| Fundo | `#0A0F1C` + brilhos radiais | Grafite `#161B28` / `#0F131D`, painel `#1A2030` |
| Cores | Azul, ciano e roxo com o mesmo peso | Ciano dominante, azul como profundidade, lilás como toque |
| Fontes | Space Grotesk, Inter, JetBrains Mono | Archivo 112%, IBM Plex Sans, IBM Plex Mono |
| Grafismo | Malha, órbitas, glow | Cortes diagonais a 54° + listras ≤ 8% |
| Ícones | 1,6 px, arredondados, 3 cores | 1,75 px, retos, ciano (azul no claro) |
| Raios | 8/14/24 px + pílulas | 4/8/14 px |
| Botão | Pílula com gradiente | Ciano sólido no escuro, azul no claro |
| Efeitos | Glow, blur, sombras coloridas | Uma sombra neutra, sem brilho |
