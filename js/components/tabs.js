/**
 * Render a tab bar.
 * @param {Array} tabs - [{id, label, count?, active?}]
 * @param {string} [groupId] - unique identifier for the tab group
 * @returns {string} HTML
 */
export function renderTabs(tabs, groupId = 'tabs') {
  return `
    <div class="tabs" data-tab-group="${groupId}">
      ${tabs.map(tab => `
        <div class="tab ${tab.active ? 'active' : ''}" data-tab="${tab.id}" data-tab-group="${groupId}">
          ${tab.label}
          ${tab.count !== undefined ? `<span class="tab-count">${tab.count}</span>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Initialize tab switching behavior.
 * @param {string} groupId
 * @param {Function} onSwitch - called with (tabId)
 */
export function initTabs(groupId, onSwitch) {
  const container = document.querySelector(`[data-tab-group="${groupId}"].tabs`);
  if (!container) return;

  container.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-tab]');
    if (!tab) return;

    // Update active state
    container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Update content visibility
    const tabId = tab.dataset.tab;
    document.querySelectorAll(`[data-tab-content][data-tab-group="${groupId}"]`).forEach(content => {
      content.classList.toggle('active', content.dataset.tabContent === tabId);
    });

    if (onSwitch) onSwitch(tabId);
  });
}
