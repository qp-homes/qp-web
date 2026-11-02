/**
 * Scroll choreography (progressive enhancement).
 *
 * Everything this file animates is already complete, readable HTML. GSAP and
 * Lenis load after the page is interactive and only when the visitor has not
 * asked for reduced motion, so SEO, LCP and no-JS rendering are unaffected.
 *
 * Hooks (data attributes):
 *   [data-hero]          hero: background drifts, content eases out on scroll
 *   [data-scrub-words]   statement text lights up word by word while scrolling
 *   [data-hscroll]       section pins and its [data-hscroll-track] scrolls sideways (desktop)
 *   [data-clip]          image frame reveals with a clip + scale when it enters
 *   [data-magnetic]      element leans toward the pointer (fine pointers only)
 *   [data-cursor="Text"] custom cursor shows a label over the element (fine pointers only)
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

function whenIdle(cb: () => void) {
  if ('requestIdleCallback' in window) window.requestIdleCallback(cb, { timeout: 1200 });
  else setTimeout(cb, 300);
}

async function init() {
  if (reduceMotion.matches) return;

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('has-motion');

  // Smooth scrolling on desktop pointers only; touch keeps native scrolling.
  if (finePointer.matches) {
    const { default: Lenis } = await import('lenis');
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    // Keep in-page anchors (skip link, #faq…) working through Lenis.
    document.addEventListener('click', (e) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || a.getAttribute('href') === '#') return;
      const target = document.querySelector(a.getAttribute('href')!);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -80 });
      }
    });
  }

  heroMotion(gsap);
  scrubWords(gsap);
  horizontalSections(gsap, ScrollTrigger);
  clipReveals(gsap);
  if (finePointer.matches) {
    magnetic(gsap);
    cursor(gsap);
  }

  // Images loading late can change heights; recalculate trigger positions.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

type G = typeof import('gsap').gsap;

function heroMotion(gsap: G) {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const tl = gsap.timeline({
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
  tl.to(hero.querySelector('[data-hero-bg]'), { yPercent: 18, scale: 1.08, ease: 'none' }, 0).to(
    hero.querySelector('[data-hero-content]'),
    { y: -80, opacity: 0.15, ease: 'none' },
    0,
  );
}

function scrubWords(gsap: G) {
  document.querySelectorAll<HTMLElement>('[data-scrub-words]').forEach((el) => {
    // Wrap words at runtime (crawlers get the plain server-rendered text).
    // Screen readers read one intact hidden copy instead of word fragments.
    const text = el.textContent!.trim();
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const words = text.split(/\s+/).map((w) => `<span class="sw">${esc(w)}</span>`).join(' ');
    el.innerHTML = `<span class="visually-hidden">${esc(text)}</span><span aria-hidden="true">${words}</span>`;
    gsap.fromTo(
      el.querySelectorAll('.sw'),
      { opacity: 0.18 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
      },
    );
  });
}

function horizontalSections(gsap: G, ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger) {
  const mm = gsap.matchMedia();
  mm.add('(min-width: 64rem)', () => {
    document.querySelectorAll<HTMLElement>('[data-hscroll]').forEach((section) => {
      const track = section.querySelector<HTMLElement>('[data-hscroll-track]');
      const bar = section.querySelector<HTMLElement>('[data-hscroll-progress]');
      if (!track) return;
      section.classList.add('is-pinned');
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => bar && (bar.style.transform = `scaleX(${self.progress})`),
        },
      });
      // Images inside panels drift slightly against the track for depth.
      track.querySelectorAll<HTMLElement>('[data-hscroll-img]').forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        );
      });
      return () => section.classList.remove('is-pinned');
    });
    ScrollTrigger.refresh();
  });
}

function clipReveals(gsap: G) {
  document.querySelectorAll<HTMLElement>('[data-clip]').forEach((frame) => {
    const img = frame.querySelector('img');
    gsap
      .timeline({ scrollTrigger: { trigger: frame, start: 'top 88%', once: true } })
      .fromTo(
        frame,
        { clipPath: 'inset(18% 10% 18% 10% round 14px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.3, ease: 'expo.out' },
      )
      .fromTo(img, { scale: 1.22 }, { scale: 1, duration: 1.6, ease: 'expo.out' }, 0);
  });
}

function magnetic(gsap: G) {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = 0.3;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

function cursor(gsap: G) {
  const dot = document.createElement('div');
  dot.className = 'cursor';
  dot.setAttribute('aria-hidden', 'true');
  dot.innerHTML = '<span class="cursor-label"></span>';
  document.body.append(dot);
  const label = dot.querySelector<HTMLElement>('.cursor-label')!;
  const xTo = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3.out' });
  const yTo = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3.out' });

  window.addEventListener('pointermove', (e) => {
    dot.classList.add('is-visible');
    xTo(e.clientX);
    yTo(e.clientY);
  });
  document.addEventListener('pointerleave', () => dot.classList.remove('is-visible'));
  document.addEventListener('pointerover', (e) => {
    const t = (e.target as Element).closest<HTMLElement>('[data-cursor]');
    const link = (e.target as Element).closest('a, button, summary, label, input, select, textarea');
    dot.classList.toggle('has-label', Boolean(t));
    dot.classList.toggle('is-link', Boolean(link) && !t);
    label.textContent = t?.dataset.cursor ?? '';
  });
}

whenIdle(init);
