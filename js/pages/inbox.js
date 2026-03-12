import { INBOX } from '../dummy-data.js';
import { renderBadge } from '../components/badge.js';
import { showToast } from '../components/toast.js';

let activeCategory = 'results';
let activeItemId = null;

const CATEGORY_META = {
  results: { label: 'Results', icon: 'flask-conical' },
  messages: { label: 'Messages', icon: 'mail' },
  refills: { label: 'Rx Refills', icon: 'pill' },
  orders: { label: 'Orders', icon: 'clipboard-list' },
  priorAuth: { label: 'Prior Auth', icon: 'shield-check' },
  admin: { label: 'Admin', icon: 'briefcase' }
};

export function render() {
  const categories = INBOX.categories;
  const activeItems = categories[activeCategory]?.items || [];
  const firstItem = activeItemId ? activeItems.find(i => i.id === activeItemId) : activeItems[0];
  if (firstItem && !activeItemId) activeItemId = firstItem.id;

  return `
    <div class="page-inbox">
      <div class="inbox-layout">
        <!-- Categories -->
        <div class="inbox-categories">
          ${Object.entries(categories).map(([key, cat]) => `
            <div class="inbox-category-item ${key === activeCategory ? 'active' : ''}" data-category="${key}">
              <span><i data-lucide="${CATEGORY_META[key]?.icon || 'folder'}" style="width:16px;height:16px;vertical-align:middle;margin-right:8px"></i>${CATEGORY_META[key]?.label || key}</span>
              ${cat.count > 0 ? `<span class="tab-count">${cat.count}</span>` : ''}
            </div>
          `).join('')}

          <div style="border-top:1px solid var(--border);margin:var(--sp-3) 0;padding-top:var(--sp-3)">
            <div class="inbox-category-item" data-action="bulk-sign" style="color:var(--accent)">
              <span><i data-lucide="check-square" style="width:16px;height:16px;vertical-align:middle;margin-right:8px"></i>Bulk Sign</span>
              ${INBOX.bulkSignable.count > 0 ? `<span class="tab-count">${INBOX.bulkSignable.count}</span>` : ''}
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="inbox-content">
          <!-- Item List -->
          <div class="inbox-item-list" id="inbox-item-list">
            ${renderItemList(activeItems)}
          </div>

          <!-- Detail -->
          <div class="inbox-detail" id="inbox-detail">
            ${firstItem ? renderItemDetail(firstItem) : renderEmptyDetail()}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderItemList(items) {
  if (items.length === 0) {
    return `<div class="empty-state" style="padding:var(--sp-8)">
      <i data-lucide="inbox" style="width:32px;height:32px;margin-bottom:var(--sp-3)"></i>
      <div class="empty-title">No items</div>
      <div class="text-muted">This category is empty</div>
    </div>`;
  }

  return items.map(item => `
    <div class="inbox-item ${item.id === activeItemId ? 'active' : ''} ${!item.read ? 'unread' : ''}" data-item-id="${item.id}">
      <div class="item-title">${item.patient.name} ${item.urgency === 'urgent' ? renderBadge('urgent') : ''}</div>
      <div class="item-preview">${item.preview}</div>
      <div class="item-meta">
        <span>${item.subject}</span>
        <span class="text-mono">${formatTime(item.date)}</span>
      </div>
    </div>
  `).join('');
}

function renderItemDetail(item) {
  return `
    <div class="inbox-detail-header">
      <div class="detail-patient">
        <i data-lucide="user" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"></i>
        ${item.patient.name}
        ${item.urgency === 'urgent' ? renderBadge('urgent') : ''}
      </div>
      <div class="detail-subject">${item.subject}</div>
      <div class="detail-meta">${new Date(item.date).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</div>
    </div>
    <div class="inbox-detail-body">
      ${item.body.split('\n').map(line => `<p>${line || '<br>'}</p>`).join('')}
    </div>
    <div class="inbox-detail-actions">
      ${item.type === 'message' ? `
        <button class="btn btn-primary btn-sm" data-action="reply"><i data-lucide="reply" style="width:14px;height:14px"></i> Reply</button>
        <button class="btn btn-secondary btn-sm" data-action="route"><i data-lucide="forward" style="width:14px;height:14px"></i> Route to RN</button>
      ` : ''}
      ${item.type === 'lab' ? `
        <button class="btn btn-primary btn-sm" data-action="sign-result"><i data-lucide="check" style="width:14px;height:14px"></i> Sign</button>
      ` : ''}
      ${item.type === 'refill' ? `
        <button class="btn btn-primary btn-sm" data-action="approve-refill"><i data-lucide="check" style="width:14px;height:14px"></i> Approve</button>
        <button class="btn btn-secondary btn-sm" data-action="modify-refill"><i data-lucide="edit" style="width:14px;height:14px"></i> Modify</button>
      ` : ''}
      <button class="btn btn-ghost btn-sm" data-action="open-chart" data-patient-id="${item.patient.id}">
        <i data-lucide="external-link" style="width:14px;height:14px"></i> Open Chart
      </button>
    </div>
  `;
}

function renderEmptyDetail() {
  return `<div class="empty-state" style="height:100%">
    <i data-lucide="mouse-pointer-click" style="width:32px;height:32px;margin-bottom:var(--sp-3)"></i>
    <div class="empty-title">Select an item</div>
    <div class="text-muted">Choose an item from the list to view details</div>
  </div>`;
}

function renderBulkSign() {
  const items = INBOX.bulkSignable.items;
  return `
    <div class="bulk-sign-section">
      <h3 style="font-size:var(--text-lg);font-weight:600;margin-bottom:var(--sp-4)">
        <i data-lucide="check-square" style="width:20px;height:20px;vertical-align:middle;margin-right:8px"></i>
        Bulk Sign — Normal Results
      </h3>
      <p class="text-secondary mb-4">These lab results have all values within reference range. Review and sign in bulk.</p>
      ${items.map(item => `
        <div class="bulk-item">
          <label>
            <input type="checkbox" checked style="accent-color:var(--accent);width:16px;height:16px">
            <span style="font-weight:500">${item.patient.name}</span>
            <span class="text-muted" style="margin-left:var(--sp-2)">— ${item.test}</span>
          </label>
          <span class="bulk-values">${item.value} (ref: ${item.range})</span>
        </div>
      `).join('')}
      <div style="margin-top:var(--sp-4);display:flex;gap:var(--sp-3)">
        <button class="btn btn-primary" data-action="confirm-bulk-sign">
          <i data-lucide="check" style="width:16px;height:16px"></i> Sign ${items.length} Results
        </button>
        <button class="btn btn-secondary" data-action="cancel-bulk-sign">Cancel</button>
      </div>
    </div>
  `;
}

function formatTime(dateStr) {
  const date = new Date(dateStr);
  const now = new Date('2026-03-12T12:00:00');
  const diffMs = now - date;
  const diffHrs = Math.floor(diffMs / 3600000);

  if (diffHrs < 1) return `${Math.floor(diffMs / 60000)}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function init() {
  const page = document.querySelector('.page-inbox');
  if (!page) return;

  // Category clicks
  const categories = page.querySelector('.inbox-categories');
  categories.addEventListener('click', (e) => {
    const catItem = e.target.closest('[data-category]');
    if (catItem) {
      activeCategory = catItem.dataset.category;
      activeItemId = null;
      refreshInbox(page);
      return;
    }

    const action = e.target.closest('[data-action]');
    if (action && action.dataset.action === 'bulk-sign') {
      const detail = page.querySelector('#inbox-detail');
      detail.innerHTML = renderBulkSign();
      if (window.lucide) lucide.createIcons();
    }
  });

  // Item list clicks
  const itemList = page.querySelector('#inbox-item-list');
  itemList.addEventListener('click', (e) => {
    const item = e.target.closest('[data-item-id]');
    if (!item) return;
    activeItemId = item.dataset.itemId;
    refreshInbox(page);
  });

  // Detail action clicks
  const detail = page.querySelector('#inbox-detail');
  detail.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]');
    if (!action) return;

    const actionType = action.dataset.action;
    if (actionType === 'open-chart') {
      window.location.hash = `#/patient/${action.dataset.patientId}`;
    } else if (actionType === 'sign-result') {
      showToast('Result signed successfully', 'success');
    } else if (actionType === 'approve-refill') {
      showToast('Refill approved and sent to pharmacy', 'success');
    } else if (actionType === 'reply') {
      showToast('Reply panel would open here', 'info');
    } else if (actionType === 'route') {
      showToast('Message routed to RN', 'success');
    } else if (actionType === 'confirm-bulk-sign') {
      showToast(`${INBOX.bulkSignable.items.length} results signed`, 'success');
    } else if (actionType === 'cancel-bulk-sign') {
      activeItemId = null;
      refreshInbox(page);
    }
  });
}

function refreshInbox(page) {
  const categories = INBOX.categories;
  const activeItems = categories[activeCategory]?.items || [];
  const activeItem = activeItemId ? activeItems.find(i => i.id === activeItemId) : activeItems[0];
  if (activeItem && !activeItemId) activeItemId = activeItem.id;

  // Update category active states
  page.querySelectorAll('[data-category]').forEach(el => {
    el.classList.toggle('active', el.dataset.category === activeCategory);
  });

  // Update item list
  const itemList = page.querySelector('#inbox-item-list');
  itemList.innerHTML = renderItemList(activeItems);

  // Update detail
  const detail = page.querySelector('#inbox-detail');
  detail.innerHTML = activeItem ? renderItemDetail(activeItem) : renderEmptyDetail();

  if (window.lucide) lucide.createIcons();
}
