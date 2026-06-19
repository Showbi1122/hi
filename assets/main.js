(function () {
  "use strict";

  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (navbar) {
    window.addEventListener("scroll", function () {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", navLinks.classList.contains("open"));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
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
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

  if (sections.length && navAnchors.length) {
    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -50% 0px" });

    sections.forEach(function (section) { navObserver.observe(section); });
  }

  document.querySelectorAll(".reveal").forEach(function (el, i) {
    el.style.transitionDelay = (i % 5) * 0.07 + "s";
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 }).observe(el);
  });

  document.querySelectorAll(".tilt-card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) * 6;

      card.style.transform = "perspective(800px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-6px)";

      const glow = card.querySelector(".card-glow");
      if (glow) {
        glow.style.setProperty("--mx", (x / rect.width) * 100 + "%");
        glow.style.setProperty("--my", (y / rect.height) * 100 + "%");
      }
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

  document.querySelectorAll(".view-project[data-modal]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const modal = document.getElementById(this.getAttribute("data-modal"));
      if (modal) modal.style.display = "flex";
    });
  });

  function closeModal(modal) {
    modal.style.display = "none";
    modal.querySelectorAll("video").forEach(function (video) {
      video.pause();
      video.currentTime = 0;
    });
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

    let currentIndex = 0;
    const slides = modal.querySelectorAll(".slide");
    const prevBtn = modal.querySelector(".prev");
    const nextBtn = modal.querySelector(".next");

    function showSlide(index) {
      slides.forEach(function (s, i) { s.classList.toggle("active", i === index); });
    }

    if (prevBtn && nextBtn && slides.length) {
      prevBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
      });
      nextBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      });
      showSlide(0);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".project-modal").forEach(function (modal) {
        if (modal.style.display === "flex") closeModal(modal);
      });
    }
  });

  initCustomCursor();
})();

function initCustomCursor() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;

  var dot = document.createElement("div");
  dot.className = "cursor-dot";
  dot.setAttribute("aria-hidden", "true");

  var ring = document.createElement("div");
  ring.className = "cursor-ring";
  ring.setAttribute("aria-hidden", "true");

  document.body.appendChild(dot);
  document.body.appendChild(ring);
  document.body.classList.add("custom-cursor");

  var mouseX = window.innerWidth / 2;
  var mouseY = window.innerHeight / 2;
  var ringX = mouseX;
  var ringY = mouseY;
  var visible = false;
  var clicking = false;

  var hoverSelector = "a, button, .btn, summary, .view-project, .project-card, .social-link, .sticky-whatsapp, .nav-toggle, .close-modal, .prev, .next, .faq-item summary";

  function setHoverState(target) {
    var interactive = target && target.closest && target.closest(hoverSelector);
    ring.classList.toggle("is-hover", !!interactive);
  }

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!visible) {
      visible = true;
      dot.classList.add("is-visible");
      ring.classList.add("is-visible");
      ringX = mouseX;
      ringY = mouseY;
    }
    setHoverState(e.target);
  }, { passive: true });

  document.addEventListener("mouseenter", function () {
    document.body.classList.remove("cursor-hidden");
  });

  document.addEventListener("mouseleave", function () {
    document.body.classList.add("cursor-hidden");
  });

  document.addEventListener("mousedown", function () {
    clicking = true;
    ring.classList.add("is-click");
  });

  document.addEventListener("mouseup", function () {
    clicking = false;
    ring.classList.remove("is-click");
  });

  function updateModalCursor() {
    var anyOpen = false;
    document.querySelectorAll(".project-modal").forEach(function (m) {
      if (m.style.display === "flex") anyOpen = true;
    });
    document.body.classList.toggle("cursor-hidden", anyOpen);
  }

  document.querySelectorAll(".project-modal").forEach(function (modal) {
    new MutationObserver(updateModalCursor).observe(modal, {
      attributes: true,
      attributeFilter: ["style"]
    });
  });

  function tick() {
    var scale = clicking ? 0.6 : 1;
    dot.style.transform = "translate3d(" + mouseX + "px, " + mouseY + "px, 0) scale(" + scale + ")";
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.transform = "translate3d(" + ringX + "px, " + ringY + "px, 0)";
    requestAnimationFrame(tick);
  }

  tick();
}
