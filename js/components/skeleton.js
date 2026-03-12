// Skeleton loading generators

export function skeletonStats(count = 4) {
  return `<div class="skeleton-stats-row">
    ${Array(count).fill('').map(() => '<div class="skeleton skeleton-stat-card"></div>').join('')}
  </div>`;
}

export function skeletonTable(rows = 8, cols = 6) {
  const headerRow = `<div class="skeleton-table-row">
    ${Array(cols).fill('').map(() => '<div class="skeleton skeleton-cell"></div>').join('')}
  </div>`;

  const bodyRows = Array(rows).fill('').map(() => `<div class="skeleton-table-row">
    ${Array(cols).fill('').map((_, i) => {
      const width = i === 0 ? 'width:60px' : i === cols - 1 ? 'width:80px' : '';
      return `<div class="skeleton skeleton-cell" style="${width}"></div>`;
    }).join('')}
  </div>`).join('');

  return `<div class="skeleton-card" style="padding:0">${headerRow}${bodyRows}</div>`;
}

export function skeletonCards(count = 4) {
  return `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--sp-4)">
    ${Array(count).fill('').map(() => `<div class="skeleton-card">
      <div class="skeleton skeleton-text short"></div>
      <div class="skeleton skeleton-text long"></div>
      <div class="skeleton skeleton-text medium"></div>
    </div>`).join('')}
  </div>`;
}

export function skeletonTwoColumn() {
  return `<div class="skeleton-two-column">
    <div class="skeleton-main">
      <div class="skeleton-card">
        <div class="skeleton skeleton-heading"></div>
        <div class="skeleton skeleton-text long"></div>
        <div class="skeleton skeleton-text medium"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--sp-3)">
        <div class="skeleton skeleton-stat-card"></div>
        <div class="skeleton skeleton-stat-card"></div>
        <div class="skeleton skeleton-stat-card"></div>
      </div>
      <div class="skeleton-card">
        <div class="skeleton skeleton-heading"></div>
        <div class="skeleton skeleton-text long"></div>
        <div class="skeleton skeleton-text long"></div>
        <div class="skeleton skeleton-text medium"></div>
        <div class="skeleton skeleton-text long"></div>
      </div>
      <div class="skeleton-card">
        <div class="skeleton skeleton-heading"></div>
        <div class="skeleton skeleton-text medium"></div>
        <div class="skeleton skeleton-text medium"></div>
        <div class="skeleton skeleton-text short"></div>
        <div class="skeleton skeleton-text medium"></div>
      </div>
    </div>
    <div class="skeleton-side">
      <div class="skeleton-card">
        <div class="skeleton skeleton-heading"></div>
        <div class="skeleton skeleton-text medium"></div>
        <div class="skeleton skeleton-text short"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>
      <div class="skeleton-card">
        <div class="skeleton skeleton-heading"></div>
        <div class="skeleton skeleton-text medium"></div>
        <div class="skeleton skeleton-text medium"></div>
      </div>
      <div class="skeleton-card">
        <div class="skeleton skeleton-heading"></div>
        <div class="skeleton skeleton-text long"></div>
        <div class="skeleton skeleton-text medium"></div>
        <div class="skeleton skeleton-text long"></div>
      </div>
      <div class="skeleton-card">
        <div class="skeleton skeleton-heading"></div>
        <div class="skeleton skeleton-text medium"></div>
        <div class="skeleton skeleton-text medium"></div>
        <div class="skeleton skeleton-text medium"></div>
      </div>
    </div>
  </div>`;
}

export function skeletonTabs(tabCount = 4) {
  return `<div class="skeleton-tab-bar">
    ${Array(tabCount).fill('').map(() => '<div class="skeleton skeleton-tab"></div>').join('')}
  </div>
  <div class="skeleton-card">
    <div class="skeleton skeleton-text long"></div>
    <div class="skeleton skeleton-text long"></div>
    <div class="skeleton skeleton-text medium"></div>
    <div class="skeleton skeleton-text long"></div>
    <div class="skeleton skeleton-text short"></div>
  </div>`;
}

export function skeletonInbox() {
  return `<div class="inbox-layout">
    <div class="inbox-categories" style="padding:var(--sp-4)">
      ${Array(6).fill('').map(() => '<div class="skeleton skeleton-text" style="height:36px;margin-bottom:var(--sp-2);border-radius:var(--radius-sm)"></div>').join('')}
    </div>
    <div class="inbox-content" style="display:grid;grid-template-columns:340px 1fr">
      <div style="border-right:1px solid var(--border);padding:var(--sp-3)">
        ${Array(6).fill('').map(() => `<div style="padding:var(--sp-3);border-bottom:1px solid var(--border-subtle)">
          <div class="skeleton skeleton-text medium"></div>
          <div class="skeleton skeleton-text long"></div>
          <div class="skeleton skeleton-text short"></div>
        </div>`).join('')}
      </div>
      <div style="padding:var(--sp-5)">
        <div class="skeleton skeleton-heading" style="width:300px"></div>
        <div class="skeleton skeleton-text medium" style="margin-bottom:var(--sp-4)"></div>
        <div class="skeleton skeleton-text long"></div>
        <div class="skeleton skeleton-text long"></div>
        <div class="skeleton skeleton-text medium"></div>
      </div>
    </div>
  </div>`;
}

export function skeletonSettings() {
  return `<div class="settings-layout">
    <div class="settings-nav" style="padding:var(--sp-4)">
      ${Array(7).fill('').map(() => '<div class="skeleton skeleton-text" style="height:36px;margin-bottom:var(--sp-2);border-radius:var(--radius-sm)"></div>').join('')}
    </div>
    <div style="padding:var(--sp-6)">
      <div class="skeleton skeleton-heading" style="width:200px"></div>
      ${Array(5).fill('').map(() => `<div style="display:flex;justify-content:space-between;padding:var(--sp-3) 0;border-bottom:1px solid var(--border-subtle)">
        <div style="flex:1">
          <div class="skeleton skeleton-text medium"></div>
          <div class="skeleton skeleton-text short" style="margin-top:var(--sp-1)"></div>
        </div>
        <div class="skeleton" style="width:40px;height:22px;border-radius:var(--radius-full)"></div>
      </div>`).join('')}
    </div>
  </div>`;
}
