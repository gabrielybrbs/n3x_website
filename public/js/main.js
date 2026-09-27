/* ==========================================================================
   N3X — comportamento do site
   1. Troca de tema claro/escuro
   2. Menu mobile
   3. Destaque no menu da seção visível
   4. Entrada suave das seções
   5. Foco de luz do cursor nos cards de serviço
   Script comum com "defer" (não é módulo, para funcionar também ao abrir
   o arquivo direto no navegador). Sem dependências. O conteúdo funciona
   completo sem JavaScript.
   ========================================================================== */
(function () {
  'use strict';

  var raiz = document.documentElement;
  var CHAVE_TEMA = 'n3x-tema';

  /* ---------- 1. Tema ---------- */
  var botaoTema = document.querySelector('[data-botao-tema]');
  var temaDoSistema = window.matchMedia('(prefers-color-scheme: light)');

  function temaSalvo() {
    try { return localStorage.getItem(CHAVE_TEMA); } catch (e) { return null; }
  }

  function aplicarTema(tema, salvar) {
    raiz.setAttribute('data-theme', tema);
    if (salvar) {
      try { localStorage.setItem(CHAVE_TEMA, tema); } catch (e) { /* armazenamento bloqueado */ }
    }
    if (botaoTema) {
      var proximo = tema === 'dark' ? 'claro' : 'escuro';
      botaoTema.setAttribute('aria-label', 'Ativar tema ' + proximo);
      botaoTema.setAttribute('title', 'Ativar tema ' + proximo);
    }
  }

  aplicarTema(raiz.getAttribute('data-theme') || 'dark', false);

  if (botaoTema) {
    // O botão nasce oculto no HTML: sem JavaScript ele não funcionaria.
    botaoTema.hidden = false;
    botaoTema.addEventListener('click', function () {
      aplicarTema(raiz.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    });
  }

  // Acompanha o sistema enquanto a pessoa não escolher um tema manualmente.
  temaDoSistema.addEventListener('change', function (evento) {
    if (!temaSalvo()) aplicarTema(evento.matches ? 'light' : 'dark', false);
  });

  /* ---------- 2. Menu mobile ---------- */
  var botaoMenu = document.querySelector('[data-botao-menu]');
  var nav = document.getElementById('navegacao');

  function definirMenu(aberto, devolverFoco) {
    nav.classList.toggle('aberto', aberto);
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    if (aberto) {
      var primeiro = nav.querySelector('a');
      if (primeiro) primeiro.focus();
    } else if (devolverFoco) {
      botaoMenu.focus();
    }
  }

  if (botaoMenu && nav) {
    botaoMenu.addEventListener('click', function () {
      definirMenu(botaoMenu.getAttribute('aria-expanded') !== 'true', false);
    });

    // Ao escolher uma seção, o menu fecha e a página rola até ela.
    nav.addEventListener('click', function (evento) {
      if (evento.target.closest('a')) definirMenu(false, false);
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && nav.classList.contains('aberto')) definirMenu(false, true);
    });

    document.addEventListener('click', function (evento) {
      if (!nav.classList.contains('aberto')) return;
      if (nav.contains(evento.target) || botaoMenu.contains(evento.target)) return;
      definirMenu(false, false);
    });

    // Ao voltar para o layout de desktop, o menu mobile não fica "preso" aberto.
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (evento) {
      if (evento.matches) definirMenu(false, false);
    });
  }

  /* ---------- 3. Seção visível no menu (só na página inicial) ---------- */
  var linksSecao = nav ? Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]')) : [];

  if (linksSecao.length && 'IntersectionObserver' in window) {
    var secoes = linksSecao
      .map(function (link) { return document.querySelector(link.getAttribute('href')); })
      .filter(Boolean);

    var observadorMenu = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        linksSecao.forEach(function (link) {
          if (link.getAttribute('href') === '#' + entrada.target.id) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    secoes.forEach(function (secao) { observadorMenu.observe(secao); });
  }

  /* ---------- 4. Entrada suave ---------- */
  var movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var itensRevelar = document.querySelectorAll('[data-revelar]');

  if (!movimentoReduzido && 'IntersectionObserver' in window && itensRevelar.length) {
    raiz.classList.add('revelar-pronto');

    var observadorRevelar = new IntersectionObserver(function (entradas, obs) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('visivel');
        obs.unobserve(entrada.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    itensRevelar.forEach(function (item) { observadorRevelar.observe(item); });
  }

  /* ---------- 5. Foco de luz do cursor nos cards ---------- */
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.card-servico').forEach(function (card) {
      card.addEventListener('pointermove', function (evento) {
        var area = card.getBoundingClientRect();
        card.style.setProperty('--cursor-x', (evento.clientX - area.left) + 'px');
        card.style.setProperty('--cursor-y', (evento.clientY - area.top) + 'px');
      });
    });
  }
})();
