/*
  nav.js — shared site navigation for jacknorby.com
  --------------------------------------------------
  Drop this file next to your HTML pages and add:
      <script src="nav.js" defer></script>
  to every page. It injects a horizontal nav bar (Jack Norby brand +
  About Me + Portfolio dropdown) at the top of <body> automatically.

  To point it at a different page, edit NAV_ITEMS below — nothing
  else needs to change.
*/

(function () {
  "use strict";

  // ---- Configure your site structure here -------------------------------
  var BRAND = { label: "Jack Norby", href: "index.html" };

  var NAV_ITEMS = [
    { label: "About Me", href: "about.html" },
    {
      label: "Portfolio",
      href: "portfolio.html",
      children: [
        { label: "Marketing work", href: "portfolio-marketing.html" },
        { label: "Entrepreneurship work", href: "portfolio-entrepreneurship.html" },
        { label: "AI work", href: "portfolio-ai.html" }
      ]
    }
  ];
  // -------------------------------------------------------------------------

  function injectStyles() {
    if (document.getElementById("jn-nav-styles")) return;

    var style = document.createElement("style");
    style.id = "jn-nav-styles";
    style.textContent = [
      ".jn-nav{",
      "  --jn-paper:#EDEAE0;",
      "  --jn-ink:#1C2321;",
      "  --jn-green:#2F4538;",
      "  --jn-gold:#C89B3C;",
      "  --jn-clay:#8B5E3C;",
      "  --jn-line: rgba(28,35,33,0.16);",
      "  position: sticky;",
      "  top: 0;",
      "  z-index: 100;",
      "  background: var(--jn-paper);",
      "  border-bottom: 1px solid var(--jn-line);",
      "  font-family: 'Work Sans', sans-serif;",
      "}",
      ".jn-nav-wrap{",
      "  max-width: 760px;",
      "  margin: 0 auto;",
      "  padding: 18px 28px;",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: space-between;",
      "  flex-wrap: wrap;",
      "  gap: 14px;",
      "}",
      ".jn-nav-brand{",
      "  font-family: 'Newsreader', serif;",
      "  font-style: italic;",
      "  font-size: 18px;",
      "  color: var(--jn-ink);",
      "  text-decoration: none;",
      "}",
      ".jn-nav-list{",
      "  list-style: none;",
      "  display: flex;",
      "  align-items: center;",
      "  gap: 26px;",
      "  margin: 0;",
      "  padding: 0;",
      "}",
      ".jn-nav-item{",
      "  position: relative;",
      "}",
      ".jn-nav-link, .jn-nav-toggle{",
      "  font-family: 'Work Sans', sans-serif;",
      "  font-size: 15px;",
      "  color: var(--jn-ink);",
      "  text-decoration: none;",
      "  background: none;",
      "  border: none;",
      "  padding: 4px 0;",
      "  cursor: pointer;",
      "  border-bottom: 1px solid transparent;",
      "  display: inline-flex;",
      "  align-items: center;",
      "  gap: 6px;",
      "}",
      ".jn-nav-link:hover, .jn-nav-toggle:hover, .jn-nav-toggle.is-active-parent{",
      "  border-bottom-color: var(--jn-ink);",
      "}",
      ".jn-nav-link[aria-current='page']{",
      "  color: var(--jn-green);",
      "  border-bottom-color: var(--jn-gold);",
      "}",
      ".jn-nav-toggle .jn-caret{",
      "  font-size: 11px;",
      "  transition: transform 0.15s ease;",
      "}",
      ".jn-nav-item.open .jn-caret{",
      "  transform: rotate(180deg);",
      "}",
      ".jn-nav-submenu{",
      "  list-style: none;",
      "  margin: 0;",
      "  padding: 8px;",
      "  position: absolute;",
      "  top: calc(100% + 10px);",
      "  left: 0;",
      "  min-width: 220px;",
      "  background: var(--jn-paper);",
      "  border: 1px solid var(--jn-line);",
      "  box-shadow: 0 6px 18px rgba(28,35,33,0.12);",
      "  opacity: 0;",
      "  visibility: hidden;",
      "  transform: translateY(-4px);",
      "  transition: opacity 0.15s ease, transform 0.15s ease;",
      "}",
      ".jn-nav-item.open .jn-nav-submenu{",
      "  opacity: 1;",
      "  visibility: visible;",
      "  transform: translateY(0);",
      "}",
      ".jn-nav-sublink{",
      "  display: block;",
      "  padding: 9px 10px;",
      "  font-size: 14.5px;",
      "  color: var(--jn-ink);",
      "  text-decoration: none;",
      "}",
      ".jn-nav-sublink:hover{",
      "  background: rgba(200,155,60,0.16);",
      "}",
      ".jn-nav-sublink[aria-current='page']{",
      "  color: var(--jn-green);",
      "  font-weight: 500;",
      "}",
      "@media (prefers-reduced-motion: reduce){",
      "  .jn-nav-submenu, .jn-caret{ transition: none; }",
      "}",
      "@media (max-width: 560px){",
      "  .jn-nav-wrap{ padding: 16px 20px; }",
      "  .jn-nav-list{ gap: 18px; }",
      "}"
    ].join("\n");

    document.head.appendChild(style);
  }

  function currentFile() {
    var path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function closeAllMenus() {
    var open = document.querySelectorAll(".jn-nav-item.open");
    for (var i = 0; i < open.length; i++) {
      open[i].classList.remove("open");
      var btn = open[i].querySelector(".jn-nav-toggle");
      if (btn) btn.setAttribute("aria-expanded", "false");
    }
  }

  function buildNav() {
    var current = currentFile();

    var header = document.createElement("header");
    header.className = "jn-nav";

    var wrap = document.createElement("div");
    wrap.className = "jn-nav-wrap";

    var brand = document.createElement("a");
    brand.className = "jn-nav-brand";
    brand.href = BRAND.href;
    brand.textContent = BRAND.label;
    wrap.appendChild(brand);

    var list = document.createElement("ul");
    list.className = "jn-nav-list";

    NAV_ITEMS.forEach(function (item) {
      var li = document.createElement("li");
      li.className = "jn-nav-item";

      var hasChildren = item.children && item.children.length > 0;

      if (hasChildren) {
        var childActive = item.children.some(function (c) {
          return c.href === current;
        });

        var button = document.createElement("button");
        button.type = "button";
        button.className = "jn-nav-link jn-nav-toggle" + (childActive ? " is-active-parent" : "");
        button.setAttribute("aria-haspopup", "true");
        button.setAttribute("aria-expanded", "false");
        button.innerHTML = item.label + ' <span class="jn-caret" aria-hidden="true">&#9662;</span>';

        button.addEventListener("click", function (e) {
          e.stopPropagation();
          var isOpen = li.classList.contains("open");
          closeAllMenus();
          if (!isOpen) {
            li.classList.add("open");
            button.setAttribute("aria-expanded", "true");
          }
        });

        var submenu = document.createElement("ul");
        submenu.className = "jn-nav-submenu";

        item.children.forEach(function (child) {
          var subLi = document.createElement("li");
          var subA = document.createElement("a");
          subA.className = "jn-nav-sublink";
          subA.href = child.href;
          subA.textContent = child.label;
          if (child.href === current) subA.setAttribute("aria-current", "page");
          subLi.appendChild(subA);
          submenu.appendChild(subLi);
        });

        li.appendChild(button);
        li.appendChild(submenu);
      } else {
        var a = document.createElement("a");
        a.className = "jn-nav-link";
        a.href = item.href;
        a.textContent = item.label;
        if (item.href === current) a.setAttribute("aria-current", "page");
        li.appendChild(a);
      }

      list.appendChild(li);
    });

    wrap.appendChild(list);
    header.appendChild(wrap);
    return header;
  }

  function mount() {
    injectStyles();
    var nav = buildNav();
    var placeholder = document.getElementById("site-nav");
    if (placeholder) {
      placeholder.replaceWith(nav);
    } else {
      document.body.insertBefore(nav, document.body.firstChild);
    }
  }

  document.addEventListener("click", closeAllMenus);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAllMenus();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
