/**
 * Theme configuration for RatingFlow.
 *
 * Change DEFAULT_THEME to 'dark' to switch the entire app to dark mode.
 * Alternatively, set VITE_DEFAULT_THEME=dark in .env to override.
 *
 * The QR feedback page (/f) is unaffected — it uses dynamic inline
 * CSS variables from the client config, which always take priority.
 */
export const DEFAULT_THEME = 'light' // 'light' | 'dark'

export function initTheme() {
  const theme = import.meta.env.VITE_DEFAULT_THEME || DEFAULT_THEME

  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
