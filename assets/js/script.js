// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu ul');

  if (menuToggle && menu) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.addEventListener('click', () => {
      const isExpanded = menu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });

    const menuLinks = document.querySelectorAll('.menu ul li a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});

// Scroll Suave para Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Botão "Voltar ao Topo"
const btnTopo = document.getElementById("btnTopo");
if (btnTopo) {
  // Função de debounce para otimizar o evento de scroll
  let isScrolling;
  window.addEventListener('scroll', () => {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      btnTopo.style.display = window.scrollY > 300 ? "block" : "none";
    }, 100);
  });

  btnTopo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Validação do Formulário e Feedback
const form = document.querySelector('form');
if (form) {
  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const mensagem = document.getElementById('mensagem');
  const successMessage = document.querySelector('.success-message');

  if (nome && email && mensagem && successMessage) {
    successMessage.setAttribute('aria-live', 'polite');
    form.addEventListener('submit', function (e) {
      let hasError = false;

      // Limpa mensagens de erro anteriores
      document.querySelectorAll('.error-message').forEach(msg => msg.remove());
      nome.classList.remove('error');
      email.classList.remove('error');
      mensagem.classList.remove('error');
      successMessage.style.display = 'none';

      // Validação do Nome
      if (!nome.value.trim()) {
        hasError = true;
        nome.classList.add('error');
        nome.insertAdjacentHTML('afterend', '<span class="error-message" style="display: block;">Por favor, preencha o nome.</span>');
      }

      // Validação do E-mail
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value)) {
        hasError = true;
        email.classList.add('error');
        email.insertAdjacentHTML('afterend', '<span class="error-message" style="display: block;">Por favor, insira um e-mail válido.</span>');
      }

      // Validação da Mensagem
      if (!mensagem.value.trim()) {
        hasError = true;
        mensagem.classList.add('error');
        mensagem.insertAdjacentHTML('afterend', '<span class="error-message" style="display: block;">Por favor, escreva sua mensagem.</span>');
      }

      if (hasError) {
        e.preventDefault();
      } else {
        successMessage.style.display = 'block';
        setTimeout(() => {
          form.reset();
          successMessage.style.display = 'none';
        }, 3000);
      }
    });
  }
}