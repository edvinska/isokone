'use strict';
const root = document.documentElement;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const hero = document.querySelector('.hero-runway');
const heroStage = document.querySelector('.hero-stage');
const rail = document.querySelector('.work-runway');
const railStage = document.querySelector('.work-stage');
const track = document.querySelector('.work-track');
const workWindow = document.querySelector('.work-window');
const sceneImages = [...document.querySelectorAll('.scene-image')];
const sceneLinks = [...document.querySelectorAll('[data-scene-step]')];
const phaseTexts = ['Isot koneet. Oikeaan paikkaan.', 'Voimaa nostoon. Kokemusta työhön.', 'Viimeiset metrit. Tarkka ote.'];
const phaseNames = ['KULJETUS', 'NOSTO', 'HAALAUS'];
const pageProgress = document.querySelector('.page-progress');
const floatingCall = document.querySelector('.floating-call');
const contact = document.querySelector('.contact');
let geometry = {}, frameQueued = false, measureQueued = false, currentPhase = -1;
const clamp = value => Math.min(1, Math.max(0, value));
function setMenu(open) {
 menu.setAttribute('aria-expanded', String(open));
 menu.innerHTML = open ? 'Sulje <span aria-hidden="true">−</span>' : 'Valikko <span aria-hidden="true">+</span>';
 navigation.classList.toggle('open', open);
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
 if (event.key === 'Escape' && navigation.classList.contains('open')) { setMenu(false); menu.focus(); }
});
function setPhase(index) {
 if (index === currentPhase) return;
 currentPhase = index;
 sceneImages.forEach((image, i) => { image.classList.toggle('active', i === index); image.setAttribute('aria-hidden', String(i !== index)); });
 sceneLinks.forEach((link, i) => { link.classList.toggle('active', i === index); if (i === index) link.setAttribute('aria-current', 'step'); else link.removeAttribute('aria-current'); });
 document.querySelector('.scene-eyebrow').textContent = '0' + (index + 1) + ' / ' + phaseNames[index];
 document.querySelector('.scene-number').textContent = '0' + (index + 1);
 document.querySelector('.scene-description').textContent = phaseTexts[index];
}
function measure() {
 const reading = parseFloat(getComputedStyle(root).fontSize) > 20 || (innerWidth <= 760 && innerHeight <= 700);
 root.classList.toggle('reading-mode', reading);
 const animated = !reducedMotion.matches && !reading && innerHeight > 640;
 const railAnimated = animated && innerWidth >= 900 && innerHeight > 740;
 root.classList.toggle('scene-mode', animated);
 root.classList.toggle('rail-mode', railAnimated);
 if (innerWidth > 760) setMenu(false);
 const header = document.querySelector('.header').offsetHeight;
 geometry = {
  header, animated, railAnimated,
  heroTop: hero.getBoundingClientRect().top + scrollY - header,
  heroRange: Math.max(1, hero.offsetHeight - heroStage.offsetHeight),
  railTop: rail.getBoundingClientRect().top + scrollY - header,
  railRange: Math.max(1, rail.offsetHeight - railStage.offsetHeight),
  railDistance: Math.max(0, track.scrollWidth - workWindow.clientWidth),
  contactTop: contact.getBoundingClientRect().top + scrollY,
  heroEnd: hero.getBoundingClientRect().top + scrollY + hero.offsetHeight,
  tickerTop: document.querySelector('.ticker').getBoundingClientRect().top + scrollY,
  tickerHeight: document.querySelector('.ticker').offsetHeight,
  pageRange: Math.max(1, document.documentElement.scrollHeight - innerHeight)
 };
 if (railAnimated) workWindow.scrollLeft = 0;
 measureQueued = false;
 render();
}
function render() {
 frameQueued = false;
 if (!geometry.pageRange) return;
 const heroProgress = geometry.animated ? clamp((scrollY - geometry.heroTop) / geometry.heroRange) : 0;
 const railProgress = geometry.railAnimated ? clamp((scrollY - geometry.railTop) / geometry.railRange) : clamp(workWindow.scrollLeft / Math.max(1, geometry.railDistance));
 root.style.setProperty('--hero-progress', heroProgress.toFixed(4));
 root.style.setProperty('--ticker-progress', geometry.animated ? clamp((scrollY + innerHeight - geometry.tickerTop) / (innerHeight + geometry.tickerHeight)).toFixed(4) : '0');
 root.style.setProperty('--rail-progress', railProgress.toFixed(4));
 root.style.setProperty('--rail-x', geometry.railAnimated ? (-railProgress * geometry.railDistance).toFixed(2) + 'px' : '0px');
 setPhase(Math.min(2, Math.floor(heroProgress * 3)));
 pageProgress.style.width = (clamp(scrollY / geometry.pageRange) * 100).toFixed(2) + '%';
 floatingCall.classList.toggle('visible', scrollY > geometry.heroEnd - geometry.header && scrollY + innerHeight < geometry.contactTop + 100);
}
function queueFrame() { if (!frameQueued) { frameQueued = true; requestAnimationFrame(render); } }
function queueMeasure() { if (!measureQueued) { measureQueued = true; requestAnimationFrame(measure); } }
addEventListener('scroll', queueFrame, { passive: true });
workWindow.addEventListener('scroll', queueFrame, { passive: true });
addEventListener('resize', queueMeasure);
addEventListener('load', queueMeasure);
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) root.classList.remove('reveal-mode'); queueMeasure(); });
document.fonts.ready.then(queueMeasure);
sceneLinks.forEach(link => link.addEventListener('click', event => {
 if (!geometry.animated) return;
 event.preventDefault();
 const index = Number(link.dataset.sceneStep);
 scrollTo({ top: geometry.heroTop + geometry.heroRange * ((index + .15) / 3), behavior: 'smooth' });
}));
if ('IntersectionObserver' in window) {
 if (!reducedMotion.matches) {
  root.classList.add('reveal-mode');
  const reveals = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); reveals.unobserve(entry.target); } }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(element => reveals.observe(element));
 }
 const ticker = document.querySelector('.ticker-track');
 new IntersectionObserver(entries => entries.forEach(entry => { ticker.style.animationPlayState = entry.isIntersecting ? '' : 'paused'; })).observe(document.querySelector('.ticker'));
}
if ('ResizeObserver' in window) new ResizeObserver(queueMeasure).observe(document.querySelector('main'));
document.querySelectorAll('.service').forEach(details => details.addEventListener('toggle', () => {
 if (details.open) document.querySelectorAll('.service').forEach(other => { if (other !== details) other.open = false; });
 queueMeasure();
}));
let keyboardNavigation = false;
document.addEventListener('keydown', event => { if (event.key === 'Tab') keyboardNavigation = true; });
document.addEventListener('pointerdown', () => { keyboardNavigation = false; }, { passive: true });
track.addEventListener('focusin', event => {
 const card = event.target.closest('.work-card');
 if (!card || !geometry.railAnimated || !keyboardNavigation || document.querySelector('dialog').open) return;
 const padding = parseFloat(getComputedStyle(track).paddingLeft);
 const position = clamp((card.offsetLeft - padding) / Math.max(1, geometry.railDistance));
 scrollTo({ top: geometry.railTop + geometry.railRange * position, behavior: 'instant' });
});
const dialog = document.querySelector('.lightbox');
let previousFocus;
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
 previousFocus = button;
 dialog.querySelector('img').src = button.dataset.image;
 dialog.querySelector('img').alt = button.querySelector('img').alt;
 dialog.querySelector('p').textContent = button.dataset.caption;
 dialog.showModal();
 document.body.classList.add('modal-open');
}));
dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
 const bounds = dialog.getBoundingClientRect();
 if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); if (previousFocus) previousFocus.focus({ preventScroll: true }); });
const quoteForm = document.querySelector('#quote-form');
const quoteResult = document.querySelector('.quote-result');
const serviceField = document.querySelector('#service');
const projectField = document.querySelector('#project');
quoteForm.addEventListener('submit', event => {
 event.preventDefault();
 const description = projectField.value.trim();
 if (!description) { projectField.setCustomValidity('Kerro lyhyesti koneesta ja siirtotyöstä.'); projectField.reportValidity(); return; }
 projectField.setCustomValidity('');
 const body = 'Hei Henry,\n\nHaluaisin keskustella seuraavasta työstä.\n\nPalvelu: ' + serviceField.value + '\n\nKone, kohde ja aikataulu:\n' + description + '\n\nYstävällisin terveisin,\n';
 quoteResult.querySelector('pre').textContent = body;
 document.querySelector('#quote-email').href = 'mailto:henkka@isokone.fi?subject=' + encodeURIComponent('Tarjouspyyntö — ' + serviceField.value) + '&body=' + encodeURIComponent(body);
 quoteResult.hidden = false;
 queueMeasure();
});
quoteForm.addEventListener('input', () => { projectField.setCustomValidity(''); quoteResult.hidden = true; });
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { serviceField.value = link.dataset.service; quoteResult.hidden = true; }));
measure();