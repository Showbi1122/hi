(function () {
  "use strict";

  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (navbar) {
    let isScrolled = navbar.classList.contains("scrolled");

    window.addEventListener("scroll", function () {
      const next = window.scrollY > 40;
      if (next === isScrolled) return;
      isScrolled = next;
      navbar.classList.toggle("scrolled", next);
    }, { passive: true });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      requestAnimationFrame(function () {
        const isOpen = !navLinks.classList.contains("open");
        navLinks.classList.toggle("open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
      });
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (!navLinks.classList.contains("open")) return;
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion || isCoarsePointer ? "auto" : "smooth"
        });
      }
    });
  });

  function initNavObserver() {
    const sections = document.querySelectorAll("section[id]");
    const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
    if (!sections.length || !navAnchors.length) return;

    let activeSectionId = "";

    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || entry.target.id === activeSectionId) return;

        activeSectionId = entry.target.id;
        const activeHref = "#" + activeSectionId;

        navAnchors.forEach(function (a) {
          const shouldBeActive = a.getAttribute("href") === activeHref;
          if (a.classList.contains("active") !== shouldBeActive) {
            a.classList.toggle("active", shouldBeActive);
          }
        });
      });
    }, { rootMargin: "-40% 0px -50% 0px" });

    sections.forEach(function (section) { navObserver.observe(section); });
  }

  function initReveal() {
    document.querySelectorAll(".reveal").forEach(function (el) {
      new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 }).observe(el);
    });
  }

  function initModals() {
    document.querySelectorAll(".view-project[data-modal]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const modal = document.getElementById(this.getAttribute("data-modal"));
        if (modal && modal.style.display !== "flex") {
          requestAnimationFrame(function () {
            modal.style.display = "flex";
          });
        }
      });
    });

    function closeModal(modal) {
      if (modal.style.display !== "none") {
        modal.style.display = "none";
      }
    }

    document.querySelectorAll(".close-modal").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const modal = document.getElementById(this.getAttribute("data-modal"));
        if (modal) closeModal(modal);
      });
    });

    document.querySelectorAll(".project-modal").forEach(function (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal(modal);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      document.querySelectorAll(".project-modal").forEach(function (modal) {
        if (modal.style.display === "flex") closeModal(modal);
      });
    });
  }

  function scheduleIdle(work) {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(work, { timeout: 2000 });
      return;
    }
    setTimeout(work, 1);
  }

  function initDeferred() {
    initNavObserver();
    initReveal();
    initModals();
    if (!prefersReducedMotion && !isCoarsePointer) {
      initCustomCursor();
    }
  }

  if (document.readyState === "complete") {
    scheduleIdle(initDeferred);
  } else {
    window.addEventListener("load", function () {
      scheduleIdle(initDeferred);
    }, { once: true });
  }
})();

function initCustomCursor() {
  const mouseX = window.innerWidth / 2;
  const mouseY = window.innerHeight / 2;

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  dot.setAttribute("aria-hidden", "true");

  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  ring.setAttribute("aria-hidden", "true");

  document.body.appendChild(dot);
  document.body.appendChild(ring);
  document.body.classList.add("custom-cursor");

  let ringX = mouseX;
  let ringY = mouseY;
  let currentX = mouseX;
  let currentY = mouseY;
  let visible = false;
  let clicking = false;
  let isHovering = false;
  let cursorHidden = false;
  let hoverTarget = null;
  let hoverFramePending = false;

  const hoverSelector = "a, button, .btn, summary, .view-project, .project-card, .social-link, .sticky-whatsapp, .nav-toggle, .close-modal, .prev, .next, .faq-item summary";

  function applyHoverState(target) {
    const interactive = !!(target && target.closest && target.closest(hoverSelector));
    if (interactive === isHovering) return;
    isHovering = interactive;
    ring.classList.toggle("is-hover", interactive);
  }

  function scheduleHoverUpdate(target) {
    hoverTarget = target;
    if (hoverFramePending) return;
    hoverFramePending = true;
    requestAnimationFrame(function () {
      hoverFramePending = false;
      applyHoverState(hoverTarget);
    });
  }

  document.addEventListener("mousemove", function (e) {
    currentX = e.clientX;
    currentY = e.clientY;

    if (!visible) {
      visible = true;
      dot.classList.add("is-visible");
      ring.classList.add("is-visible");
      ringX = currentX;
      ringY = currentY;
    }

    scheduleHoverUpdate(e.target);
  }, { passive: true });

  document.addEventListener("mouseenter", function () {
    if (!cursorHidden) return;
    cursorHidden = false;
    document.body.classList.remove("cursor-hidden");
  });

  document.addEventListener("mouseleave", function () {
    if (cursorHidden) return;
    cursorHidden = true;
    document.body.classList.add("cursor-hidden");
  });

  document.addEventListener("mousedown", function () {
    if (clicking) return;
    clicking = true;
    ring.classList.add("is-click");
  });

  document.addEventListener("mouseup", function () {
    if (!clicking) return;
    clicking = false;
    ring.classList.remove("is-click");
  });

  function tick() {
    const scale = clicking ? 0.6 : 1;
    dot.style.transform = "translate3d(" + currentX + "px, " + currentY + "px, 0) scale(" + scale + ")";
    ringX += (currentX - ringX) * 0.14;
    ringY += (currentY - ringY) * 0.14;
    ring.style.transform = "translate3d(" + ringX + "px, " + ringY + "px, 0)";
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
