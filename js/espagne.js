(() => {
  const burger = document.querySelector("[data-burger]");
  const nav = document.querySelector("[data-nav]");
  if (!burger || !nav) return;

  const setExpanded = (val) => burger.setAttribute("aria-expanded", String(val));

  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    setExpanded(isOpen);
  });

  // Close menu on link click (mobile)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      if (nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        setExpanded(false);
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    const isOpen = nav.classList.contains("is-open");
    if (!isOpen) return;
    if (nav.contains(e.target) || burger.contains(e.target)) return;
    nav.classList.remove("is-open");
    setExpanded(false);
  });
})();
