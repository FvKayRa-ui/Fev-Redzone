(() => {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector(".nav");

  // Enable entrance motion only after first paint so content is never blank
  requestAnimationFrame(() => {
    document.documentElement.classList.add("motion-on");
  });

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const steps = document.querySelectorAll(".steps li");
  if (steps.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    steps.forEach((step, i) => {
      step.style.transitionDelay = `${i * 90}ms`;
      io.observe(step);
    });
  } else {
    steps.forEach((step) => step.classList.add("is-in"));
  }

  const pickup = document.querySelector('input[name="pickup"]');
  const ret = document.querySelector('input[name="return"]');
  if (pickup && ret) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const next = new Date(today);
    next.setDate(today.getDate() + 3);
    const fmt = (d) => d.toISOString().slice(0, 10);
    pickup.value = fmt(tomorrow);
    ret.value = fmt(next);
    pickup.min = fmt(today);
    ret.min = fmt(tomorrow);
  }
})();
