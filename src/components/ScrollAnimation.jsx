import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollAnimation() {
  const { pathname } = useLocation();

  useEffect(() => {
    const SELECTORS = 'h1, h2, h3, h4, h5, h6, p, button, .MuiButton-root, .MuiTypography-root, .MuiChip-root';
    const EXCLUDE_CONTAINERS = 'header, nav, .MuiAppBar-root, .MuiFormLabel-root, .MuiInputLabel-root, .MuiFormHelperText-root';

    const observer = new IntersectionObserver(
      (entries) => {
        // Group entries that are currently intersecting
        const intersecting = entries.filter(e => e.isIntersecting);

        // Group intersecting elements by their closest layout container
        const groups = new Map();
        intersecting.forEach(entry => {
          const el = entry.target;
          const container = el.closest('section, main, .MuiContainer-root, .MuiGrid-container, form, .MuiCard-root, [role="region"]') || document.body;
          if (!groups.has(container)) {
            groups.set(container, []);
          }
          groups.get(container).push(el);
        });

        // Within each group, sort by DOM position and apply the --stagger-index
        groups.forEach(group => {
          group.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
          group.forEach((el, index) => {
            el.style.setProperty('--stagger-index', index);
            el.classList.add('is-visible');
          });
        });

        // When elements leave the viewport, reset visibility state immediately
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            const el = entry.target;
            el.classList.remove('is-visible');
            el.style.removeProperty('--stagger-index');
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    const observed = new Set();

    const updateAnimations = () => {
      const candidates = document.querySelectorAll(SELECTORS);
      const toObserve = new Set();

      candidates.forEach((el) => {
        // 1. Skip if in header, nav, or text field helper elements
        if (el.closest(EXCLUDE_CONTAINERS)) return;

        // 2. Skip child elements of buttons, chips, headings, and paragraphs to avoid nested animations
        const parentBlock = el.parentElement?.closest('button, .MuiButton-root, .MuiChip-root, h1, h2, h3, h4, h5, h6, p');
        if (parentBlock) return;

        // 3. Skip Typography containers that wrap other blocks to avoid double animation
        if (el.classList.contains('MuiTypography-root')) {
          const hasInnerBlock = el.querySelector(SELECTORS);
          if (hasInnerBlock) return;
        }

        // 4. Skip elements with no text or content
        if (!el.textContent?.trim() && !el.querySelector('img, svg')) return;

        toObserve.add(el);
      });

      // Start observing new elements
      toObserve.forEach((el) => {
        if (!observed.has(el)) {
          el.classList.add('scroll-animate');
          observer.observe(el);
          observed.add(el);
        }
      });

      // Stop observing and clean up elements that are no longer in the DOM
      for (const el of Array.from(observed)) {
        if (!toObserve.has(el)) {
          observer.unobserve(el);
          el.classList.remove('scroll-animate', 'is-visible');
          el.style.removeProperty('--stagger-index');
          observed.delete(el);
        }
      }
    };

    // Run initial scan
    updateAnimations();

    // Use MutationObserver to watch for route changes and dynamically rendered elements
    let rafId = null;
    const mutationObserver = new MutationObserver(() => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateAnimations();
        rafId = null;
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      observed.forEach((el) => {
        el.classList.remove('scroll-animate', 'is-visible');
        el.style.removeProperty('--stagger-index');
      });
    };
  }, [pathname]);

  return null;
}
