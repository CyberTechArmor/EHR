import { SETTINGS } from '../dummy-data.js';
import { showToast } from '../components/toast.js';

let activeCategory = 'appearance';

export function render() {
  const categories = SETTINGS.categories;
  const activeCat = categories.find(c => c.id === activeCategory) || categories[0];

  return `
    <div class="page-settings">
      <div class="settings-layout">
        <!-- Settings Nav -->
        <div class="settings-nav">
          ${categories.map(cat => `
            <div class="settings-nav-item ${cat.id === activeCategory ? 'active' : ''}" data-category="${cat.id}">
              <i data-lucide="${cat.icon}" style="width:16px;height:16px"></i>
              <span>${cat.label}</span>
            </div>
          `).join('')}
        </div>

        <!-- Settings Content -->
        <div class="settings-content" id="settings-content">
          ${renderCategorySettings(activeCat)}
        </div>
      </div>
    </div>
  `;
}

function renderCategorySettings(category) {
  return `
    <div class="settings-section-title">${category.label}</div>
    <div class="settings-group">
      ${category.settings.map(setting => {
        if (setting.type === 'toggle') {
          return `
            <div class="setting-row">
              <div class="setting-info">
                <div class="setting-label">${setting.label}</div>
                <div class="setting-desc">${setting.desc}</div>
              </div>
              <div class="setting-control">
                <label class="toggle">
                  <input type="checkbox" ${getSettingValue(setting.id, setting.value) ? 'checked' : ''} data-setting="${setting.id}">
                  <span class="toggle-track"></span>
                </label>
              </div>
            </div>
          `;
        } else if (setting.type === 'select') {
          const currentVal = getSettingValue(setting.id, setting.value);
          return `
            <div class="setting-row">
              <div class="setting-info">
                <div class="setting-label">${setting.label}</div>
                <div class="setting-desc">${setting.desc}</div>
              </div>
              <div class="setting-control">
                <select class="form-select" data-setting="${setting.id}" style="width:auto;min-width:120px">
                  ${setting.options.map(opt => `<option ${opt === currentVal ? 'selected' : ''}>${opt}</option>`).join('')}
                </select>
              </div>
            </div>
          `;
        }
        return '';
      }).join('')}
    </div>
  `;
}

function getSettingValue(id, defaultValue) {
  try {
    const stored = localStorage.getItem(`enchart_setting_${id}`);
    if (stored !== null) {
      if (typeof defaultValue === 'boolean') return stored === 'true';
      return stored;
    }
  } catch { /* ignore */ }
  return defaultValue;
}

function saveSettingValue(id, value) {
  try {
    localStorage.setItem(`enchart_setting_${id}`, value.toString());
  } catch { /* ignore */ }
}

export function init() {
  const page = document.querySelector('.page-settings');
  if (!page) return;

  // Category nav clicks
  const nav = page.querySelector('.settings-nav');
  nav.addEventListener('click', (e) => {
    const item = e.target.closest('[data-category]');
    if (!item) return;

    activeCategory = item.dataset.category;

    // Update active state
    nav.querySelectorAll('.settings-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.category === activeCategory);
    });

    // Re-render content
    const content = page.querySelector('#settings-content');
    const categories = SETTINGS.categories;
    const activeCat = categories.find(c => c.id === activeCategory) || categories[0];
    content.innerHTML = renderCategorySettings(activeCat);
    initSettingsControls(page);
    if (window.lucide) lucide.createIcons();
  });

  initSettingsControls(page);
}

function initSettingsControls(page) {
  const content = page.querySelector('#settings-content');

  // Toggle changes
  content.addEventListener('change', (e) => {
    const control = e.target.closest('[data-setting]');
    if (!control) return;

    const settingId = control.dataset.setting;
    const value = control.type === 'checkbox' ? control.checked : control.value;
    saveSettingValue(settingId, value);
    showToast('Setting updated', 'success', 2000);
  });
}
