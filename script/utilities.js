function getScrollProgress(scrolled, total) {
  if (total <= 0) return 0;
  return (scrolled / total) * 100;
}

function getPreferredTheme(storageKey) {
  const savedTheme = localStorage.getItem(storageKey);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function getNextTheme(currentIsDark) {
  return currentIsDark ? "light" : "dark";
}

function formatDatePtBr(isoDate, timeZone) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone,
  }).format(date);
}
