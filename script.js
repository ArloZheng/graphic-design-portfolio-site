const header = document.querySelector("[data-header]");
const progress = document.querySelector(".progress");
const reveals = document.querySelectorAll(".reveal");
const parallaxItems = document.querySelectorAll("[data-depth]");
const processRows = document.querySelectorAll(".process-row");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -40px" }
);

reveals.forEach((item) => revealObserver.observe(item));

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progressWidth = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

  if (progress) progress.style.width = `${progressWidth}%`;
  if (header) header.classList.toggle("is-elevated", scrollTop > 12);

  parallaxItems.forEach((item) => {
    const depth = Number(item.dataset.depth || 0);
    item.style.setProperty("--parallax", `${scrollTop * depth}px`);
  });
}

window.addEventListener("scroll", updateScrollEffects, { passive: true });
updateScrollEffects();

processRows.forEach((row) => {
  row.addEventListener("click", () => {
    processRows.forEach((item) => item.classList.toggle("is-open", item === row));
  });
});
