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
    let isOpen = navLinks.classList.contains("open");

    navToggle.addEventListener("click", function () {
      isOpen = !isOpen;
      navLinks.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (!isOpen) return;
        isOpen = false;
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
        target.scrollIntoView({ behavior: "auto", block: "start" });
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
    function openModal(modal) {
      if (!modal.classList.contains("is-open")) {
        modal.classList.add("is-open");
      }
    }

    function closeModal(modal) {
      modal.classList.remove("is-open");
    }

    document.querySelectorAll(".view-project[data-modal]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const modal = document.getElementById(this.getAttribute("data-modal"));
        if (modal) openModal(modal);
      });
    });

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
      document.querySelectorAll(".project-modal.is-open").forEach(closeModal);
    });
  }

  function scheduleIdle(work) {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(work, { timeout: 3000 });
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
  let started = false;
  let dot;
  let ring;
  let ringX = 0;
  let ringY = 0;
  let currentX = 0;
  let currentY = 0;
  let visible = false;
  let clicking = false;
  let isHovering = false;
  let cursorHidden = false;
  let hoverTarget = null;
  let hoverFramePending = false;

  const hoverSelector = "a, button, .btn, summary, .view-project, .project-card, .social-link, .sticky-whatsapp, .close-modal, .prev, .next, .faq-item summary";

  function isOnNavbar(target) {
    return !!(target && target.closest && target.closest(".navbar"));
  }

  function updateNavbarCursorState(target) {
    if (!dot || !ring) return;
    const onNavbar = isOnNavbar(target);
    dot.classList.toggle("is-nav-hidden", onNavbar);
    ring.classList.toggle("is-nav-hidden", onNavbar);
    if (onNavbar) {
      ring.classList.remove("is-hover", "is-click");
      isHovering = false;
    }
  }

  function applyHoverState(target) {
    if (!ring || isOnNavbar(target)) return;
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

  function tick() {
    if (!started || !visible) return;
    const dotScale = clicking ? 0.6 : 1;
    dot.style.transform = "translate3d(" + currentX + "px, " + currentY + "px, 0) scale(" + dotScale + ")";
    ringX += (currentX - ringX) * 0.14;
    ringY += (currentY - ringY) * 0.14;
    let ringScale = 1;
    if (clicking) ringScale = 30 / 38;
    else if (isHovering) ringScale = 56 / 38;
    ring.style.transform = "translate3d(" + ringX + "px, " + ringY + "px, 0) scale(" + ringScale + ")";
  }

  function loop() {
    tick();
    requestAnimationFrame(loop);
  }

  function onMove(e) {
    currentX = e.clientX;
    currentY = e.clientY;

    if (!started) {
      started = true;
      dot = document.createElement("div");
      dot.className = "cursor-dot";
      dot.setAttribute("aria-hidden", "true");

      ring = document.createElement("div");
      ring.className = "cursor-ring";
      ring.setAttribute("aria-hidden", "true");

      document.body.appendChild(dot);
      document.body.appendChild(ring);
      document.body.classList.add("custom-cursor");

      ringX = currentX;
      ringY = currentY;
    }

    if (!visible) {
      visible = true;
      dot.classList.add("is-visible");
      ring.classList.add("is-visible");
    }

    updateNavbarCursorState(e.target);
    if (!isOnNavbar(e.target)) {
      scheduleHoverUpdate(e.target);
    }
  }

  document.addEventListener("mousemove", onMove, { passive: true });
  requestAnimationFrame(loop);

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

  document.addEventListener("mousedown", function (e) {
    if (isOnNavbar(e.target)) return;
    if (clicking) return;
    clicking = true;
    if (ring) ring.classList.add("is-click");
  });

  document.addEventListener("mouseup", function () {
    if (!clicking) return;
    clicking = false;
    if (ring) ring.classList.remove("is-click");
  });
}
