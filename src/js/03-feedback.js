import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  // Перевірка стану сховища під час завантаження сторінки
  const savedState = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedState) {
    emailInput.value = savedState.email;
    messageInput.value = savedState.message;
  }

  // Функція для збереження стану форми в локальне сховище
  const saveFormState = throttle(function () {
    const currentState = {
      email: emailInput.value,
      message: messageInput.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(currentState));
  }, 500);

  // Відстежування події input і збереження стану форми
  emailInput.addEventListener('input', saveFormState);
  messageInput.addEventListener('input', saveFormState);

  // Очищення сховища та полів форми під час сабміту форми
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log({
      email: emailInput.value,
      message: messageInput.value,
    });
    localStorage.removeItem('feedback-form-state');
    emailInput.value = '';
    messageInput.value = '';
  });
});
