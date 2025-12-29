document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("burger");
  const menu = document.querySelector(".menu");

  if (!burger || !menu) return;

  burger.addEventListener("click", function () {
    menu.classList.toggle("open");
  });
});
