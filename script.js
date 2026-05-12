const header = document.querySelector("[data-header]");
const progress = document.querySelector(".progress");
const reveals = document.querySelectorAll(".reveal");
const parallaxItems = document.querySelectorAll("[data-depth]");
const processRows = document.querySelectorAll(".process-row");
const labHero = document.querySelector("[data-lab]");
const labNodes = document.querySelectorAll("[data-lab-node]");
const labIndex = document.querySelector("[data-lab-index]");
const labTitle = document.querySelector("[data-lab-title]");
const labDesc = document.querySelector("[data-lab-desc]");

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

if (labHero) {
  labHero.addEventListener("pointermove", (event) => {
    const rect = labHero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    labHero.style.setProperty("--mx", x.toFixed(3));
    labHero.style.setProperty("--my", y.toFixed(3));
  });

  labHero.addEventListener("pointerleave", () => {
    labHero.style.setProperty("--mx", "0");
    labHero.style.setProperty("--my", "0");
  });
}

function setActiveLabNode(node) {
  labNodes.forEach((item) => item.classList.toggle("is-active", item === node));
  if (labIndex) labIndex.textContent = node.querySelector("span")?.textContent || "";
  if (labTitle) labTitle.textContent = node.dataset.label || "";
  if (labDesc) labDesc.textContent = node.dataset.desc || "";
}

labNodes.forEach((node) => {
  node.addEventListener("pointerenter", () => setActiveLabNode(node));
  node.addEventListener("focus", () => setActiveLabNode(node));
});
