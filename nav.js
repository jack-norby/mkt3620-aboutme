const SITE_NAV = {
  primary: [
    { label: "Home", href: "index.html" },
    { label: "Product", href: "product.html" },
    { label: "Services", href: "services.html" },
    { label: "Blog", href: "blog.html" },
    { label: "Contact", href: "contact.html" }
  ],
  secondary: [
    { label: "FAQ", href: "faq.html" },
    { label: "Support", href: "support.html" },
    { label: "Careers", href: "careers.html" }
  ]
};

(function () {
  function normalizePath(path) {
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    if (path === "") path = "/";
    return path.split("/").pop(); // Matches root filenames cleanly
  }

  function isCurrentPage(href) {
    const current = normalizePath(window.location.pathname);
    const target = normalizePath(href);
    return current === target || (current === "" && target === "index.html");
  }

  function buildList(items) {
    const ul = document.createElement("ul");
    items.forEach(function (item) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      if (isCurrentPage(item.href)) {
        a.setAttribute("aria-current", "page");
      }
      li.appendChild(a);
      ul.appendChild(li);
    });
    return ul;
  }

  function renderAll() {
    document.querySelectorAll("[data-nav]").forEach(function (el) {
      const key = el.getAttribute("data-nav");
      if (SITE_NAV[key]) {
        el.innerHTML = "";
        el.appendChild(buildList(SITE_NAV[key]));
      }
    });

    document.querySelectorAll("[data-nav-sidebar]").forEach(function (el) {
      const key = el.getAttribute("data-nav-sidebar");
      if (SITE_NAV[key]) {
        el.innerHTML = "";
        const h2 = document.createElement("h2");
        h2.textContent = key === "primary" ? "Primary Navigation" : "Secondary Navigation";
        el.appendChild(h2);
        el.appendChild(buildList(SITE_NAV[key]));
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderAll);
  } else {
    renderAll();
  }
})();
