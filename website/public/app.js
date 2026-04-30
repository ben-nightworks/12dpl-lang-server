/* ========================================
   12dPL Documentation Site - app.js
   Powered by data from the 12dpl-lang-server dev branch.
   ======================================== */
(function () {
  'use strict';

  const SITE = window.SITE_DATA || { functions: [], types: [], snippets: [], stats: {} };
  const root = document.documentElement;

  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = String(new Date().getFullYear());

  /* ---------- Theme ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  function setTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = '';
    } else {
      root.removeAttribute('data-theme');
      if (sunIcon) sunIcon.style.display = '';
      if (moonIcon) moonIcon.style.display = 'none';
    }
    localStorage.setItem('12dpl-theme', theme);
  }

  const savedTheme = localStorage.getItem('12dpl-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  /* ---------- Helpers ---------- */
  function escapeHtml(text) {
    return String(text == null ? '' : text)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function escapeRegExp(text) {
    return String(text || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  function highlight(text, query) {
    const safe = escapeHtml(text);
    if (!query) return safe;
    return safe.replace(new RegExp('(' + escapeRegExp(query) + ')', 'ig'), '<mark>$1</mark>');
  }
  function copyToClipboard(text, btn) {
    const fallback = () => {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        return true;
      } catch (_) { return false; }
    };
    const after = (ok) => {
      if (!btn) return;
      const original = btn.dataset.label || btn.textContent;
      btn.dataset.label = original;
      btn.textContent = ok ? 'Copied' : 'Copy failed';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = original; btn.classList.remove('copied'); }, 1400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => after(true)).catch(() => after(fallback()));
    } else {
      after(fallback());
    }
  }

  /* ---------- Stats injection (homepage) ---------- */
  const stats = SITE.stats || {};
  document.querySelectorAll('[data-stat]').forEach((el) => {
    const key = el.getAttribute('data-stat');
    if (key && stats[key] != null) el.textContent = Number(stats[key]).toLocaleString();
  });

  /* ---------- Navigation ---------- */
  const sections = Array.from(document.querySelectorAll('.doc-section'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link[data-section]'));
  const mainContent = document.getElementById('mainContent');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');

  function closeSidebar() { if (sidebar) sidebar.classList.remove('open'); }

  function navigateTo(sectionId, updateHash) {
    const target = document.getElementById(sectionId);
    if (!target) return;
    sections.forEach((s) => s.classList.toggle('active', s.id === sectionId));
    navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('data-section') === sectionId));
    if (mainContent) mainContent.scrollTop = 0;
    if (updateHash !== false) history.replaceState(null, '', '#' + sectionId);
    closeSidebar();
    if (window.Prism) window.Prism.highlightAllUnder(target);
  }
  window.navigateTo = navigateTo;

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => sidebar && sidebar.classList.toggle('open'));
  }

  document.addEventListener('click', (event) => {
    const navTrigger = event.target.closest('[data-section]');
    if (navTrigger) {
      event.preventDefault();
      const sectionId = navTrigger.getAttribute('data-section');
      const subFilter = navTrigger.getAttribute('data-call-category');
      const typeGroup = navTrigger.getAttribute('data-type-group');
      if (sectionId === 'all-calls' && subFilter) {
        currentCategory = subFilter;
        currentFilter = '';
        visibleCount = PAGE_SIZE;
        if (callsFilterInput) callsFilterInput.value = '';
        document.querySelectorAll('#categoryChips button').forEach((b) =>
          b.classList.toggle('active', b.getAttribute('data-call-category') === subFilter)
        );
        renderCalls();
      }
      if (sectionId === 'types' && typeGroup) {
        currentTypeGroup = typeGroup;
        currentTypeFilter = '';
        if (typesFilterInput) typesFilterInput.value = '';
        document.querySelectorAll('#typeCategoryChips button').forEach((b) =>
          b.classList.toggle('active', b.getAttribute('data-type-group') === typeGroup)
        );
        renderTypes();
      }
      if (sectionId) navigateTo(sectionId, true);
      return;
    }

    const card = event.target.closest('.card[data-goto]');
    if (card) {
      const sectionId = card.getAttribute('data-goto');
      if (sectionId) navigateTo(sectionId, true);
      return;
    }

    const copyBtn = event.target.closest('[data-copy]');
    if (copyBtn) {
      copyToClipboard(copyBtn.getAttribute('data-copy') || '', copyBtn);
      return;
    }

    if (sidebar && sidebar.classList.contains('open') &&
        !sidebar.contains(event.target) &&
        sidebarToggle && !sidebarToggle.contains(event.target)) {
      closeSidebar();
    }
  });

  /* ---------- Search (functions + types + snippets + prose sections) ---------- */
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  let proseIndex = [];
  try {
    const node = document.getElementById('searchData');
    if (node) proseIndex = JSON.parse(node.textContent || '[]');
  } catch (_) { proseIndex = []; }

  function buildSearchHaystack() {
    const items = [];
    proseIndex.forEach((entry) => {
      items.push({
        kind: 'doc',
        title: entry.title,
        subtitle: entry.section,
        target: { section: entry.section },
        haystack: ((entry.title || '') + ' ' + (entry.text || '')).toLowerCase(),
      });
    });
    SITE.functions.forEach((fn) => {
      items.push({
        kind: 'fn',
        title: fn.name + '()',
        subtitle: fn.signature,
        target: { section: 'all-calls', call: fn.name },
        haystack: (fn.name + ' ' + (fn.description || '')).toLowerCase(),
      });
    });
    SITE.types.forEach((t) => {
      items.push({
        kind: 'type',
        title: t.name,
        subtitle: 'Type',
        target: { section: 'types', type: t.name },
        haystack: (t.name + ' ' + (t.description || '')).toLowerCase(),
      });
    });
    SITE.snippets.forEach((s) => {
      items.push({
        kind: 'snip',
        title: s.label,
        subtitle: 'Snippet - ' + s.prefix,
        target: { section: 'snippets', snippet: s.label },
        haystack: (s.label + ' ' + (s.description || '') + ' ' + s.prefix).toLowerCase(),
      });
    });
    return items;
  }
  const SEARCH_INDEX = buildSearchHaystack();

  function renderSearchResults(query) {
    if (!searchResults) return;
    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      searchResults.hidden = true;
      searchResults.innerHTML = '';
      return;
    }
    const tokens = q.split(/\s+/);
    const ranked = SEARCH_INDEX
      .map((item) => ({
        item,
        score: tokens.reduce((s, tok) => s + (item.haystack.includes(tok) ? 1 : 0), 0),
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        // Prefer exact-prefix function/type matches.
        const ap = a.item.title.toLowerCase().startsWith(q) ? 0 : 1;
        const bp = b.item.title.toLowerCase().startsWith(q) ? 0 : 1;
        return ap - bp;
      })
      .slice(0, 14);

    if (ranked.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item"><span>No results.</span></div>';
      searchResults.hidden = false;
      return;
    }
    searchResults.innerHTML = ranked.map(({ item }) => {
      const target = JSON.stringify(item.target).replace(/"/g, '&quot;');
      return (
        '<div class="search-result-item" data-target="' + target + '">' +
          '<span class="kind kind-' + item.kind + '">' + item.kind + '</span>' +
          '<strong>' + highlight(item.title, q) + '</strong>' +
          '<span class="result-sub">' + escapeHtml(item.subtitle || '') + '</span>' +
        '</div>'
      );
    }).join('');
    searchResults.hidden = false;
  }

  function applySearchTarget(target) {
    if (!target) return;
    if (target.call) {
      currentCategory = 'all';
      currentFilter = target.call;
      visibleCount = PAGE_SIZE;
      if (callsFilterInput) callsFilterInput.value = target.call;
      renderCalls();
    }
    if (target.type) {
      currentTypeGroup = 'all';
      if (typesFilterInput) typesFilterInput.value = target.type;
      currentTypeFilter = target.type;
      renderTypes();
    }
    navigateTo(target.section || 'home', true);
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { searchResults.hidden = true; searchInput.blur(); }
    });
  }

  document.addEventListener('click', (event) => {
    const item = event.target.closest('.search-result-item[data-target]');
    if (item) {
      try {
        const target = JSON.parse(item.getAttribute('data-target'));
        applySearchTarget(target);
      } catch (_) { /* ignore */ }
      if (searchInput) searchInput.value = '';
      if (searchResults) { searchResults.hidden = true; searchResults.innerHTML = ''; }
      return;
    }
    if (searchResults && !searchResults.hidden &&
        !searchResults.contains(event.target) &&
        searchInput && !searchInput.contains(event.target)) {
      searchResults.hidden = true;
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && searchInput && document.activeElement !== searchInput) {
      event.preventDefault();
      searchInput.focus();
    }
  });

  /* ---------- All Calls ---------- */
  const callsList = document.getElementById('allCallsList');
  const callsFilterInput = document.getElementById('allCallsFilter');
  const callsTotalEl = document.getElementById('allCallsTotal');
  const callsShownEl = document.getElementById('allCallsShown');
  const callsCategoryEl = document.getElementById('allCallsCategory');
  const callsMoreBtn = document.getElementById('allCallsMore');

  const PAGE_SIZE = 60;
  let currentCategory = 'all';
  let currentFilter = '';
  let visibleCount = PAGE_SIZE;

  const CATEGORY_LABELS = {
    all: 'All Calls',
    text: 'Text & Formatting',
    math: 'Math & Vectors',
    io: 'Input / Output & Files',
    geometry: 'Geometry',
    elements: 'Models & Elements',
    tin: 'Tins & Drainage',
    ui: 'Panels & Widgets',
    arrays: 'Arrays & Containers',
    system: 'System & Project',
    attributes: 'Attributes & Style',
    data: 'XML / ODBC / Data',
    misc: 'Miscellaneous',
  };

  function getFilteredCalls() {
    const needle = currentFilter.trim().toLowerCase();
    return SITE.functions.filter((fn) => {
      if (currentCategory !== 'all' && fn.category !== currentCategory) return false;
      if (!needle) return true;
      const hay = (fn.name + ' ' + (fn.description || '') + ' ' + fn.signature).toLowerCase();
      return hay.includes(needle);
    });
  }

  function renderSignature(fn) {
    const params = (fn.parameters || []).map((p) => {
      const t = escapeHtml(p.type || '');
      const n = escapeHtml(p.name || '');
      return '<span class="sig-type">' + t + '</span> <span class="sig-name">' + n + '</span>';
    }).join(', ');
    return (
      '<span class="sig-return">' + escapeHtml(fn.returnType || 'void') + '</span> ' +
      '<span class="sig-fn">' + escapeHtml(fn.name) + '</span>' +
      '<span class="sig-paren">(</span>' + params + '<span class="sig-paren">)</span>'
    );
  }

  function renderCalls() {
    if (!callsList) return;
    const filtered = getFilteredCalls();
    const visible = filtered.slice(0, visibleCount);
    if (callsTotalEl) callsTotalEl.textContent = filtered.length.toLocaleString();
    if (callsShownEl) callsShownEl.textContent = visible.length.toLocaleString();
    if (callsCategoryEl) callsCategoryEl.textContent = CATEGORY_LABELS[currentCategory] || currentCategory;

    if (visible.length === 0) {
      callsList.innerHTML = '<div class="empty-state">No matching calls in this category.</div>';
      if (callsMoreBtn) callsMoreBtn.style.display = 'none';
      return;
    }

    callsList.innerHTML = visible.map((fn) => {
      const idMeta = fn.id != null ? '<span class="meta-pill">ID #' + fn.id + '</span>' : '';
      const catMeta = '<span class="meta-pill cat-' + fn.category + '">' + (CATEGORY_LABELS[fn.category] || fn.category) + '</span>';
      const desc = escapeHtml(fn.description || 'No description available.');
      const sigCopy = (fn.signature || '').replace(/"/g, '&quot;');
      return (
        '<article class="call-card" id="call-' + escapeHtml(fn.name) + '">' +
          '<header class="call-card-header">' +
            '<h3>' + escapeHtml(fn.name) + '</h3>' +
            '<div class="call-card-meta">' + catMeta + idMeta + '</div>' +
          '</header>' +
          '<div class="call-signature">' + renderSignature(fn) +
            '<button type="button" class="copy-btn" data-copy="' + sigCopy + '" title="Copy signature">Copy</button>' +
          '</div>' +
          '<p class="call-description">' + desc + '</p>' +
        '</article>'
      );
    }).join('');

    if (callsMoreBtn) {
      callsMoreBtn.style.display = visible.length < filtered.length ? 'inline-flex' : 'none';
      callsMoreBtn.textContent = 'Load more (' + (filtered.length - visible.length).toLocaleString() + ' remaining)';
    }
  }

  if (callsFilterInput) {
    callsFilterInput.addEventListener('input', (e) => {
      currentFilter = e.target.value || '';
      visibleCount = PAGE_SIZE;
      renderCalls();
    });
  }
  if (callsMoreBtn) {
    callsMoreBtn.addEventListener('click', () => {
      visibleCount += PAGE_SIZE;
      renderCalls();
    });
  }

  /* ---------- Types ---------- */
  const typesGrid = document.getElementById('typesGrid');
  const typesFilterInput = document.getElementById('typesFilter');
  const typesGroupEl = document.getElementById('typesCurrentGroup');
  const typesShownEl = document.getElementById('typesShown');

  let currentTypeGroup = 'all';
  let currentTypeFilter = '';

  const TYPE_GROUP_LABELS = {
    all: 'All Types',
    math: 'Math & Primitive',
    geometry: 'Geometric',
    elements: 'Database Handles',
    ui: 'Interface',
    data: 'File / Data',
    attributes: 'Internal',
    arrays: 'Containers',
    system: 'System',
    misc: 'Other',
  };

  function renderTypes() {
    if (!typesGrid) return;
    const needle = (currentTypeFilter || '').trim().toLowerCase();
    const list = SITE.types.filter((t) => {
      if (currentTypeGroup !== 'all' && t.group !== currentTypeGroup) return false;
      if (!needle) return true;
      return (t.name + ' ' + (t.description || '')).toLowerCase().includes(needle);
    });
    if (typesGroupEl) typesGroupEl.textContent = TYPE_GROUP_LABELS[currentTypeGroup] || currentTypeGroup;
    if (typesShownEl) typesShownEl.textContent = list.length.toLocaleString();
    if (list.length === 0) {
      typesGrid.innerHTML = '<div class="empty-state">No matching types.</div>';
      return;
    }
    typesGrid.innerHTML = list.map((t) => {
      const desc = (t.description || '').replace(/^\*\*[^*]+\*\*\s*/, '').trim();
      return (
        '<article class="type-card cat-' + t.group + '">' +
          '<h3><code>' + escapeHtml(t.name) + '</code></h3>' +
          '<div class="type-group">' + escapeHtml(TYPE_GROUP_LABELS[t.group] || t.group) + '</div>' +
          '<p>' + escapeHtml(desc || 'No description available.') + '</p>' +
        '</article>'
      );
    }).join('');
  }

  if (typesFilterInput) {
    typesFilterInput.addEventListener('input', (e) => {
      currentTypeFilter = e.target.value || '';
      renderTypes();
    });
  }

  /* ---------- Snippets ---------- */
  const snippetsGrid = document.getElementById('snippetsGrid');
  function renderSnippets() {
    if (!snippetsGrid) return;
    if (!SITE.snippets.length) {
      snippetsGrid.innerHTML = '<div class="empty-state">No snippets available.</div>';
      return;
    }
    snippetsGrid.innerHTML = SITE.snippets.map((s) => {
      // Strip LSP placeholders like ${1:foo} to make code valid 12dPL.
      const cleanBody = (s.body || '').replace(/\$\{\d+:([^}]*)\}/g, '$1').replace(/\$\d+/g, '');
      const safeBody = escapeHtml(cleanBody);
      const copyBody = cleanBody.replace(/"/g, '&quot;');
      return (
        '<article class="snippet-card">' +
          '<header class="snippet-card-header">' +
            '<div>' +
              '<h3>' + escapeHtml(s.label) + '</h3>' +
              '<code class="snippet-prefix">' + escapeHtml(s.prefix) + '</code>' +
            '</div>' +
            '<button type="button" class="copy-btn" data-copy="' + copyBody + '">Copy</button>' +
          '</header>' +
          (s.description ? '<p class="snippet-description">' + escapeHtml(s.description) + '</p>' : '') +
          '<pre><code class="language-12dpl">' + safeBody + '</code></pre>' +
        '</article>'
      );
    }).join('');
    if (window.Prism) window.Prism.highlightAllUnder(snippetsGrid);
  }

  /* ---------- Initial render ---------- */
  renderCalls();
  renderTypes();
  renderSnippets();

  const hashTarget = window.location.hash.slice(1);
  if (hashTarget && document.getElementById(hashTarget)) {
    navigateTo(hashTarget, false);
  } else {
    navigateTo('home', false);
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop && mainContent) {
    mainContent.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', mainContent.scrollTop > 600);
    });
    backToTop.addEventListener('click', () => {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
