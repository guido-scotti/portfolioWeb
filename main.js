const revealElements = document.querySelectorAll('.reveal-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Calcula un delay escalonado según el orden en el DOM
      entry.target.style.transitionDelay = `${i * 0.12}s`;
      entry.target.classList.add('visible');
      // observer.unobserve(entry.target); // si solo querés animar una vez
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(el => observer.observe(el));

(function(){
  emailjs.init("CdLb5SWx4R2_52mgO");
})();

const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_6y83n3o", "template_zzy4zi3", this)
    .then(() => {
      alert("✅ Mensaje enviado correctamente!");
      form.reset(); // limpia el formulario
    })
    .catch(err => {
      console.error("❌ Error:", err);
      alert("Hubo un error al enviar el mensaje, intentá de nuevo.");
    });
});

window.currentLang = localStorage.getItem('siteLang') || 'en';

function setLanguage(lang) {
  window.currentLang = lang;
  localStorage.setItem('siteLang', lang);

  document.querySelectorAll('[data-en][data-es]').forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = el.getAttribute(`data-${lang}`);
    } else {
      el.innerHTML = el.getAttribute(`data-${lang}`);
    }
  });

  document.querySelectorAll('[data-en-href][data-es-href]').forEach(a => {
    a.href = a.getAttribute(`data-${lang}-href`);
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('lang-toggle-active', btn.dataset.lang === lang);
  });
}

const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    setLanguage(window.currentLang === 'en' ? 'es' : 'en');
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    setLanguage(btn.dataset.lang);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(window.currentLang);
});