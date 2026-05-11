const header = document.querySelector("[data-header]");
const progress = document.querySelector(".progress");
const reveals = document.querySelectorAll(".reveal");
const parallaxItems = document.querySelectorAll("[data-depth]");
const processRows = document.querySelectorAll(".process-row");
const modal = document.querySelector("[data-modal]");
const modalKicker = document.querySelector("[data-modal-kicker]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalDesc = document.querySelector("[data-modal-desc]");
const modalList = document.querySelector("[data-modal-list]");

const projectData = {
  identity: ["Brand Identity", "品牌视觉系统", "承载 Logo、色彩、字体、辅助图形和基础应用。适合作品集里最核心的商业项目栏目。", [["适合放什么", "Logo、品牌色、字体规范、辅助图形、名片、门头、基础 VI。"], ["展示顺序", "先展示视觉核心，再展示它如何延展到不同应用。"], ["高级感来源", "系统一致性，少而准的元素，比堆 mockup 更重要。"]]],
  campaign: ["Spatial Campaign", "空间活动视觉", "承载展会、集市、快闪、市集和线下活动项目。它不只是海报，而是一套进入空间后的视觉体验。", [["适合放什么", "主视觉、海报、导视、摊位牌、展板、邀请函、社媒图。"], ["展示顺序", "从主视觉开始，延展到现场路径、传播图和细节物料。"], ["高级感来源", "统一规则和现场秩序，比单张海报更有说服力。"]]],
  print: ["Editorial Print", "印刷与菜单系统", "承载菜单、画册、折页、价目表等项目。强调信息层级、纸面质感和版式秩序。", [["适合放什么", "菜单、画册、价目表、折页、票券、卡片、门店海报。"], ["展示顺序", "完整系统图、版式细节、纸张质感和应用场景。"], ["高级感来源", "留白、字级、网格、对齐和信息节奏，而不是装饰。"]]],
  packaging: ["Packaging Object", "包装设计", "包装栏目能让作品集更商业化，也更容易让客户理解设计落地价值。", [["适合放什么", "产品外盒、瓶贴、礼盒、系列包装、电商主图和包装说明。"], ["展示顺序", "正面信息、系列陈列、细节材质、使用场景依次展开。"], ["高级感来源", "克制的信息排布、材质想象和成套系列感。"]]],
  type: ["Custom Type", "字体与字形设计", "字体栏目可以让作品集更有设计师气质，适合放标题字、品牌字标、活动字体和海报实验。", [["适合放什么", "标题字、品牌字标、字形实验、字体海报、活动主标题。"], ["展示顺序", "黑白字形、细节结构、海报应用和不同尺寸下的效果。"], ["高级感来源", "字形结构本身形成记忆点，不依赖复杂背景。"]]],
  digital: ["Digital Launch Kit", "线上发布视觉", "用于补齐线上传播能力，适合品牌上新、活动宣传、社媒模板和电商视觉。", [["适合放什么", "小红书封面、活动长图、上新 KV、电商图、社媒模板。"], ["展示顺序", "同一视觉在不同比例、平台和发布场景中的适配。"], ["高级感来源", "跨平台保持统一，而不是每张图重新设计。"]]],
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

reveals.forEach((item) => revealObserver.observe(item));

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0}%`;
  header.classList.toggle("is-elevated", scrollTop > 12);
  parallaxItems.forEach((item) => item.style.setProperty("--parallax", `${scrollTop * Number(item.dataset.depth || 0)}px`));
}

window.addEventListener("scroll", updateScrollEffects, { passive: true });
updateScrollEffects();

document.querySelectorAll("[data-project] button").forEach((button) => {
  button.addEventListener("click", () => {
    const data = projectData[button.closest("[data-project]").dataset.project];
    modalKicker.textContent = data[0];
    modalTitle.textContent = data[1];
    modalDesc.textContent = data[2];
    modalList.innerHTML = data[3].map(([term, detail]) => `<div><dt>${term}</dt><dd>${detail}</dd></div>`).join("");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  });
});

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-close]").forEach((close) => close.addEventListener("click", closeModal));
window.addEventListener("keydown", (event) => event.key === "Escape" && closeModal());
processRows.forEach((row) => row.addEventListener("click", () => processRows.forEach((item) => item.classList.toggle("is-open", item === row))));
