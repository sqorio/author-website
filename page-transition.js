export const FADE_MS = 650;
export const OH_URL  = '/office-hours/';

export function navigateWithFade(url) {
  sessionStorage.setItem('page-fade', '1');
  const overlay = document.getElementById('pageTransition');
  if (!overlay) {
    window.location.href = url;
    return;
  }

  const go = () => { window.location.href = url; };

  overlay.classList.add('is-active');
  overlay.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'opacity') go();
  }, { once: true });
  setTimeout(go, FADE_MS + 100);
}

export function initPageEnterFade() {
  if (!sessionStorage.getItem('page-fade')) return;
  sessionStorage.removeItem('page-fade');

  const overlay = document.getElementById('pageTransition');
  const html = document.documentElement;
  if (!overlay) return;

  overlay.classList.add('is-active');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      html.classList.remove('page-enter-pending');
      html.classList.add('page-enter-fading');
      overlay.classList.remove('is-active');
      overlay.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'opacity') html.classList.remove('page-enter-fading');
      }, { once: true });
    });
  });
}
