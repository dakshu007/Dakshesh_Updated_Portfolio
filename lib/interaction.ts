/**
 * Resolves on the visitor's first real interaction (pointer, touch, wheel,
 * scroll or key). Heavy, purely visual code (GSAP, Lenis, Three.js) waits for
 * this, so the first paint and the main thread stay free for content.
 */
let promise: Promise<void> | null = null;

const EVENTS = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;

export function whenInteracted(): Promise<void> {
  if (promise) return promise;
  promise = new Promise((resolve) => {
    // Arriving already scrolled (back button, hash link) counts as interaction.
    if (window.scrollY > 0) return resolve();
    const go = () => {
      EVENTS.forEach((e) => window.removeEventListener(e, go));
      resolve();
    };
    EVENTS.forEach((e) => window.addEventListener(e, go, { passive: true }));
  });
  return promise;
}
