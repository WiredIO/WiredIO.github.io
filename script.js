const navLinks = [...document.querySelectorAll(".section-nav a[data-section]")];
const sections = navLinks
  .map((link) => document.getElementById(link.dataset.section))
  .filter(Boolean);

function setActiveSection(id) {
  navLinks.forEach((link) => {
    const isActive = link.dataset.section === id;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    },
    { rootMargin: "-20% 0px -60%", threshold: [0, 0.1, 0.25] }
  );

  sections.forEach((section) => observer.observe(section));
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => setActiveSection(link.dataset.section));
});

setActiveSection(window.location.hash.slice(1) || "about");

const reverseScrollIndicator = document.querySelector(".reverse-scroll-indicator");

if (reverseScrollIndicator) {
  const indicatorRule = reverseScrollIndicator.querySelector(".reverse-scroll-indicator__rule");
  const mainContent = document.querySelector(".site-shell > main");
  let animationFrame;

  const positionIndicatorBesideContent = () => {
    if (!mainContent || window.innerWidth <= 900) {
      reverseScrollIndicator.style.removeProperty("--indicator-right");
      return;
    }

    const spaceBesideContent = window.innerWidth - mainContent.getBoundingClientRect().right;
    const gapFromContent = Math.min(40, Math.max(20, spaceBesideContent * 0.15));
    const indicatorRight = Math.max(
      8,
      spaceBesideContent - gapFromContent - reverseScrollIndicator.offsetWidth
    );

    reverseScrollIndicator.style.setProperty("--indicator-right", `${indicatorRight}px`);
  };

  const updateReverseScrollIndicator = () => {
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = Math.max(documentHeight - window.innerHeight, 1);
    const scrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    const lineOverlap = (indicatorRule?.offsetHeight || 0) / 2;
    const topPosition = -lineOverlap;
    const bottomPosition = Math.max(
      topPosition,
      window.innerHeight - reverseScrollIndicator.offsetHeight + lineOverlap
    );
    const indicatorPosition = bottomPosition - (bottomPosition - topPosition) * scrollProgress;

    reverseScrollIndicator.style.setProperty("--indicator-y", `${indicatorPosition}px`);
    reverseScrollIndicator.classList.add("is-scroll-driven");
    animationFrame = null;
  };

  const queueIndicatorUpdate = () => {
    if (animationFrame) return;
    animationFrame = window.requestAnimationFrame(updateReverseScrollIndicator);
  };

  window.addEventListener("scroll", queueIndicatorUpdate, { passive: true });
  window.addEventListener("resize", () => {
    positionIndicatorBesideContent();
    queueIndicatorUpdate();
  });
  positionIndicatorBesideContent();
  updateReverseScrollIndicator();
}
