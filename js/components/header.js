import { CURRENT_PROVIDER, NOTIFICATIONS } from '../dummy-data.js';

let currentTitle = 'Schedule';
let notifOpen = false;

export function renderHeader() {
  const el = document.getElementById('top-header');

  el.innerHTML = `
    <button class="mobile-menu-btn" data-action="toggle-sidebar">
      <i data-lucide="menu" style="width:20px;height:20px"></i>
    </button>
    <div class="header-title" id="header-title">${currentTitle}</div>
    <div class="header-spacer"></div>
    <div class="header-search" data-action="open-search">
      <i data-lucide="search" class="search-icon"></i>
      <span class="search-text">Search patients, orders...</span>
      <span class="search-shortcut">/</span>
    </div>
    <div class="header-actions">
      <div style="position:relative">
        <button class="header-action-btn" data-action="toggle-notifications">
          <i data-lucide="bell" style="width:18px;height:18px"></i>
          ${NOTIFICATIONS.length > 0 ? '<span class="notification-dot"></span>' : ''}
        </button>
        <div class="notification-dropdown" id="notification-dropdown">
          <div class="notif-header">Notifications</div>
          ${NOTIFICATIONS.map(n => `
            <div class="notif-item ${n.type === 'critical' ? 'unread' : ''}" data-route="${n.route}">
              <div class="notif-icon ${n.type}">
                <i data-lucide="${n.icon}" style="width:16px;height:16px"></i>
              </div>
              <div class="notif-body">
                <div class="notif-title">${n.title}</div>
                <div class="notif-desc">${n.desc}</div>
              </div>
              <div class="notif-time">${n.time}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="header-profile" data-action="profile">
        <div class="profile-avatar-sm">${CURRENT_PROVIDER.initials}</div>
        <span class="profile-name-sm">${CURRENT_PROVIDER.name}</span>
      </div>
    </div>
  `;

  initHeader();
}

function initHeader() {
  const header = document.getElementById('top-header');

  header.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]');
    if (!action) {
      // Close notification dropdown if clicking elsewhere in header
      closeNotifications();
      return;
    }

    const actionType = action.dataset.action;

    if (actionType === 'open-search') {
      const event = new CustomEvent('open-command-palette');
      document.dispatchEvent(event);
    } else if (actionType === 'toggle-notifications') {
      e.stopPropagation();
      toggleNotifications();
    } else if (actionType === 'toggle-sidebar') {
      const { toggleMobileSidebar } = await_import_sidebar();
      document.body.classList.toggle('sidebar-mobile-open');
    }
  });

  // Close notifications on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.notification-dropdown') && !e.target.closest('[data-action="toggle-notifications"]')) {
      closeNotifications();
    }
  });

  // Notification item clicks
  const dropdown = document.getElementById('notification-dropdown');
  dropdown.addEventListener('click', (e) => {
    const item = e.target.closest('[data-route]');
    if (item) {
      window.location.hash = item.dataset.route.replace('#', '');
      closeNotifications();
    }
  });
}

function await_import_sidebar() {
  // Inline toggle to avoid circular dependency
  return { toggleMobileSidebar: () => document.body.classList.toggle('sidebar-mobile-open') };
}

function toggleNotifications() {
  const dropdown = document.getElementById('notification-dropdown');
  notifOpen = !notifOpen;
  dropdown.classList.toggle('open', notifOpen);
  if (notifOpen) {
    // Re-render icons in dropdown
    if (window.lucide) lucide.createIcons({ nodes: [dropdown] });
  }
}

function closeNotifications() {
  const dropdown = document.getElementById('notification-dropdown');
  if (dropdown) {
    dropdown.classList.remove('open');
    notifOpen = false;
  }
}

export function setPageTitle(title) {
  currentTitle = title;
  const el = document.getElementById('header-title');
  if (el) el.innerHTML = title;
}
