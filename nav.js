/**
 * nav.js
 * Reusable site navigation. Drop this <script> on every page along with
 * style.css. It renders the same primary/secondary nav data into any
 * matching containers on the page, and marks the current page as active.
 *
 * Usage in HTML:
 *   <nav class="nav-bar" data-nav="primary"></nav>
 *   <nav class="nav-bar nav-bar--secondary" data-nav="secondary"></nav>
 *   <div class="sidebar-nav" data-nav-sidebar="primary"></div>
 *   <div class="sidebar-nav" data-nav-sidebar="secondary"></div>
 *
 * Edit SITE_NAV below once; every page that includes nav.js picks it up.
 */

const SITE_NAV = {
  primary: [
    { label: "Home", href: "/" },
    { label: "Product", href: "/product.html" },
    { label: "Services", href: "/services.html" },
    { label: "Blog", href: "/blog.html" },
    { label: "Contact", href: "/contact.html" }
  ],
  secondary: [
    { label: "FAQ", href: "/faq.html" },
    { label: "Support", href: "/support.html" },
    { label: "Careers", href: "/careers.html" }
  ]
};

(function () {
  function normalizePath(path) {
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    if (path === "") path = "/";
    return path;
  }

  function isCurrentPage(href) {
    const current = normalizePath(window.location.pathname);
    let target;
    try {
      target = normalizePath(new URL(href, window.location.origin).pathname);
    } catch (e) {
      target = normalizePath(href);
    }
    return current === target;
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

  function renderBar(container, items) {
    container.innerHTML = "";
    container.appendChild(buildList(items));
  }

  function renderSidebar(container, items, heading) {
    container.innerHTML = "";
    if (heading) {
      const h2 = document.createElement("h2");
      h2.textContent = heading;
      container.appendChild(h2);
    }
    container.appendChild(buildList(items));
  }

  function renderAll() {
    document.querySelectorAll("[data-nav]").forEach(function (el) {
      const key = el.getAttribute("data-nav");
      if (SITE_NAV[key]) renderBar(el, SITE_NAV[key]);
    });

    document.querySelectorAll("[data-nav-sidebar]").forEach(function (el) {
      const key = el.getAttribute("data-nav-sidebar");
      if (SITE_NAV[key]) {
        const heading = key === "primary" ? "Primary Navigation" : "Secondary Navigation";
        renderSidebar(el, SITE_NAV[key], heading);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderAll);
  } else {
    renderAll();
  }
})();
