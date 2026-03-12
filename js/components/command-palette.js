import { COMMAND_PALETTE_ITEMS } from '../dummy-data.js';

let isOpen = false;
let selectedIndex = 0;
let filteredItems = [];

export function openPalette() {
  const backdrop = document.getElementById('cmd-palette-backdrop');
  const palette = document.getElementById('cmd-palette');

  isOpen = true;
  selectedIndex = 0;
  filteredItems = [...COMMAND_PALETTE_ITEMS];

  palette.innerHTML = `
    <div class="cmd-palette-input-wrap">
      <i data-lucide="search"></i>
      <input class="cmd-palette-input" id="cmd-input" placeholder="Search patients, actions, navigation..." autocomplete="off" spellcheck="false">
    </div>
    <div class="cmd-palette-results" id="cmd-results">
      ${renderResults(filteredItems)}
    </div>
    <div class="cmd-palette-footer">
      <span><kbd>↑↓</kbd> Navigate</span>
      <span><kbd>↵</kbd> Select</span>
      <span><kbd>Esc</kbd> Close</span>
    </div>
  `;

  backdrop.classList.add('open');
  if (window.lucide) lucide.createIcons({ nodes: [palette] });

  const input = document.getElementById('cmd-input');
  setTimeout(() => input?.focus(), 50);

  // Input handler
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    if (!query) {
      filteredItems = [...COMMAND_PALETTE_ITEMS];
    } else {
      filteredItems = COMMAND_PALETTE_ITEMS.filter(item => {
        return item.label.toLowerCase().includes(query) ||
               item.keywords.some(k => k.includes(query));
      });
    }
    selectedIndex = 0;
    const results = document.getElementById('cmd-results');
    results.innerHTML = renderResults(filteredItems);
    if (window.lucide) lucide.createIcons({ nodes: [results] });
  });

  // Keyboard navigation
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, filteredItems.length - 1);
      updateSelection();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      updateSelection();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        executeItem(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });

  // Click handlers
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePalette();
  });

  const results = document.getElementById('cmd-results');
  results.addEventListener('click', (e) => {
    const item = e.target.closest('.cmd-palette-item');
    if (item) {
      const index = parseInt(item.dataset.index);
      if (filteredItems[index]) {
        executeItem(filteredItems[index]);
      }
    }
  });
}

function renderResults(items) {
  if (items.length === 0) {
    return '<div style="padding:var(--sp-4);text-align:center;color:var(--text-muted)">No results found</div>';
  }

  // Group by type
  const groups = {};
  items.forEach((item, i) => {
    const group = item.type === 'nav' ? 'Navigation' : item.type === 'action' ? 'Actions' : 'Patients';
    if (!groups[group]) groups[group] = [];
    groups[group].push({ ...item, _index: i });
  });

  let html = '';
  for (const [groupName, groupItems] of Object.entries(groups)) {
    html += `<div class="cmd-palette-group">${groupName}</div>`;
    html += groupItems.map(item => `
      <div class="cmd-palette-item ${item._index === selectedIndex ? 'selected' : ''}" data-index="${item._index}">
        <i data-lucide="${item.icon}" class="cmd-icon"></i>
        <span class="cmd-label">${item.label}</span>
        ${item.route ? `<span class="cmd-hint">${item.route}</span>` : ''}
      </div>
    `).join('');
  }

  return html;
}

function updateSelection() {
  const items = document.querySelectorAll('.cmd-palette-item');
  items.forEach((el, i) => {
    el.classList.toggle('selected', parseInt(el.dataset.index) === selectedIndex);
  });

  // Scroll into view
  const selected = document.querySelector('.cmd-palette-item.selected');
  selected?.scrollIntoView({ block: 'nearest' });
}

function executeItem(item) {
  closePalette();

  if (item.route) {
    window.location.hash = item.route;
  } else if (item.action) {
    handleAction(item.action);
  }
}

async function handleAction(action) {
  const { showToast } = await import('./toast.js');

  switch (action) {
    case 'new-encounter':
      showToast('Select a patient first to start an encounter', 'info');
      window.location.hash = '#/patients';
      break;
    case 'prescribe':
      showToast('Select a patient first to prescribe', 'info');
      window.location.hash = '#/patients';
      break;
    case 'order':
      showToast('Select a patient first to place an order', 'info');
      window.location.hash = '#/patients';
      break;
    case 'message':
      showToast('Select a patient first to send a message', 'info');
      window.location.hash = '#/patients';
      break;
    case 'referral':
      showToast('Select a patient first to create a referral', 'info');
      window.location.hash = '#/patients';
      break;
    default:
      showToast(`Action: ${action}`, 'info');
  }
}

export function closePalette() {
  const backdrop = document.getElementById('cmd-palette-backdrop');
  backdrop.classList.remove('open');
  isOpen = false;
}
