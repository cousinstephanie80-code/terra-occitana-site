/* ===============================
   script.js — VERSION COMPLÈTE
   Menu mobile simplifié : pas de burger
   On conserve :
   - lien actif (menu)
   - hero slider (index)
   - scroll reveal
================================ */

/* ===============================
   MENU ACTIF (auto)
================================ */
(function () {
  try {
    const current = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    const links = document.querySelectorAll("#menu a");

    links.forEach((a) => {
      const href = (a.getAttribute("href") || "").split("/").pop().toLowerCase();
      if (href && href === current) {
        a.classList.add("active");
        a.style.color = "var(--terracotta)";
      }
    });
  } catch (e) {
    // Silencieux : pas bloquant
  }
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
