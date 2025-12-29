document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("burger");
  const menu = document.querySelector(".menu");
  const links = document.querySelectorAll(".menu a");

  if (!burger || !menu) return;

  // Ouvrir / Fermer le menu
  burger.addEventListener("click", function () {
    menu.classList.toggle("open");
  });

  // Fermer le menu quand on clique sur un lien
  links.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });
});