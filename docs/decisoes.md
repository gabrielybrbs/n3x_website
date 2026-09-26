# Decisões da N3X

Respostas às perguntas da auditoria (26/09/2026). Este é o documento de referência para conteúdo, dados e escopo. Qualquer mudança de decisão deve ser registrada aqui antes de ser aplicada no site.

## Negócio e posicionamento

| Tema | Decisão |
| --- | --- |
| Perfil | Startup que presta serviços a empresas de qualquer área, órgãos públicos e pessoas físicas. |
| Objetivo do site | **Credibilidade** e conversão pelo **WhatsApp**. |
| Pilares | Desenvolvimento, Infraestrutura e Monitoramento, **com o mesmo peso**. |
| Percepção desejada | **Empresa estabelecida.** A frase "Time pequeno, resposta direta" sai. |
| Tratamento | **"Nós"**, no tom do manual: moderno e sério, sem jargão desnecessário. |
| Localização | Macapá-AP, com **atuação em todo o Brasil**. A cidade aparece, mas não é o foco. |
| CNPJ / razão social | Não exibir. |

## Dados de contato

| Canal | Valor | Situação |
| --- | --- | --- |
| Domínio | `https://n3x.com.br` | Ativo |
| WhatsApp | (96) 99187-8067 → `https://wa.me/5596991878067` | Ativo; é o canal principal |
| Instagram | `https://www.instagram.com/n3x_software/` | Ativo (URL sem parâmetros de rastreio) |
| Facebook, LinkedIn, TikTok | — | Estrutura pronta e oculta até existir o link |
| E-mail | — | Não existe e-mail oficial; não aparece no site |

## Conteúdo

- **Textos dos pilares e do conceito N/3/X:** valem os do manual e do kit digital.
- **Seção "O que significa N3X":** permanece, mais abaixo na página. A N3X considera importante transmitir o significado do nome.
- **Equipe:** sem seção por enquanto.
- **Clientes:** os logos ainda não foram entregues. A seção fica **pronta e oculta** até os arquivos chegarem (ver [plano](plano-implementacao.md#clientes)).
- **Dados de demonstração:** a N3X autorizou gerar números e ofertas de exemplo, que **são fictícios** no momento. Eles ficam concentrados e marcados no código com `data-demo` para facilitar a troca. Ver a seção abaixo.

### Dados de demonstração (fictícios, autorizados pela N3X)

| Dado | Onde aparece |
| --- | --- |
| Disponibilidade com SLA de 99,9% | Serviços › Monitoramento; faixa de destaques no Início |
| Monitoramento 24/7 | Serviços › Monitoramento; faixa de destaques |
| Relatórios mensais | Item do card de Monitoramento (texto do kit) |
| Diagnóstico gratuito da infraestrutura | Faixa de chamada (texto do kit) |
| Painel ilustrativo: disponibilidade 99,98%, serviços online 28/28, tempo de resposta 184 ms | Serviços › Monitoramento, identificado na tela como "Painel ilustrativo" |

**O que não será inventado:** nomes ou logos de clientes, depoimentos, quantidade de projetos ou clientes, anos de mercado e certificações. Esses dados apresentados como reais seriam enganosos.

> ⚠️ Antes de divulgar amplamente o site, confirme se a N3X consegue cumprir cada item acima como oferta real. Uma promessa publicada (por exemplo, o SLA) pode ser cobrada pelo cliente. Para localizar tudo: `rg -n 'data-demo' public/`.

## Estrutura e experiência

| Tema | Decisão |
| --- | --- |
| Formato | **Site institucional com várias páginas**, seguindo a navegação do kit: Início, Serviços, Sobre, Contato. |
| Tecnologia | **HTML, CSS e JS puros**, sem framework ou build. |
| Contato | **Somente WhatsApp** por enquanto; não haverá formulário. |
| CTA no mobile | **Sempre visível**, em uma barra fixa no rodapé da tela. |
| Movimento | Opção **(b)**: entrada suave das seções e hover discreto. Sem animações contínuas, parallax ou inclinação 3D. |
| Tema | Site **pronto para tema claro e escuro**. Na primeira visita segue a preferência do sistema; um botão permite trocar e a escolha fica salva. |
| Documentos | Proposta, cartão e outros impressos **não entram** no site. |
| Referências externas | Nenhuma além do manual e do kit. |

## Privacidade (LGPD)

- **Controladora** indicada na política: **N3X**. O contato para assuntos de privacidade é o WhatsApp oficial.
- Sem formulário, analytics, pixels ou cookies de terceiros. Por isso não há banner de cookies.
- Fontes **hospedadas no próprio site**, sem Google Fonts, para não enviar o IP do visitante a terceiros.
- A preferência de tema é salva só no navegador (`localStorage`). Não é dado pessoal e não sai do dispositivo; isso fica descrito na política.
- A página `/privacidade` explica: dados tratados via WhatsApp, finalidade, base legal, retenção, direitos do titular (art. 18 da LGPD) e canal de contato.
- Se no futuro entrar analytics ou formulário, a política e o consentimento precisam ser revistos **antes** da publicação.

## Infraestrutura

| Tema | Decisão |
| --- | --- |
| Hospedagem | **Vercel** |
| Materiais de marca | Ficam **fora do que é publicado**, em `brand/`, como boa prática. |
| Assets antigos | Movidos para `brand/legado/`, não apagados. |
| Logo da assinatura de e-mail | Publicado em `/assets/brand/n3x-assinatura-logo.png`, pronto para quando existir um e-mail oficial. |
