import { CURRENT_PROVIDER, getInboxUnreadCount } from '../dummy-data.js';

const NAV_ITEMS = [
  { id: 'schedule', label: 'Schedule', icon: 'calendar', route: '#/schedule' },
  { id: 'inbox', label: 'Inbox', icon: 'inbox', route: '#/inbox', badge: true },
  { id: 'patients', label: 'Patients', icon: 'users', route: '#/patients' },
  { id: 'reports', label: 'Reports', icon: 'bar-chart-2', route: '#/reports' },
];

const BOTTOM_ITEMS = [
  { id: 'settings', label: 'Settings', icon: 'settings', route: '#/settings' },
];

export function renderSidebar() {
  const inboxCount = getInboxUnreadCount();
  const el = document.getElementById('sidebar');

  el.innerHTML = `
    <div class="sidebar-logo" data-action="home">
      <i data-lucide="activity" class="logo-icon"></i>
      <span class="logo-text">Enchart</span>
    </div>
    <nav class="sidebar-nav">
      ${NAV_ITEMS.map(item => `
        <div class="sidebar-nav-item" data-route="${item.route}" data-nav="${item.id}">
          <i data-lucide="${item.icon}" class="nav-icon"></i>
          <span class="nav-label">${item.label}</span>
          ${item.badge && inboxCount > 0 ? `<span class="nav-badge">${inboxCount}</span>` : ''}
        </div>
      `).join('')}
      <div class="sidebar-spacer"></div>
      ${BOTTOM_ITEMS.map(item => `
        <div class="sidebar-nav-item" data-route="${item.route}" data-nav="${item.id}">
          <i data-lucide="${item.icon}" class="nav-icon"></i>
          <span class="nav-label">${item.label}</span>
        </div>
      `).join('')}
      <div class="sidebar-nav-item" data-action="sign-out" data-nav="signout">
        <i data-lucide="log-out" class="nav-icon"></i>
        <span class="nav-label">Sign Out</span>
      </div>
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-profile" data-action="profile">
        <div class="profile-avatar">${CURRENT_PROVIDER.initials}</div>
        <div class="profile-info">
          <div class="profile-name">${CURRENT_PROVIDER.name}</div>
          <div class="profile-role">${CURRENT_PROVIDER.specialty}</div>
        </div>
      </div>
    </div>
  `;

  initSidebar();
}

function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  // Navigation clicks
  sidebar.addEventListener('click', (e) => {
    const navItem = e.target.closest('[data-route]');
    if (navItem) {
      window.location.hash = navItem.dataset.route.replace('#', '');
      closeMobileSidebar();
      return;
    }

    const action = e.target.closest('[data-action]');
    if (action) {
      const actionType = action.dataset.action;
      if (actionType === 'home') {
        window.location.hash = '/schedule';
        closeMobileSidebar();
      } else if (actionType === 'sign-out') {
        // In real app, would sign out
        window.location.hash = '/schedule';
      }
    }
  });

  // Mobile overlay close
  if (overlay) {
    overlay.addEventListener('click', closeMobileSidebar);
  }
}

export function updateActiveNav(route) {
  const items = document.querySelectorAll('.sidebar-nav-item[data-nav]');
  // Determine active nav from route
  let activeId = 'schedule';
  if (route.startsWith('/inbox')) activeId = 'inbox';
  else if (route.startsWith('/patients') || route.startsWith('/patient/')) activeId = 'patients';
  else if (route.startsWith('/reports')) activeId = 'reports';
  else if (route.startsWith('/settings')) activeId = 'settings';
  else if (route.startsWith('/encounter/')) activeId = 'schedule';

  items.forEach(item => {
    item.classList.toggle('active', item.dataset.nav === activeId);
  });
}

export function toggleMobileSidebar() {
  document.body.classList.toggle('sidebar-mobile-open');
}

function closeMobileSidebar() {
  document.body.classList.remove('sidebar-mobile-open');
}
