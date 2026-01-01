/* ===============================
   MENU BURGER (MOBILE)
================================ */
(function () {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    burger.classList.toggle("toggle"); 
  });

  // Ferme le menu quand on clique sur un lien
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      menu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      burger.classList.remove("toggle");
    }
  });
})();

/* ===============================
   HERO SLIDER (CARROUSEL)
================================ */
(function () {
  const slider = document.querySelector("[data-hero-slider]");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  if (!slides.length) return;

  let currentIndex = 0;
  const DURATION = 6000;
  let timer;

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  function start() {
    timer = setInterval(nextSlide, DURATION);
  }

  function stop() {
    clearInterval(timer);
  }

  // Arrêt au survol pour lire le texte tranquille
  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);

  updateSlides();
  start();
})();

/* ===============================
   SCROLL REVEAL (APPARITION)
================================ */
(function () {
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));
})();