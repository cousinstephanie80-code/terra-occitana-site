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
    
    // Animation simple du burger (optionnel si CSS géré)
    burger.classList.toggle("toggle"); 
  });

  // Ferme le menu quand on clique sur un lien
  menu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    menu.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
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
  const DURATION = 5500;
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

  // Pause au survol
  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);

  updateSlides();
  start();
})();

/* ===============================
   SCROLL REVEAL (ANIMATION APPARITION)
================================ */
(function () {
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Une fois apparu, on arrête d'observer (pour ne pas rejouer l'anim)
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15, // Déclenche quand 15% de l'élément est visible
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));
})();