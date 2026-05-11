const header = document.querySelector("[data-elevate]");
const revealItems = document.querySelectorAll(".reveal");
const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-category]");
const expandButton = document.querySelector("[data-expand]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const updateHeader = () => {
  header.classList.toggle("is-elevated", window.scrollY > 12);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filters.forEach((item) => item.classList.toggle("is-active", item === button));

    cards.forEach((card) => {
      const visible = selected === "all" || card.dataset.category === selected;
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

expandButton?.addEventListener("click", () => {
  const detail = document.getElementById(expandButton.dataset.expand);
  const isOpen = detail.classList.toggle("is-open");
  expandButton.textContent = isOpen ? "收起项目说明结构" : "查看项目说明结构";
});
