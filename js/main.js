(function () {
  "use strict";

  const NAV = [
    { href: "#register", id: "register", label: "Registration" },
    { href: "#about", id: "about", label: "About Event" },
    { href: "#agenda", id: "agenda", label: "Agenda" },
    { href: "#audience", id: "audience", label: "Audience" },
  ];

  const SECTION_IDS = NAV.map((item) => item.id);
  const HUBSPOT_URL =
    "https://api.hsforms.com/submissions/v3/integration/submit/47057450/e7fb03ed-e9cc-45b3-956c-4196adf1f761";

  const COMPANY_TYPES = [
    "Private Limited Company",
    "Public Limited Company",
    "Sole Proprietorship",
    "Partnership Firm",
    "Others",
  ];

  const SUCCESS_CONFETTI = [
    { x: -72, y: -58, delay: "0.05s", color: "#17a5fb", size: 8, rot: 18, shape: "rect" },
    { x: 68, y: -52, delay: "0.08s", color: "#ed0082", size: 7, rot: -24, shape: "circle" },
    { x: -48, y: -78, delay: "0.12s", color: "#ff9900", size: 6, rot: 40, shape: "ribbon" },
    { x: 42, y: -82, delay: "0.1s", color: "#22c55e", size: 7, rot: -12, shape: "diamond" },
    { x: -88, y: -18, delay: "0.18s", color: "#a855f7", size: 6, rot: 55, shape: "rect" },
    { x: 90, y: -12, delay: "0.15s", color: "#17a5fb", size: 8, rot: -35, shape: "circle" },
    { x: -70, y: 28, delay: "0.22s", color: "#f472b6", size: 5, rot: 28, shape: "ribbon" },
    { x: 74, y: 32, delay: "0.2s", color: "#ff9900", size: 6, rot: -48, shape: "diamond" },
    { x: -28, y: -96, delay: "0.14s", color: "#60a5fa", size: 5, rot: 8, shape: "rect" },
    { x: 18, y: -98, delay: "0.16s", color: "#34d399", size: 5, rot: -20, shape: "circle" },
    { x: -98, y: -42, delay: "0.24s", color: "#ed0082", size: 4, rot: 70, shape: "ribbon" },
    { x: 100, y: -38, delay: "0.26s", color: "#22c55e", size: 5, rot: -62, shape: "diamond" },
    { x: -56, y: 52, delay: "0.28s", color: "#17a5fb", size: 6, rot: 15, shape: "rect" },
    { x: 58, y: 56, delay: "0.3s", color: "#a855f7", size: 5, rot: -30, shape: "circle" },
    { x: 0, y: -108, delay: "0.11s", color: "#ff9900", size: 4, rot: 0, shape: "ribbon" },
    { x: -110, y: 8, delay: "0.32s", color: "#60a5fa", size: 4, rot: 42, shape: "diamond" },
    { x: 112, y: 6, delay: "0.34s", color: "#f472b6", size: 4, rot: -44, shape: "rect" },
    { x: -36, y: 70, delay: "0.36s", color: "#22c55e", size: 5, rot: 22, shape: "circle" },
    { x: 38, y: 74, delay: "0.38s", color: "#ed0082", size: 5, rot: -18, shape: "ribbon" },
    { x: -84, y: -68, delay: "0.2s", color: "#34d399", size: 5, rot: 33, shape: "diamond" },
  ];

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  /* ===== Form ===== */
  const formWrap = document.getElementById("form-wrap");
  const form = document.getElementById("register-form");
  if (!form || !formWrap) return;

  const fields = {
    name: document.getElementById("field-name"),
    email: document.getElementById("field-email"),
    organization: document.getElementById("field-organization"),
    role: document.getElementById("field-role"),
    country: document.getElementById("field-country"),
    city: document.getElementById("field-city"),
    phone: document.getElementById("field-phone"),
    industry: document.getElementById("field-industry"),
  };

  const dropdownBtn = document.getElementById("company-type-btn");
  const dropdownMenu = document.getElementById("company-type-menu");
  const dropdownValue = document.getElementById("company-type-value");
  const interestBtns = document.querySelectorAll(".interest-btn");
  const formErrorBanner = document.getElementById("form-error-banner");
  const submitBtn = document.getElementById("submit-btn");

  let companyType = "";
  let interest = "business";
  let dropdownOpen = false;

  function isValidPhone(value) {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
  }

  function validateField(key, value) {
    const trimmed = (value || "").trim();
    switch (key) {
      case "name":
        return trimmed ? "" : "Please enter your full name.";
      case "email":
        if (!trimmed) return "Please enter your work email address.";
        if (!EMAIL_RE.test(trimmed)) return "Please enter a valid work email address.";
        return "";
      case "organization":
        return trimmed ? "" : "Please enter your organization name.";
      case "role":
        return trimmed ? "" : "Please enter your role.";
      case "companyType":
        return trimmed ? "" : "Please select a company type.";
      case "country":
        return trimmed ? "" : "Please enter your country.";
      case "city":
        return trimmed ? "" : "Please enter your city.";
      case "phone":
        if (!trimmed) return "Please enter your mobile number.";
        if (!isValidPhone(trimmed)) return "Please enter a valid mobile number.";
        return "";
      case "industry":
        return trimmed ? "" : "Please enter your industry.";
      case "interest":
        return trimmed ? "" : "Please select an option.";
      default:
        return "";
    }
  }

  function setFieldError(key, message) {
    const fieldEl = document.querySelector(`[data-field="${key}"]`);
    const errorEl = document.getElementById(`${key}-error`);
    if (!fieldEl) return;
    fieldEl.classList.toggle("is-invalid", Boolean(message));
    dropdownBtn?.classList.toggle("is-invalid", key === "companyType" && Boolean(message));
    if (errorEl) {
      errorEl.textContent = message || "";
      errorEl.hidden = !message;
    }
  }

  function clearFieldError(key) {
    setFieldError(key, "");
  }

  Object.entries(fields).forEach(([key, input]) => {
    if (!input) return;
    input.addEventListener("input", () => {
      const msg = validateField(key, input.value);
      if (!msg) clearFieldError(key);
    });
    input.addEventListener("blur", () => {
      setFieldError(key, validateField(key, input.value));
    });
  });

  /* Company type dropdown */
  if (dropdownMenu && dropdownBtn && dropdownValue) {
    COMPANY_TYPES.forEach((option) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dropdown-option";
      btn.textContent = option;
      btn.addEventListener("click", () => {
        companyType = option;
        dropdownValue.textContent = option;
        dropdownValue.classList.add("has-value");
        dropdownMenu.querySelectorAll(".dropdown-option").forEach((el) => {
          el.classList.toggle("is-selected", el.textContent === option);
        });
        closeDropdown();
        clearFieldError("companyType");
      });
      dropdownMenu.appendChild(btn);
    });

    dropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownOpen ? closeDropdown() : openDropdown();
    });

    document.addEventListener("click", () => {
      if (dropdownOpen) closeDropdown();
    });
  }

  function openDropdown() {
    dropdownOpen = true;
    dropdownBtn?.classList.add("is-open");
    dropdownMenu?.removeAttribute("hidden");
  }

  function closeDropdown() {
    dropdownOpen = false;
    dropdownBtn?.classList.remove("is-open");
    dropdownMenu?.setAttribute("hidden", "");
  }

  /* Interest radios */
  interestBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      interest = btn.dataset.interest || "";
      interestBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        const img = b.querySelector("img");
        if (img) {
          img.src = active ? "assets/ic-radio-on.svg" : "assets/ic-radio-off.svg";
        }
      });
      clearFieldError("interest");
    });
  });

  function splitName(name) {
    const cleaned = name.trim().replace(/\s+/g, " ");
    if (!cleaned) return { firstname: "", lastname: "" };
    const parts = cleaned.split(" ");
    if (parts.length === 1) return { firstname: parts[0], lastname: "." };
    return { firstname: parts[0], lastname: parts.slice(1).join(" ") };
  }

  function showSuccessState() {
    const confettiHtml = SUCCESS_CONFETTI.map((piece) => {
      const h = piece.shape === "ribbon" ? piece.size * 2.4 : piece.size;
      return `<span class="success-burst success-burst--${piece.shape}" style="width:${piece.size}px;height:${h}px;background-color:${piece.color};animation-delay:${piece.delay};--burst-x:${piece.x}px;--burst-y:${piece.y}px;--burst-rot:${piece.rot}deg" aria-hidden="true"></span>`;
    }).join("");

    formWrap.innerHTML = `
      <div id="register-form" class="success-card" role="status" aria-live="polite">
        <img src="assets/success-glow-left.svg" alt="" class="success-glow-left" aria-hidden="true" />
        <img src="assets/success-glow-right.svg" alt="" class="success-glow-right" aria-hidden="true" />
        <div class="success-inner">
          <div class="success-hero">
            <span class="success-glow" aria-hidden="true"></span>
            <span class="success-check-ring success-check-ring--outer" aria-hidden="true"></span>
            <span class="success-check-ring success-check-ring--mid" aria-hidden="true"></span>
            <span class="success-check-ring success-check-ring--inner" aria-hidden="true"></span>
            ${confettiHtml}
            <div class="success-check">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path class="success-check-mark" d="M12 24.5L20.5 33L36 15.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="success-copy">
            <p>Thank you for your interest.<br />The confirmation details will be sent to the registered Email ID.</p>
            <div class="success-divider" aria-hidden="true"></div>
            <p>Can't find the email? Check your Spam folder.</p>
          </div>
        </div>
      </div>`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (formErrorBanner) {
      formErrorBanner.hidden = true;
      formErrorBanner.textContent = "";
    }
    closeDropdown();

    const values = {};
    let hasErrors = false;

    Object.entries(fields).forEach(([key, input]) => {
      if (!input) return;
      values[key] = input.value;
      const msg = validateField(key, input.value);
      setFieldError(key, msg);
      if (msg) hasErrors = true;
    });

    const companyMsg = validateField("companyType", companyType);
    setFieldError("companyType", companyMsg);
    if (companyMsg) {
      hasErrors = true;
      openDropdown();
    }

    const interestMsg = validateField("interest", interest);
    setFieldError("interest", interestMsg);
    if (interestMsg) hasErrors = true;

    if (hasErrors) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
      const arrow = submitBtn.querySelector("img");
      if (arrow) arrow.remove();
    }

    const { firstname, lastname } = splitName(values.name);

    const payload = {
      fields: [
        { name: "email", value: values.email.trim() },
        { name: "firstname", value: firstname },
        { name: "lastname", value: lastname },
        { name: "company", value: values.organization.trim() },
        { name: "jobtitle", value: values.role.trim() },
        { name: "0-2/type_of_account__c", value: companyType },
        { name: "country", value: values.country.trim() },
        { name: "city", value: values.city.trim() },
        { name: "mobilephone", value: values.phone.trim() },
        { name: "0-2/industry", value: values.industry.trim() },
        {
          name: "i_am_completing_this_form_in_connection_with_my",
          value: interest === "personal" ? "Personal interest" : "Business interest",
        },
      ],
      context: {
        pageUri: window.location.href,
        pageName: "AWS GenAI Roadshow",
      },
    };

    try {
      const response = await fetch(HUBSPOT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = { raw: text };
      }

      if (!response.ok) {
        const blockedEmail = data?.errors?.some(
          (item) => item.errorType === "BLOCKED_EMAIL",
        );
        if (blockedEmail) {
          setFieldError("email", "Please enter a valid work email address.");
          return;
        }
        throw new Error("Something went wrong. Please try again in a moment.");
      }

      showSuccessState();
    } catch (err) {
      if (formErrorBanner) {
        formErrorBanner.hidden = false;
        formErrorBanner.textContent =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again in a moment.";
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML =
          'Request to Attend <img src="assets/ic-arrow.svg" alt="" width="17" height="17" />';
      }
    }
  });
})();
