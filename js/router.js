// Hash-based SPA Router
// Routes: pattern → { skeleton, module path }

import { setPageTitle } from './components/header.js';
import { updateActiveNav } from './components/sidebar.js';

const ROUTES = [
  { pattern: '/schedule', page: 'schedule', title: 'Schedule' },
  { pattern: '/inbox', page: 'inbox', title: 'Inbox' },
  { pattern: '/patients', page: 'patients', title: 'Patients' },
  { pattern: '/patient/:id', page: 'patient-chart', title: 'Patient Chart' },
  { pattern: '/encounter/:id', page: 'encounter', title: 'Encounter' },
  { pattern: '/reports', page: 'reports', title: 'Reports' },
  { pattern: '/settings', page: 'settings', title: 'Settings' },
];

let currentRoute = null;
let loadTimeout = null;

/**
 * Match a hash path to a route definition.
 * Returns { route, params } or null.
 */
function matchRoute(path) {
  for (const route of ROUTES) {
    const patternParts = route.pattern.split('/');
    const pathParts = path.split('/');

    if (patternParts.length !== pathParts.length) continue;

    const params = {};
    let match = true;

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        params[patternParts[i].slice(1)] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        match = false;
        break;
      }
    }

    if (match) return { route, params };
  }
  return null;
}

/**
 * Get the skeleton HTML for a page.
 */
async function getPageSkeleton(pageName) {
  const skeletonModule = await import('./components/skeleton.js');
  switch (pageName) {
    case 'schedule':
      return `<div class="skeleton-container">${skeletonModule.skeletonStats(4)}${skeletonModule.skeletonTable(10, 6)}</div>`;
    case 'inbox':
      return skeletonModule.skeletonInbox();
    case 'patient-chart':
      return `<div style="padding:var(--sp-6)">${skeletonModule.skeletonTwoColumn()}</div>`;
    case 'encounter':
      return `<div style="padding:var(--sp-6)">${skeletonModule.skeletonTabs(4)}<div style="margin-top:var(--sp-4)">${skeletonModule.skeletonCards(2)}</div></div>`;
    case 'reports':
      return `<div class="skeleton-container">${skeletonModule.skeletonStats(4)}${skeletonModule.skeletonTable(8, 5)}</div>`;
    case 'patients':
      return `<div class="skeleton-container"><div class="skeleton" style="height:48px;border-radius:var(--radius-md);margin-bottom:var(--sp-4)"></div>${skeletonModule.skeletonTable(8, 4)}</div>`;
    case 'settings':
      return skeletonModule.skeletonSettings();
    default:
      return '<div class="skeleton-container"><div class="skeleton skeleton-heading"></div></div>';
  }
}

/**
 * Load and render a page.
 */
async function loadPage(pageName, params) {
  const app = document.getElementById('app');

  // Show skeleton immediately
  const skeleton = await getPageSkeleton(pageName);
  app.innerHTML = skeleton;

  // Clear any pending load
  if (loadTimeout) {
    clearTimeout(loadTimeout);
    loadTimeout = null;
  }

  // Simulate network delay, then load real page
  loadTimeout = setTimeout(async () => {
    try {
      const pageModule = await import(`./pages/${pageName}.js`);
      app.innerHTML = pageModule.render(params);
      if (pageModule.init) pageModule.init(params);
      if (window.lucide) lucide.createIcons();
    } catch (err) {
      console.error(`Failed to load page: ${pageName}`, err);
      app.innerHTML = `
        <div class="empty-state">
          <i data-lucide="alert-circle"></i>
          <div class="empty-title">Page Load Error</div>
          <div>Could not load ${pageName}. Check the console for details.</div>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
    }
  }, 1500);
}

/**
 * Handle route change.
 */
function handleRoute() {
  const hash = window.location.hash.slice(1) || '/schedule';
  const matched = matchRoute(hash);

  if (!matched) {
    // Default to schedule
    window.location.hash = '#/schedule';
    return;
  }

  const { route, params } = matched;

  // Skip if same route
  if (currentRoute === hash) return;
  currentRoute = hash;

  // Update UI
  setPageTitle(route.title);
  updateActiveNav(hash);
  loadPage(route.page, params);
}

/**
 * Initialize the router.
 */
export function initRouter() {
  window.addEventListener('hashchange', handleRoute);

  // Initial route
  if (!window.location.hash) {
    window.location.hash = '#/schedule';
  } else {
    handleRoute();
  }
}

/**
 * Navigate programmatically.
 */
export function navigate(hash) {
  window.location.hash = hash;
}
