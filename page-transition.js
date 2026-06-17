export const FADE_MS = 450;
export const OH_URL  = '/office-hours/';

export function navigateWithFade(url) {
  sessionStorage.setItem('page-fade', '1');
  const overlay = document.getElementById('pageTransition');
  if (!overlay) {
    window.location.href = url;
    return;
  }
  overlay.classList.add('is-active');
  setTimeout(() => {
    window.location.href = url;
  }, FADE_MS);
}

export function initPageEnterFade() {
  if (!sessionStorage.getItem('page-fade')) return;
  sessionStorage.removeItem('page-fade');

  const overlay = document.getElementById('pageTransition');
  if (!overlay) return;

  overlay.classList.add('is-active');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.remove('is-active'));
  });
}
