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

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");
const themeStorageKey = "site-theme";
const githubSVG = document.getElementById("github-svg");
const githubIconLight = "./resources/github.svg";
const githubIconDark = "./resources/github-clean.svg";
const themeIconMoon = "./resources/moon.svg";
const themeIconSun = "./resources/sun.svg";

function setTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-theme", isDark);
  themeLabel.textContent = isDark ? "Modo claro" : "Modo escuro";
  themeToggle.setAttribute("aria-pressed", String(isDark));

  if (themeIcon) {
    themeIcon.src = isDark ? themeIconSun : themeIconMoon;
  }

  if (githubSVG) {
    githubSVG.src = isDark ? githubIconDark : githubIconLight;
  }
}

const savedTheme = localStorage.getItem(themeStorageKey);
if (savedTheme === "dark" || savedTheme === "light") {
  setTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark-theme")
    ? "light"
    : "dark";
  setTheme(nextTheme);
  localStorage.setItem(themeStorageKey, nextTheme);
});
