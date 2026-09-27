# N3X | Site institucional

Site da **N3X Software & Infraestrutura**, feito com HTML, CSS e JavaScript puros, sem framework, sem build e sem dependências. Segue a identidade visual v1.0 (setembro de 2026) e é publicado na Vercel em `https://n3x.com.br`.

> Histórico da reformulação: [docs/](docs/README.md), com auditoria, decisões e plano.
> As decisões de conteúdo e escopo estão em [docs/decisoes.md](docs/decisoes.md).

## Estrutura

```text
.
├── public/                  ← SOMENTE esta pasta é publicada
│   ├── index.html           página única: Início, Serviços, Sobre, Contato → /
│   ├── privacidade.html     Política de Privacidade                        → /privacidade
│   ├── 404.html             página não encontrada
│   ├── robots.txt · sitemap.xml · site.webmanifest
│   ├── css/
│   │   ├── tokens.css       tokens oficiais da marca (cópia fiel, NÃO editar)
│   │   ├── fonts.css        fontes locais
│   │   ├── theme.css        cores semânticas dos temas escuro e claro
│   │   ├── base.css         reset, tipografia, layout, foco, utilitários
│   │   ├── components.css   botões, cabeçalho, cards, rodapé, barra do WhatsApp...
│   │   └── pages.css        layouts usados num só lugar (Sobre, Contato, Privacidade, 404)
│   ├── js/
│   │   ├── tema-inicial.js  aplica o tema antes da renderização (no <head>)
│   │   └── main.js          troca de tema, menu mobile, seção ativa no menu, entrada suave
│   └── assets/
│       ├── logo/ simbolo/ favicon/   arquivos oficiais da marca
│       ├── fonts/           Archivo, IBM Plex Sans, IBM Plex Mono (licença OFL)
│       ├── grafismo/        cortes diagonais
│       ├── clientes/        logos de clientes (vazio por enquanto)
│       ├── og/              imagem de compartilhamento 1200×630
│       └── brand/           logo da assinatura de e-mail
├── brand/                   ← NÃO publicado
│   ├── n3x-identidade/      manual da marca, kit digital, PDFs, redes sociais
│   └── legado/              site e arquivos da identidade anterior
├── docs/                    auditoria, decisões e plano
├── scripts/verificar.py     verificação automática do site
└── vercel.json              publicação, URLs limpas, segurança e cache
```

## Abrir localmente

Todos os caminhos são **relativos**, então o site funciona de qualquer forma:

- abrindo `public/index.html` direto no navegador (duplo clique);
- pelo Live Server do VS Code;
- por um servidor local: `cd public && python3 -m http.server 8000`.

Na Vercel, `privacidade.html` aparece como `/privacidade` (URL limpa).

## Publicar na Vercel

1. Importe o repositório na Vercel.
2. Não é preciso configurar nada: o `vercel.json` já define `public/` como pasta publicada e desativa o build.
3. Em **Settings › Domains**, aponte `n3x.com.br` (e `www.n3x.com.br`, redirecionando para o principal).

## Verificar antes de publicar

```bash
python3 scripts/verificar.py
```

O script confere:

- se os blocos compartilhados estão idênticos em todas as páginas;
- se os links internos, âncoras e arquivos existem;
- se não há caminho absoluto (`/css/...`), que quebraria o site aberto localmente;
- se cada página tem um único `<h1>`.

Ele também lista os dados de demonstração.

---

## Manutenção

### Blocos compartilhados (cabeçalho, rodapé e `<head>`)

O site é uma **página única** (`index.html`). Menu e rodapé levam às seções por âncoras (`#servicos`, `#sobre`, `#contato`). Só a Política de Privacidade e a página 404 são arquivos separados.

Como o site não tem build, os blocos abaixo se repetem nas 3 páginas. Eles ficam delimitados por comentários:

```html
<!-- ▼ BLOCO: cabecalho ... -->   ...   <!-- ▲ BLOCO: cabecalho -->
```

| Bloco | Conteúdo |
| --- | --- |
| `head` | favicons, fontes, CSS, JS e metadados comuns |
| `cabecalho` | ícones da marca (embutidos), logo, menu, tema, "Fale conosco" |
| `rodape` | rodapé e barra fixa do WhatsApp no mobile |

**Para alterar um bloco:**

1. Edite em `index.html`.
2. Copie o bloco inteiro (do `▼` ao `▲`) para `privacidade.html` e `404.html`.
3. Nessas duas páginas, troque os links de seção `href="#..."` por `href="index.html#..."`. **Não altere** os `href="#i-..."` dos ícones.
4. Rode `python3 scripts/verificar.py`.

Título, descrição, `canonical` e `og:*` de cada página ficam **fora** do bloco `head`, logo abaixo do `<title>`.

### WhatsApp

Número atual: **(96) 99187-8067**. Os links usam `https://wa.me/5596991878067?text=...`, com mensagem pronta.

Para trocar o número, substitua `5596991878067` e `(96) 99187-8067` em todas as páginas:

```bash
rg -n '5596991878067|99187-8067' public/
```

Atualize também o `telephone` do JSON-LD em `index.html`.

### Redes sociais

O Instagram está ativo. LinkedIn, Facebook e TikTok já estão prontos, comentados no rodapé (bloco `rodape`) e na seção Contato de `index.html`:

```html
<!-- REDES FUTURAS: descomente e preencha o link ...
<li><a href="URL_LINKEDIN" ...>LinkedIn</a></li>
-->
```

Para ativar uma rede:

1. Tire a linha de dentro do comentário e troque `URL_...` pelo link real.
2. Repita o bloco `rodape` nas outras páginas.
3. Acrescente o link em `"sameAs"` no JSON-LD de `index.html`.

### Clientes

A seção de clientes está pronta em `index.html`, mas oculta (`hidden`) até haver logos. Para ativar:

1. Salve os logos em `public/assets/clientes/`. Use SVG de preferência, ou PNG transparente com pelo menos 320 px de largura, nomeado como `nome-do-cliente.svg`.
2. Em `index.html`, na seção `CLIENTES`, adicione um item por cliente:
   ```html
   <li><img src="assets/clientes/nome-do-cliente.svg" alt="Nome do cliente" width="140" height="48" loading="lazy"></li>
   ```
3. Remova o atributo `hidden` da `<section>`.

Só publique logos de clientes que autorizaram o uso da marca.

### Dados de demonstração

Por decisão da N3X, alguns números e ofertas são **fictícios por enquanto**. Todos estão marcados com o atributo `data-demo`:

| Dado | Página |
| --- | --- |
| 99,9% de disponibilidade (SLA) | Destaques, logo após o topo |
| Monitoramento 24/7 | Destaques, logo após o topo |
| Relatórios mensais | Card de Monitoramento |
| Painel ilustrativo (99,98% · 28/28 · 184 ms) | Seção Serviços |

Para listar: `python3 scripts/verificar.py` ou `rg -n 'data-demo' public/`.

Para confirmar um dado como real, basta manter o texto; o atributo pode continuar. Para remover, apague o elemento marcado.

> ⚠️ Uma oferta publicada, como o SLA, pode ser cobrada por clientes. Confirme cada item antes de divulgar o site amplamente.

### Tema claro e escuro

- Na primeira visita, o site segue a preferência do sistema. O botão ☀/☾ no cabeçalho alterna o tema, e a escolha fica salva no navegador (`localStorage`, chave `n3x-tema`).
- As cores dos componentes vêm de `theme.css` (`--c-fundo`, `--c-texto`, `--c-destaque`, `--c-acao`...). **Não use cores fixas nos componentes.** Se precisar de uma cor nova, crie a variável nos dois temas.
- Regras da marca: no escuro, ação e destaque em **ciano**; no claro, em **azul**. Ciano nunca é usado como texto sobre fundo branco.
- Logos têm duas versões lado a lado no HTML (`.logo-escuro` e `.logo-claro`); o CSS mostra a correta.

### Identidade visual

A referência é o [manual da marca](brand/n3x-identidade/n3x-manual-da-marca.html) e o [kit digital](brand/n3x-identidade/n3x-kit-digital.html). Resumo:

| Elemento | Regra |
| --- | --- |
| Cores | Ciano `#2FC4E4` dominante, azul `#3F63D9` para profundidade, lilás `#7E62E0` só como toque no degradê, grafite `#161B28` como fundo |
| Títulos | Archivo SemiBold/Bold, largura 112% |
| Texto | IBM Plex Sans 17 px, entrelinha 1,6 |
| Rótulos e dados | IBM Plex Mono Medium 12 px, caixa alta, espaçamento 0,14em |
| Grafismo | Cortes diagonais no ângulo do X (~54°) saindo por uma borda, sobre listras de no máximo 8% |
| Ícones | Grade de 24 px, traço de 1,75 px, pontas retas (embutidos no bloco `cabecalho`) |
| Logo | Secundário (sem slogan) no cabeçalho, 112 px (mín. 80 px); principal (com slogan) no rodapé, 200 px (mín. 200 px). Nunca redesenhar, aplicar sombra ou brilho |

Para usar um ícone:

```html
<svg class="icone" aria-hidden="true"><use href="#i-monitoramento"/></svg>
```

Os ícones ficam embutidos no início do bloco `cabecalho`. Um arquivo SVG externo não funcionaria ao abrir o site direto do disco. Ícones disponíveis: `i-desenvolvimento`, `i-infraestrutura`, `i-monitoramento`, `i-seguranca`, `i-nuvem`, `i-suporte`, `i-mensagem`, `i-instagram`, `i-local`, `i-seta`, `i-seta-externa`, `i-menu`, `i-fechar`, `i-sol`, `i-lua`, `i-check`.

Novos ícones podem vir do [Lucide](https://lucide.dev), com a mesma configuração, adicionados como `<symbol>` no bloco `cabecalho` de todas as páginas.

### Cache de CSS e JS

Os arquivos são chamados com `?v=12` (ex.: `css/components.css?v=12`) e a Vercel os guarda em cache por uma semana. **Ao alterar CSS ou JS, aumente o número** (`?v=13`) no bloco `head` de todas as páginas.

### Adicionar uma seção

1. Crie a `<section class="secao" id="nome-da-secao">` em `index.html`, no ponto desejado.
2. Se ela entrar no menu, adicione o link no bloco `cabecalho` de todas as páginas (`#nome-da-secao` em `index.html`, `index.html#nome-da-secao` nas demais).
3. Rode `python3 scripts/verificar.py`.

### Adicionar uma página separada

1. Copie `privacidade.html` com o novo nome (`nova.html` vira `/nova` na Vercel).
2. Ajuste `<title>`, `description`, `canonical` e `og:*` e troque o conteúdo do `<main>`.
3. Adicione a URL em `sitemap.xml`.
4. Rode `python3 scripts/verificar.py`.

### Movimento

- Entrada suave das seções (`data-revelar`) e transições curtas de hover.
- Foco de luz que segue o cursor nos cards de serviço (só com mouse).
- Única exceção com animação contínua: o **símbolo X** do hero (órbitas, sinais e pulsos). As animações só começam quando ele aparece na tela.
- Quem ativa "reduzir movimento" no sistema não vê nenhuma animação.

Mantenha esse padrão e evite novas animações contínuas.

### Focos de luz

Manchas de luz radiais atrás das seções, ativadas pelo atributo `data-luz`:

```html
<section class="secao" data-luz="direita">        <!-- ciano, canto superior direito -->
<section class="secao" data-luz="esquerda">       <!-- azul, canto inferior esquerdo -->
<section class="secao" data-luz="direita-lilas">  <!-- lilás, canto superior direito -->
```

Cores e intensidade por tema ficam em `theme.css` (`--c-luz-*`). Alterne os lados entre seções vizinhas.

## Privacidade (LGPD)

- Sem cookies, analytics, pixels ou formulários. Fontes servidas pelo próprio site.
- A política fica em `/privacidade`. **Se entrar analytics, formulário ou qualquer ferramenta de terceiros, atualize a política e avalie a necessidade de consentimento antes de publicar.**
- O `vercel.json` aplica uma Content Security Policy restrita ao próprio domínio. Um script ou serviço externo novo precisa ser liberado nela.

## E-mail

Ainda não há e-mail oficial, então nenhum e-mail aparece no site. O logo da assinatura de e-mail já é publicado em `/assets/brand/n3x-assinatura-logo.png`, o endereço que `brand/n3x-identidade/email/assinatura-email.html` espera.

## Checklist antes de publicar

- [ ] `python3 scripts/verificar.py` sem problemas.
- [ ] Dados de demonstração revisados.
- [ ] Menu mobile, barra do WhatsApp e troca de tema testados em um celular.
- [ ] Links do menu rolando até as seções corretas.
- [ ] Navegação por teclado (Tab) com foco visível.
- [ ] Temas claro e escuro conferidos em todas as páginas.
- [ ] `?v=` atualizado se CSS ou JS mudaram.
- [ ] Após publicar: testar a pré-visualização de link (WhatsApp, LinkedIn) e o Google Rich Results Test na página inicial.
