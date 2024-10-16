"use client";

export function toggleTheme() {
  const isDarkMode = localStorage.getItem("dark-mode");

  if (isDarkMode === "true") {
    localStorage.setItem("dark-mode", "false");
    document.documentElement.classList.toggle("dark", false);
  } else {
    localStorage.setItem("dark-mode", "true");
    document.documentElement.classList.toggle("dark", true);
  }

  return isDarkMode !== "true";
}

export function initTheme() {
  const isDarkMode = isDark();
  document.documentElement.classList.toggle("dark", isDarkMode);
}

export function isDark() {
  return localStorage.getItem("dark-mode") === "true";
}
