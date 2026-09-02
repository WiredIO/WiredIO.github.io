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
