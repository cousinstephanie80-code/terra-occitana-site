(function () {
  const nav = document.querySelector(".nav");
  const btn = document.querySelector(".hamburger");
  if (!nav || !btn) return;
  btn.addEventListener("click", () => nav.classList.toggle("open"));
})();
