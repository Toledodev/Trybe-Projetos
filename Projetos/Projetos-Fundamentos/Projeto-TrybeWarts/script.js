const button = document.getElementById('button');
function alerta() {
  const email = document.getElementById('inputEmail');
  const senha = document.getElementById('inputPassword');
  if (email.value === 'tryber@teste.com' && senha.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}
button.addEventListener('click', alerta);

// habilita botão caso checkbox marcado
const subButton = document.getElementById('submit-btn');
subButton.disabled = true;

function habSendButton() {
  const acepptButton = document.getElementById('agreement');
  if (acepptButton.checked) {
    subButton.disabled = false;
  } else {
    subButton.disabled = true;
  }
}
const acepptButton = document.getElementById('agreement');
acepptButton.addEventListener('click', habSendButton);

// contador regressivo de caracteres
function charactersCountdown() {
  const cont = document.getElementById('counter');
  const textArea = document.getElementById('textarea');

  cont.innerText = 500;

  textArea.addEventListener('input', () => {
    cont.innerText = 500 - textArea.value.length;
  });
}

charactersCountdown();
