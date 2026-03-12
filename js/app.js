// Enchart EMR — Application Entry Point

import { renderSidebar } from './components/sidebar.js';
import { renderHeader } from './components/header.js';
import { initRouter } from './router.js';

/**
 * Initialize the application.
 */
function init() {
  // Render shell components
  renderSidebar();
  renderHeader();

  // Initialize Lucide icons for shell
  if (window.lucide) {
    lucide.createIcons();
  }

  // Start router
  initRouter();

  // Global keyboard shortcuts
  document.addEventListener('keydown', handleGlobalKeydown);

  // Command palette event listener
  document.addEventListener('open-command-palette', openCommandPalette);
}

/**
 * Global keyboard handler.
 */
function handleGlobalKeydown(e) {
  // Cmd+K or Ctrl+K or / (when not in input)
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openCommandPalette();
    return;
  }

  if (e.key === '/' && !isInputFocused()) {
    e.preventDefault();
    openCommandPalette();
    return;
  }

  // Escape — close overlays
  if (e.key === 'Escape') {
    closeAllOverlays();
  }
}

/**
 * Check if an input/textarea is focused.
 */
function isInputFocused() {
  const active = document.activeElement;
  return active && (
    active.tagName === 'INPUT' ||
    active.tagName === 'TEXTAREA' ||
    active.tagName === 'SELECT' ||
    active.contentEditable === 'true'
  );
}

/**
 * Open command palette.
 */
async function openCommandPalette() {
  const module = await import('./components/command-palette.js');
  module.openPalette();
}

/**
 * Close all overlays.
 */
function closeAllOverlays() {
  // Command palette
  const cmdBackdrop = document.getElementById('cmd-palette-backdrop');
  if (cmdBackdrop && cmdBackdrop.classList.contains('open')) {
    cmdBackdrop.classList.remove('open');
    return;
  }

  // Slide panel
  const panelBackdrop = document.getElementById('slide-panel-backdrop');
  const panel = document.getElementById('slide-panel');
  if (panelBackdrop && panelBackdrop.classList.contains('open')) {
    panelBackdrop.classList.remove('open');
    panel.classList.remove('open');
    return;
  }

  // Modal
  const modalBackdrop = document.getElementById('modal-backdrop');
  if (modalBackdrop && modalBackdrop.classList.contains('open')) {
    modalBackdrop.classList.remove('open');
    return;
  }

  // Mobile sidebar
  if (document.body.classList.contains('sidebar-mobile-open')) {
    document.body.classList.remove('sidebar-mobile-open');
    return;
  }

  // Notification dropdown
  const notifDropdown = document.getElementById('notification-dropdown');
  if (notifDropdown && notifDropdown.classList.contains('open')) {
    notifDropdown.classList.remove('open');
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
