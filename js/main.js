(function () {
  "use strict";

  const NAV = [
    { href: "#register", id: "register", label: "Registration" },
    { href: "#about", id: "about", label: "About Event" },
    { href: "#agenda", id: "agenda", label: "Agenda" },
    { href: "#audience", id: "audience", label: "Audience" },
  ];

  const SECTION_IDS = NAV.map((item) => item.id);
  /* ===== Scroll spy ===== */
  let activeSection = "register";

  function updateActiveSection() {
    const headerOffset = 90;
    let current = SECTION_IDS[0];

    for (const id of SECTION_IDS) {
      const section = document.getElementById(id);
      if (!section) continue;
      if (section.getBoundingClientRect().top - headerOffset <= 0) {
        current = id;
      }
    }

    const nearBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48;
    if (nearBottom) current = SECTION_IDS[SECTION_IDS.length - 1];

    if (current === activeSection) return;
    activeSection = current;

    document.querySelectorAll("[data-nav-id]").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.navId === current);
    });
  }

  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("resize", updateActiveSection);
  updateActiveSection();

  /* ===== Scroll reveal (fade-up / scale-in) ===== */
  function initReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fadeTargets = [
      ".agentic-day",
      ".hero-brand",
      ".info-item",
      ".hero-tagline",
      ".about-heading",
      ".about-lead",
      ".about-divider",
      ".about-text > p:not(.about-lead)",
      ".speakers-section > h2",
      ".agenda-header > h2",
      ".agenda-header > p",
      ".session-card",
      ".who-intro > h2",
      ".who-intro > p",
      ".prerequisites",
      ".cta-brand-top",
      ".cta-collab",
      ".cta-tagline-wrap",
      ".btn-cta",
    ];

    const cardTargets = [
      ".speaker-row",
      ".speaker-card",
      ".audience-card",
    ];

    const scaleTargets = [".register-form"];

    const groups = [
      ".info-grid",
      ".speakers-mobile",
      ".speakers-desktop",
      ".agenda-sessions",
      ".audience-grid",
      ".about-text",
      ".agenda-header",
      ".who-intro",
      ".cta-brand",
      ".cta-inner",
    ];

    document.querySelectorAll(fadeTargets.join(",")).forEach((el) => {
      el.classList.add("reveal");
    });

    document.querySelectorAll(cardTargets.join(",")).forEach((el) => {
      el.classList.add("reveal-card");
    });

    document.querySelectorAll(scaleTargets.join(",")).forEach((el) => {
      el.classList.add("reveal-scale");
    });

    groups.forEach((selector) => {
      document.querySelectorAll(selector).forEach((group) => {
        const children = Array.from(group.children).filter(
          (child) =>
            child.classList.contains("reveal") ||
            child.classList.contains("reveal-scale") ||
            child.classList.contains("reveal-card"),
        );
        const step = group.matches(".speakers-desktop, .speakers-mobile, .audience-grid")
          ? 110
          : 80;
        children.forEach((child, index) => {
          child.style.setProperty("--reveal-delay", `${index * step}ms`);
        });
      });
    });

    const heroCascade = document.querySelectorAll(
      ".agentic-day, .hero-brand, .info-item, .hero-tagline, .register-form",
    );
    heroCascade.forEach((el, index) => {
      if (!el.style.getPropertyValue("--reveal-delay")) {
        el.style.setProperty("--reveal-delay", `${index * 70}ms`);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("is-visible");

          if (el.classList.contains("reveal-card")) {
            const onEnd = (event) => {
              if (event.target !== el) return;
              el.classList.add("reveal-done");
              el.removeEventListener("animationend", onEnd);
            };
            el.addEventListener("animationend", onEnd);
            // Fallback if animationend missed
            window.setTimeout(() => el.classList.add("reveal-done"), 1200);
          }

          observer.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    document
      .querySelectorAll(".reveal, .reveal-scale, .reveal-card")
      .forEach((el) => observer.observe(el));
  }

  initReveal();

  /* ===== Mobile menu ===== */
  const mobileMenu = document.getElementById("mobile-menu");
  const menuOpenBtn = document.getElementById("menu-open");
  const menuCloseBtn = document.getElementById("menu-close");

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  menuOpenBtn?.addEventListener("click", openMenu);
  menuCloseBtn?.addEventListener("click", closeMenu);

  document.querySelectorAll(".mobile-nav-card, .btn-mobile-cta, .mobile-menu-top a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.querySelectorAll(".header-nav a, .btn-header-cta, .header-inner > a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const id = href.slice(1);
        if (SECTION_IDS.includes(id)) activeSection = id;
        updateActiveSection();
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeMenu();
  });

  /* ===== CTA shimmer ===== */
  const ctaSection = document.getElementById("cta-section");
  const ctaTagline = document.getElementById("cta-tagline");
  let ctaWasVisible = false;

  if (ctaSection && ctaTagline) {
    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ctaWasVisible) {
          ctaWasVisible = true;
          ctaTagline.classList.remove("is-shimmer");
          void ctaTagline.offsetWidth;
          ctaTagline.classList.add("is-shimmer");
        }
      },
      { threshold: 0.45 },
    );
    ctaObserver.observe(ctaSection);

    ctaTagline.addEventListener("animationend", () => {
      ctaTagline.classList.remove("is-shimmer");
    });
  }

})();
