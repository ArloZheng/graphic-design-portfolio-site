const progress = document.querySelector(".progress");
const filters = document.querySelectorAll("[data-filter]");
const cases = document.querySelectorAll("[data-type]");
const steps = document.querySelectorAll(".steps button");

function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
}

addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle("active", item === button));
    cases.forEach((item) => item.classList.toggle("hidden", filter !== "all" && item.dataset.type !== filter));
  });
});

steps.forEach((step) => {
  step.addEventListener("click", () => {
    steps.forEach((item) => item.classList.toggle("open", item === step));
  });
});
