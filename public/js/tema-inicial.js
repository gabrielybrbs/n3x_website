/* Aplica o tema antes da renderização para evitar o "piscar" de cores.
   Carregado de forma síncrona no <head>, sem defer.
   Prioridade: escolha salva > preferência do sistema > escuro.
   A preferência fica só no navegador (localStorage); não é enviada a ninguém. */
(function () {
  var tema = null;
  try { tema = localStorage.getItem('n3x-tema'); } catch (e) { /* armazenamento bloqueado */ }
  if (tema !== 'light' && tema !== 'dark') {
    tema = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  document.documentElement.setAttribute('data-theme', tema);
})();
