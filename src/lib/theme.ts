// Light and dark themes. The choice is stored in localStorage and applied as
// data-theme on <html>; until the visitor picks one, the system setting is used.

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

// Browser UI colour (address bar on mobile) for each theme; matches --bg.
const THEME_COLOR: Record<Theme, string> = { light: '#ffffff', dark: '#0a0a0b' }

/**
 * Runs in <head> before the page paints, so there is no flash of the wrong
 * theme. Also follows system changes while the visitor hasn't chosen.
 */
export const themeScript = `(function () {
  try {
    var root = document.documentElement;
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    var colors = ${JSON.stringify(THEME_COLOR)};
    var stored = function () {
      var t = localStorage.getItem('${STORAGE_KEY}');
      return t === 'light' || t === 'dark' ? t : null;
    };
    var apply = function (t) {
      root.setAttribute('data-theme', t);
      document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
        m.setAttribute('content', colors[t]);
      });
    };
    apply(stored() || (media.matches ? 'dark' : 'light'));
    media.addEventListener('change', function (e) {
      if (!stored()) apply(e.matches ? 'dark' : 'light');
    });
  } catch (e) {}
})();`

export function getTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

export function setTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute('content', THEME_COLOR[theme])
  })
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}
