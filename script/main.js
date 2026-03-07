const PROGRESS_BAR = document.getElementById("progress");
const UPDATE_AT = document.getElementById("update-at");
const THEME_TOGGLE = document.getElementById("theme-toggle");
const THEME_ICON = document.getElementById("theme-icon");
const THEME_LABEL = document.getElementById("theme-label");
const GITHUB_SVG = document.getElementById("github-svg");
const SECTIONS = document.querySelectorAll("section");

const THEME_STORAGE_KEY = "site-theme";
const GITHUB_OWNER = "LuanBertozzi7";
const GITHUB_REPO = "sistemas-operacionais";
const GITHUB_REPO_API = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;
const GITHUB_ICON_LIGHT = "./resources/github.svg";
const GITHUB_ICON_DARK = "./resources/github-clean.svg";
const THEME_ICON_MOON = "./resources/moon.svg";
const THEME_ICON_SUN = "./resources/sun.svg";

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-theme", isDark);
  THEME_LABEL.textContent = isDark ? "Modo claro" : "Modo escuro";
  THEME_TOGGLE.setAttribute("aria-pressed", String(isDark));

  if (THEME_ICON) {
    THEME_ICON.src = isDark ? THEME_ICON_SUN : THEME_ICON_MOON;
  }

  if (GITHUB_SVG) {
    GITHUB_SVG.src = isDark ? GITHUB_ICON_DARK : GITHUB_ICON_LIGHT;
  }
}

function initProgressBar() {
  if (!PROGRESS_BAR) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    PROGRESS_BAR.style.width = `${getScrollProgress(scrolled, total)}%`;
  });
}

function initScrollReveal() {
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

  SECTIONS.forEach((section) => observer.observe(section));
}

function initThemeToggle() {
  if (!THEME_TOGGLE || !THEME_LABEL) return;

  applyTheme(getPreferredTheme(THEME_STORAGE_KEY));

  THEME_TOGGLE.addEventListener("click", () => {
    const nextTheme = getNextTheme(
      document.body.classList.contains("dark-theme"),
    );
    applyTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  });

  // Ouve mudanças na preferência de cor do sistema operacional
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
}

async function renderLastRepoUpdate() {
  if (!UPDATE_AT) return;

  UPDATE_AT.textContent = "Última atualização: carregando...";

  try {
    const response = await fetch(GITHUB_REPO_API);
    if (!response.ok) {
      throw new Error(`GitHub API status ${response.status}`);
    }

    const data = await response.json();
    const formattedDate = formatDatePtBr(data.updated_at, "America/Manaus");
    UPDATE_AT.textContent = `Última atualização: ${formattedDate}`;
  } catch (error) {
    UPDATE_AT.textContent = "Última atualização: indisponível no momento";
  }
}

initProgressBar();
initScrollReveal();
initThemeToggle();
renderLastRepoUpdate();
