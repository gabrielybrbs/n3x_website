# Plano de implementação

Status: **aguardando aprovação**. Baseado em [auditoria.md](auditoria.md) e [decisoes.md](decisoes.md).

## Princípios

- A identidade oficial é a referência. Não haverá estilo paralelo, e os tokens vêm de `n3x-tokens.css` sem alteração.
- Profissionalismo e clareza vêm antes de efeito visual.
- Nenhum dado institucional inventado além dos dados de demonstração autorizados em `decisoes.md`, todos marcados com `data-demo`.
- Código organizado e sem duplicação desnecessária. Onde a repetição entre páginas for inevitável (HTML puro), ela segue as regras abaixo.

## Estrutura de pastas

```
/
├── public/                          ← única pasta publicada (outputDirectory na Vercel)
│   ├── index.html                   Início
│   ├── servicos.html                /servicos
│   ├── sobre.html                   /sobre
│   ├── contato.html                 /contato
│   ├── privacidade.html             /privacidade
│   ├── 404.html
│   ├── robots.txt · sitemap.xml · site.webmanifest
│   ├── css/
│   │   ├── tokens.css               cópia fiel de brand/n3x-identidade/site/n3x-tokens.css
│   │   ├── theme.css                mapeamento semântico dos tokens para os temas escuro e claro
│   │   ├── fonts.css                @font-face das fontes locais
│   │   ├── base.css                 reset, tipografia, foco, utilitários
│   │   ├── components.css           header, footer, botões, cards, ícones, barra WhatsApp, grafismo
│   │   └── pages.css                ajustes específicos de cada página
│   ├── js/main.js                   menu, tema, seção ativa, entrada suave
│   └── assets/
│       ├── logo/                    SVGs oficiais para fundo escuro e claro (principal e secundário)
│       ├── simbolo/                 símbolo para fundo escuro e claro
│       ├── favicon/                 favicon.svg + PNG 16/32/48/180/192/512
│       ├── fonts/                   Archivo, IBM Plex Sans, IBM Plex Mono (woff2, subset latino)
│       ├── icons/sprite.svg         ícones oficiais + complementos Lucide no mesmo padrão
│       ├── clientes/                logos dos clientes (vazio por enquanto)
│       ├── og/n3x-og.png            imagem de compartilhamento 1200×630
│       └── brand/n3x-assinatura-logo.png
├── brand/                           ← não publicado
│   ├── n3x-identidade/              manual, kit, PDFs, redes sociais (movido de assets/)
│   └── legado/                      wordmark, ícones e arquivos de source/ antigos
├── docs/                            esta documentação
├── vercel.json
└── README.md
```

Os arquivos antigos na raiz (`index.html`, `styles.css`, `script.js`) são substituídos pelos de `public/`.

### Blocos repetidos entre páginas (HTML puro)

Cabeçalho, rodapé, barra do WhatsApp e `<head>` se repetem nas 6 páginas. Regras para a manutenção continuar segura:

- Cada bloco é delimitado por comentários `<!-- ▼ BLOCO: header -->` / `<!-- ▲ BLOCO: header -->`, com conteúdo idêntico em todas as páginas.
- O README terá uma seção "Blocos compartilhados" com o procedimento de edição e um comando `rg` para conferir se todas as páginas ficaram iguais.
- Os ícones ficam num único `sprite.svg`, referenciado com `<use>`, sem SVG repetido em cada página.
- Todo o CSS e o JS são compartilhados; não há estilo inline.

## Páginas

| Página | Conteúdo |
| --- | --- |
| **Início** | **Hero:** rótulo "Software & Infraestrutura", H1 do kit "Código, infraestrutura e *observabilidade*.", subtítulo "Três pilares, uma só operação. Da primeira linha de código ao alerta de madrugada.", botões **Fale com a gente** (WhatsApp) e **Ver serviços**, grafismo diagonal.<br>**Destaques** `data-demo`: SLA 99,9% · monitoramento 24/7 · diagnóstico gratuito.<br>**Serviços:** 3 cards do kit com link para /servicos.<br>**Como trabalhamos:** 01 Robustez em produção · 02 Visibilidade total · 03 Entrega de ponta a ponta. Os textos atuais foram refinados, sem "time pequeno".<br>**Clientes:** oculto até haver logos.<br>**O nome N3X:** bloco N · 3 · X com textos do manual.<br>**Faixa de chamada:** "Diagnóstico gratuito da sua infraestrutura" + botão WhatsApp. |
| **Serviços** | Introdução. Um bloco por pilar com descrição, os 3 itens do kit e exemplos de entrega; Monitoramento inclui o painel ilustrativo `data-demo`. Seção "Como funciona" (conversa → diagnóstico → proposta → entrega → acompanhamento) e chamada final. |
| **Sobre** | Quem é a N3X (posicionamento de empresa estabelecida), o conceito N · 3 · X, como trabalhamos, "Sediada em Macapá-AP, atendemos todo o Brasil", clientes (oculto) e chamada. |
| **Contato** | WhatsApp em destaque, com número visível e botão; Instagram; redes futuras ocultas; região de atuação; nota curta sobre privacidade com link. |
| **Privacidade** | Política LGPD conforme `decisoes.md`, com data de atualização. |
| **404** | Mensagem curta, busca de caminho pelo menu e botão para o Início. |

Os textos novos que eu redigir, como descrições da página Serviços, a página Sobre e a política, serão entregues para revisão da N3X no fim da implementação, listados no resumo final.

## Componentes

| Componente | Especificação |
| --- | --- |
| Cabeçalho | Fixo no topo. Logo secundário (sem slogan, versão conforme o tema), navegação Início · Serviços · Sobre · Contato, botão de tema e botão **Fale conosco** (primário). Página atual marcada com `aria-current="page"`. |
| Menu mobile | Abaixo de 900 px. Botão com 44 px, `aria-controls`, `aria-expanded` e label "Abrir/Fechar menu". Fecha com Esc, com clique fora e ao navegar. |
| Barra WhatsApp mobile | Fixa no rodapé da tela abaixo de 900 px, com área segura do iOS (`env(safe-area-inset-bottom)`). O conteúdo da página ganha espaço inferior para não ficar coberto. |
| Botões | Primário ciano com texto grafite no escuro; azul com texto branco no claro. Secundário em contorno; link de texto com seta. Raio de 4 px. Estados de hover, foco e desativado conforme o kit. |
| Card de serviço | Painel com raio de 8 px e borda `--linha`, ícone ciano, título, frase e lista de 3 itens. Hover: borda mais forte, sem deslocamento grande. |
| Grafismo diagonal | SVG com 1 faixa larga e até 2 finas no ângulo do X, degradê oficial, saindo pela borda direita, sobre listras com no máximo 8% de opacidade. Decorativo (`aria-hidden`). |
| Bloco conceito N · 3 · X | Grade de 3 colunas com divisória de 1 px; o "3" em ciano, como no manual. |
| Destaque / métrica | Número em Plex Mono ou Archivo, rótulo em mono caixa alta e atributo `data-demo`. |
| Clientes | Faixa de logos em monocromático. A seção tem `hidden` enquanto a lista estiver vazia. |
| Redes sociais | Lista de links. Cada rede futura já existe no HTML com `hidden`; para ativar, basta preencher o `href` e remover `hidden`. |
| Rodapé | Logo principal, frase do kit ("Desenvolvimento, infraestrutura e monitoramento em uma só entrega."), colunas Serviços · Empresa · Contato, "Macapá-AP · Atendimento em todo o Brasil", link de privacidade e "© 2026 N3X Software & Infraestrutura". |

## Temas claro e escuro

- `theme.css` define variáveis semânticas (`--cor-fundo`, `--cor-texto`, `--cor-acao`...) a partir dos tokens oficiais, uma vez para `[data-theme="dark"]` e outra para `[data-theme="light"]`.
- **Escuro:** fundo grafite, painel `#1A2030`, texto névoa, secundário `#A7B1C8`, ação ciano.
- **Claro:** fundo branco e névoa, texto marinho, secundário aço, ação azul. Ciano nunca como texto.
- Um script mínimo no `<head>` aplica o tema antes da renderização, evitando o piscar. A ordem de prioridade é: escolha salva, depois preferência do sistema, depois escuro.
- Logos e símbolo trocam entre as versões de fundo escuro e de fundo claro.

## Movimento

- Entrada suave (opacidade e 12 px de deslocamento, uma única vez), ativada só com JS e sem `prefers-reduced-motion`.
- Hover com transições de 150–200 ms em cor e borda.
- Sem animações infinitas, parallax, inclinação, glow ou `backdrop-filter`.

## Acessibilidade

- Skip link "Pular para o conteúdo" e foco visível com `--n3x-foco` nos dois temas.
- Contraste AA verificado nos dois temas; nenhum texto abaixo de 12 px; alvos de toque com pelo menos 44 px.
- Hierarquia de títulos correta por página (um `h1`), `aria-current` e `alt` nos logos.

## SEO e compartilhamento

- `<title>` e `meta description` por página, em pt-BR, e `link rel="canonical"` para `https://n3x.com.br/...`.
- Open Graph e Twitter Card com `assets/og/n3x-og.png`, gerada a partir do grafismo oficial.
- JSON-LD `Organization` / `ProfessionalService`: nome, URL, logo, `areaServed: BR`, endereço de Macapá-AP, `contactPoint` com o WhatsApp e `sameAs` com o Instagram.
- `sitemap.xml`, `robots.txt` e `site.webmanifest`.

## Vercel (`vercel.json`)

- `outputDirectory: "public"` e `cleanUrls: true`, para `/servicos` em vez de `/servicos.html`.
- Cabeçalhos de segurança: `Content-Security-Policy` restrita ao próprio domínio, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Cache: assets com cache longo; HTML sem cache agressivo. Os arquivos CSS e JS levam versão no nome da query (`?v=`), documentada no README.

## Clientes

Para ativar quando os logos chegarem:

1. Salvar cada logo em `public/assets/clientes/` (SVG de preferência; PNG transparente com no mínimo 320 px de largura), com nome no formato `cliente-nome.svg`.
2. Adicionar um item na lista `.clientes` das páginas Início e Sobre.
3. Remover `hidden` da seção.

O procedimento completo estará no README.

## Ordem de execução

1. **Reorganização:** mover `assets/n3x-identidade` para `brand/n3x-identidade` e os assets antigos para `brand/legado`; criar `public/` e `vercel.json`.
2. **Fundação:** fontes locais, `tokens.css`, `theme.css`, `base.css`, favicons e logos.
3. **Componentes:** cabeçalho, menu, tema, botões, cards, grafismo, rodapé, barra do WhatsApp e sprite de ícones.
4. **Início** completo.
5. **Serviços, Sobre, Contato, Privacidade e 404.**
6. **SEO:** metadados, JSON-LD, sitemap, robots, manifest e imagem OG.
7. **JS final:** seção ativa e entrada suave.
8. **Verificação:** blocos idênticos entre páginas, links internos, `data-demo` inventariado, contraste nos dois temas, navegação por teclado, larguras de 360, 768, 1024 e 1440 px e movimento reduzido. Pontos visuais que não puderem ser conferidos automaticamente serão listados para conferência no navegador.
9. **Documentação:** novo README (estrutura, como editar blocos, adicionar cliente ou rede, trocar dados de demonstração, publicar na Vercel) e atualização do status deste plano.
10. **Commits por etapa**, com mensagens descritivas.

## Fora do escopo desta versão

Formulário de contato, e-mail, seção de equipe, cases detalhados, analytics, blog e páginas em outros idiomas.
