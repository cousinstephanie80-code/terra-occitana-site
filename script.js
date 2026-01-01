/* ===============================
   MENU BURGER (MOBILE) + MENU ACTIF
================================ */
(function () {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  // ----- MENU ACTIF (auto)
  // Ajoute la classe "active" sur le lien qui correspond à la page courante
  try {
    const current = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    const links = document.querySelectorAll("#menu a");

    links.forEach((a) => {
      const href = (a.getAttribute("href") || "").split("/").pop().toLowerCase();
      if (href && href === current) {
        a.classList.add("active");
        // sans dépendre du CSS : on force juste la couleur premium
        a.style.color = "var(--terracotta)";
      }
    });
  } catch (e) {
    // Silencieux : pas bloquant
  }

  // Si pas de burger/menu, on s'arrête là (utile si une page n'a pas le header complet)
  if (!burger || !menu) return;

  const openMenu = () => {
    menu.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    burger.classList.add("toggle");
  };

  const closeMenu = () => {
    menu.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.classList.remove("toggle");
  };

  const toggleMenu = () => {
    const isOpen = menu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    burger.classList.toggle("toggle", isOpen);
  };

  burger.addEventListener("click", toggleMenu);

  // Ferme le menu quand on clique sur un lien
  menu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeMenu();
  });

  // Ferme le menu si on clique en dehors (quand ouvert)
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("is-open")) return;
    const clickedInsideMenu = e.target.closest("#menu");
    const clickedBurger = e.target.closest("#burger");
    if (!clickedInsideMenu && !clickedBurger) closeMenu();
  });

  // Ferme sur ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

/* ===============================
   HERO SLIDER (INDEX) — fade doux
   (ne s’exécute que s’il existe)
================================ */
(function () {
  const slider = document.querySelector("[data-hero-slider]");
  if (!slider) return;

  const slides = slider.querySelectorAll(".hero-slide");
  if (!slides.length) return;

  let index = 0;
  const duration = 6500; // ms

  const setActive = (i) => {
    slides.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
  };

  setActive(index);

  // Rotation
  window.setInterval(() => {
    index = (index + 1) % slides.length;
    setActive(index);
  }, duration);
})();

/* ===============================
   SCROLL REVEAL (APPARITION)
================================ */
(function () {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
})();
