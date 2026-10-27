'use strict';
(function () {
  var params = new URLSearchParams(location.search);
  var app = params.get('app') || '';
  if (!/^[a-z0-9._-]{1,40}$/.test(app)) { app = 'desconhecido'; }
  var s = parseInt(params.get('s'), 10);
  if (isNaN(s)) { s = 5; }
  s = Math.min(60, Math.max(1, s));

  var elApp = document.getElementById('app');
  var elCont = document.getElementById('contador');
  var elStatus = document.getElementById('status');
  var btnCont = document.getElementById('continuar');
  var btnDesist = document.getElementById('desistir');
  var elCarimbo = document.getElementById('carimbo');

  elApp.textContent = app;
  elCont.textContent = String(s);
  elCarimbo.textContent = new Date().toLocaleTimeString('pt-BR', { hour12: false });

  var restante = s;
  var timer = setInterval(function () {
    restante -= 1;
    elCont.textContent = String(Math.max(0, restante));
    if (restante <= 0) {
      clearInterval(timer);
      btnCont.disabled = false;
    }
  }, 1000);

  btnCont.addEventListener('click', function () {
    location.href = 'shortcuts://run-shortcut?name=Passe';
  });
  btnDesist.addEventListener('click', function () {
    clearInterval(timer);
    btnCont.disabled = true;
    elStatus.textContent = 'Você desistiu. Pode fechar esta aba.';
  });
})();
