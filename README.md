# N3X | Landing Page

Landing page institucional da N3X, construída com HTML, CSS e JavaScript puros. O projeto não exige compilação, framework ou gerenciador de pacotes: basta servir os arquivos por um servidor HTTP estático.

## Visão geral

A página apresenta os serviços e o posicionamento da N3X em uma interface escura inspirada na identidade visual da marca. O conteúdo está organizado em três pilares: desenvolvimento, infraestrutura e monitoramento.

Principais características:

- layout responsivo para desktop, tablet e celular;
- identidade visual baseada em azul, ciano e roxo;
- logo oficial extraído do material de marca;
- favicon otimizado para 16, 32 e 192 pixels;
- menu móvel sem dependências;
- animações de entrada durante a rolagem;
- navegação com indicação da seção ativa;
- cards com profundidade e iluminação responsivas ao cursor;
- movimento ambiente no hero;
- suporte a usuários que preferem movimento reduzido.

## Estrutura de arquivos

```text
.
├── index.html
├── script.js
├── styles.css
├── README.md
└── assets/
    ├── brand/
    │   ├── n3x-symbol.png
    │   └── n3x-wordmark-transparent.png
    ├── icons/
    │   ├── favicon-16.png
    │   ├── favicon-32.png
    │   └── favicon-192.png
    └── source/
        ├── favicon-square.png
        ├── n3x-logo-transparent.png
        ├── n3x-logo.png
        ├── n3x.png
        └── n3x_ind.png
```

### Arquivos principais

| Arquivo      | Responsabilidade                                             |
| ------------ | ------------------------------------------------------------ |
| `index.html` | Conteúdo, estrutura semântica e SVG decorativo.              |
| `styles.css` | Tokens visuais, layout, responsividade, estados e animações. |
| `script.js`  | Menu móvel, observadores e interações de cursor e rolagem.   |
| `README.md`  | Documentação de uso e manutenção.                            |

### Assets

| Asset | Uso | Publicação |
| --- | --- | --- |
| `assets/brand/n3x-wordmark-transparent.png` | Wordmark “N3X” usado no cabeçalho e rodapé, combinado com uma assinatura em texto HTML. | Necessário |
| `assets/brand/n3x-symbol.png` | Símbolo “X” em alta resolução e arquivo-mestre dos favicons atuais. | Opcional |
| `assets/icons/favicon-16.png` | Favicon para abas e contextos de 16 px. | Necessário |
| `assets/icons/favicon-32.png` | Favicon principal dos navegadores. | Necessário |
| `assets/icons/favicon-192.png` | Ícone para atalhos e dispositivos móveis. | Necessário |
| `assets/source/n3x.png` | Painel original de identidade visual. | Não necessário |
| `assets/source/n3x_ind.png` | Segundo painel original de identidade visual. | Não necessário |
| `assets/source/n3x-logo-transparent.png` | Recorte anterior com logo e assinatura rasterizada. | Não necessário |
| `assets/source/n3x-logo.png` | Recorte intermediário do logo com fundo opaco. | Não necessário |
| `assets/source/favicon-square.png` | Alternativa quadrada descartada porque o lettering perde legibilidade em tamanhos pequenos. | Não necessário |

### Convenção da pasta `assets`

- `brand/`: arquivos finais ou mestres da marca;
- `icons/`: ícones efetivamente referenciados pelo HTML;
- `source/`: artes originais, recortes intermediários e alternativas mantidas para futuras edições.

Novos arquivos devem ser colocados de acordo com sua função. Evite adicionar imagens diretamente na raiz do projeto ou na raiz de `assets/`.

## Como executar localmente

Não abra necessariamente o arquivo apenas com `file://`, pois um servidor local reproduz melhor o ambiente de publicação.

Com Python:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`. Também é possível usar qualquer servidor estático, como a extensão Live Server do VS Code.

## Estrutura da página

### Cabeçalho

O cabeçalho permanece fixo no topo e contém:

- logo com retorno ao início;
- links para as principais seções;
- destaque automático do link correspondente à seção visível;
- botão de menu em telas com largura inferior a `820px`.

### Hero

A abertura comunica a proposta central da N3X e apresenta um SVG animado em forma de malha/X. O desenho combina grade pontilhada, órbitas, circuitos externos, sinais em movimento, núcleo pulsante e um X central com gradiente e brilho. O conjunto também se desloca sutilmente de acordo com o cursor em dispositivos com mouse.

O SVG é decorativo e usa `aria-hidden="true"` para não gerar ruído em leitores de tela.

### O que significa N3X

Seção `#significado`, estruturada a partir do nome da empresa:

- **N:** Network;
- **3:** três pilares;
- **X:** execução.

Os três blocos possuem realce visual ao passar o cursor.

### Pilares

Seção `#pilares`, composta por Desenvolvimento, Infraestrutura e Monitoramento. Em dispositivos com cursor preciso, os cards recebem uma inclinação leve e um brilho radial que acompanha o ponteiro. Em telas touch, esse comportamento não é ativado.

### Como atuamos

Seção `#compromisso` com três princípios institucionais: robustez em produção, visibilidade/observabilidade e proximidade com o cliente.

Esse conteúdo foi redigido para a landing page e deve ser validado antes da publicação oficial.

### CTA e rodapé

O CTA conduz ao contato por e-mail. O rodapé repete a navegação, exibe os contatos e contém a assinatura institucional.

## Identidade visual

### Cores

Os tokens ficam no início de `styles.css`, dentro de `:root`:

```css
--bg-deep: #0a0f1c;
--bg-panel: #111827;
--bg-panel-2: #151d2e;
--blue: #2563eb;
--cyan: #00d4ff;
--purple: #8b5cf6;
--text-primary: #f3f5f9;
--text-secondary: #94a3b8;
--text-muted: #5b6478;
```

Para alterar a paleta global, prefira modificar esses tokens em vez de substituir cores isoladamente pelo arquivo.

### Tipografia

As fontes são carregadas pelo Google Fonts:

| Uso                     | Fonte          |
| ----------------------- | -------------- |
| Títulos                 | Space Grotesk  |
| Corpo                   | Inter          |
| Labels, números e dados | JetBrains Mono |

As famílias também são centralizadas em `:root` por meio de `--font-display`, `--font-body` e `--font-mono`. Se o Google Fonts não estiver acessível, o navegador utiliza os fallbacks genéricos definidos no CSS.

## Animações e interações

O JavaScript está separado em `script.js`, carregado no final de `index.html`, e não depende de bibliotecas externas.

### Menu móvel

O botão alterna a classe `.open` na navegação e mantém `aria-expanded` sincronizado. Ao selecionar um link, o menu fecha automaticamente.

### Entrada na rolagem

Um `IntersectionObserver` adiciona `.is-visible` aos elementos quando entram na área visível. Títulos, textos introdutórios, blocos N3X, cards, princípios e CTA são observados. O atraso escalonado é controlado pela variável CSS `--reveal-delay`.

### Efeito dos cards

Eventos `pointermove` calculam a posição relativa do cursor e atualizam `--pointer-x`, `--pointer-y`, a rotação em perspectiva e a elevação do card. O efeito só é habilitado quando `(pointer: fine)` corresponde ao dispositivo.

### Seção ativa

Outro `IntersectionObserver` acompanha as seções com `id` e aplica `.active` ao link correto da navegação.

### Movimento reduzido

O projeto respeita `prefers-reduced-motion: reduce` em dois níveis:

- o CSS reduz ou desativa animações e transições;
- o JavaScript não inicializa parallax, inclinação ou entrada animada.

Ao criar novas animações, mantenha essa proteção.

## Responsividade

| Largura           | Comportamento                                                       |
| ----------------- | ------------------------------------------------------------------- |
| Abaixo de `900px` | Cards dos pilares passam para uma coluna.                           |
| Abaixo de `820px` | Navegação vira menu móvel e o hero passa para uma coluna.           |
| Abaixo de `760px` | Grades de significado, compromisso e rodapé passam para uma coluna. |
| Abaixo de `520px` | Logo, tipografia do hero e margens laterais são reduzidos.          |

Os títulos utilizam `clamp()` para crescer de forma fluida. O conteúdo principal é limitado por `--maxw: 1180px`.

## Acessibilidade

Recursos presentes:

- idioma configurado como `pt-BR`;
- texto alternativo no logo;
- `aria-label` nos links de retorno e no botão do menu;
- `aria-expanded` atualizado pelo menu móvel;
- SVG decorativo removido da árvore de acessibilidade;
- navegação por teclado e foco padrão preservados;
- preferência por movimento reduzido respeitada;
- links externos com `rel="noopener"`.

## Conteúdo que precisa ser revisado

Os seguintes dados ainda são placeholders:

- `contato@n3x.dev`;
- `+55 11 99999-9999`;
- `n3x.dev`.

O rodapé marca essa área com a etiqueta amarela `placeholder`. Para localizar todas as ocorrências:

```bash
rg 'contato@n3x.dev|99999-9999|n3x.dev' index.html
```

Ao trocar o e-mail, atualize tanto o texto visível quanto o `href="mailto:..."`.

Também devem ser validados antes da publicação os textos de “Como atuamos”, o ano/razão social do copyright, o domínio oficial, os canais de contato e os metadados de SEO.

## Como personalizar

### Alterar textos

Edite diretamente o conteúdo semântico em `index.html`. Preserve os `id` das seções se os links do menu continuarem apontando para eles.

### Alterar o logo

O site usa `assets/brand/n3x-wordmark-transparent.png` para o “N3X” e renderiza “Software & Infrastructure” como texto HTML, garantindo nitidez em qualquer escala. Para trocar a marca, substitua o PNG mantendo o nome ou atualize os dois atributos `src` no cabeçalho e no rodapé.

### Alterar o favicon

Substitua `assets/icons/favicon-16.png`, `assets/icons/favicon-32.png` e `assets/icons/favicon-192.png`. As referências estão no `<head>` de `index.html`.

O sufixo `?v=2` funciona como controle simples de cache. Ao substituir novamente os ícones, aumente o número, por exemplo para `?v=3`.

### Alterar layout

- largura máxima: `--maxw`;
- margem lateral: `.wrap`;
- raios de borda: `--radius-sm`, `--radius-md` e `--radius-lg`;
- espaçamento vertical: `padding` de cada seção.

## Publicação

Como o projeto é estático, pode ser publicado diretamente em GitHub Pages, Netlify, Vercel, Cloudflare Pages, Amazon S3/CloudFront ou qualquer servidor Nginx/Apache.

O diretório publicado deve incluir `index.html`, `styles.css`, `assets/brand/n3x-wordmark-transparent.png` e os três arquivos de `assets/icons/`. A pasta `assets/source/` e `assets/brand/n3x-symbol.png` são fontes de trabalho e podem ser omitidas do pacote de produção.

Não existe etapa de build. O arquivo de entrada é `index.html`.

## Checklist antes de publicar

- [ ] Substituir e-mail, telefone e domínio.
- [ ] Validar o texto institucional.
- [ ] Confirmar o ano e a razão social do rodapé.
- [ ] Testar menu e links em celular.
- [ ] Testar navegação por teclado.
- [ ] Conferir a página com movimento reduzido ativado.
- [ ] Verificar favicon em janela anônima para evitar cache antigo.
- [ ] Revisar título e descrição para SEO.
- [ ] Otimizar imagens caso o tamanho final aumente.
- [ ] Publicar `index.html`, `styles.css`, `assets/brand/n3x-wordmark-transparent.png` e `assets/icons/` juntos.

## Compatibilidade

O projeto utiliza CSS Grid, Flexbox, variáveis CSS, `clamp()`, `backdrop-filter`, `IntersectionObserver`, Pointer Events e `matchMedia()`. Esses recursos são suportados pelos navegadores modernos.

Sem `IntersectionObserver`, o conteúdo continua disponível; apenas as entradas animadas e o destaque automático da navegação não são aplicados.
