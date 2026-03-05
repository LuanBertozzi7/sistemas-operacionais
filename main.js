// Barra de Progresso
const bar = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  bar.style.width = (scrolled / total) * 100 + "%";
});

// Scroll
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  },
  { threshold: 0.1 },
);

sections.forEach((s) => observer.observe(s));
