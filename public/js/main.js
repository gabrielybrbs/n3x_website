/* ==========================================================================
   N3X — comportamento do site
   1. Troca de tema claro/escuro
   2. Menu mobile
   3. Entrada suave das seções
   Sem dependências. O conteúdo funciona completo sem JavaScript.
   ========================================================================== */

const raiz = document.documentElement;
const CHAVE_TEMA = 'n3x-tema';

/* ---------- 1. Tema ---------- */
const botaoTema = document.querySelector('[data-botao-tema]');
const temaDoSistema = window.matchMedia('(prefers-color-scheme: light)');

function temaSalvo() {
  try { return localStorage.getItem(CHAVE_TEMA); } catch { return null; }
}

function aplicarTema(tema, salvar) {
  raiz.setAttribute('data-theme', tema);
  if (salvar) {
    try { localStorage.setItem(CHAVE_TEMA, tema); } catch { /* armazenamento bloqueado */ }
  }
  if (botaoTema) {
    const proximo = tema === 'dark' ? 'claro' : 'escuro';
    botaoTema.setAttribute('aria-label', `Ativar tema ${proximo}`);
    botaoTema.setAttribute('title', `Ativar tema ${proximo}`);
  }
}

aplicarTema(raiz.getAttribute('data-theme') || 'dark', false);

// O botão nasce oculto no HTML: sem JavaScript ele não funcionaria.
if (botaoTema) botaoTema.hidden = false;

botaoTema?.addEventListener('click', () => {
  aplicarTema(raiz.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
});

// Acompanha o sistema enquanto a pessoa não escolher um tema manualmente.
temaDoSistema.addEventListener('change', evento => {
  if (!temaSalvo()) aplicarTema(evento.matches ? 'light' : 'dark', false);
});

/* ---------- 2. Menu mobile ---------- */
const botaoMenu = document.querySelector('[data-botao-menu]');
const nav = document.getElementById('navegacao');

function definirMenu(aberto, devolverFoco) {
  nav.classList.toggle('aberto', aberto);
  botaoMenu.setAttribute('aria-expanded', String(aberto));
  botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  if (aberto) nav.querySelector('a')?.focus();
  else if (devolverFoco) botaoMenu.focus();
}

if (botaoMenu && nav) {
  botaoMenu.addEventListener('click', () => {
    definirMenu(botaoMenu.getAttribute('aria-expanded') !== 'true', false);
  });

  document.addEventListener('keydown', evento => {
    if (evento.key === 'Escape' && nav.classList.contains('aberto')) definirMenu(false, true);
  });

  document.addEventListener('click', evento => {
    if (!nav.classList.contains('aberto')) return;
    if (nav.contains(evento.target) || botaoMenu.contains(evento.target)) return;
    definirMenu(false, false);
  });

  // Ao voltar para o layout de desktop, o menu mobile não fica "preso" aberto.
  window.matchMedia('(min-width: 900px)').addEventListener('change', evento => {
    if (evento.matches) definirMenu(false, false);
  });
}

/* ---------- 3. Entrada suave ---------- */
const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const itensRevelar = document.querySelectorAll('[data-revelar]');

if (!movimentoReduzido && 'IntersectionObserver' in window && itensRevelar.length) {
  raiz.classList.add('revelar-pronto');

  const observador = new IntersectionObserver((entradas, obs) => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('visivel');
      obs.unobserve(entrada.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  itensRevelar.forEach(item => observador.observe(item));
}
