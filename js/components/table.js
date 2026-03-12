/**
 * Render a data table.
 * @param {Object} config
 * @param {Array} config.columns - [{key, label, class?, render?}]
 * @param {Array} config.rows - data objects
 * @param {string} [config.className] - extra CSS class
 * @param {Function} [config.onRowClick] - not used in render, handled by delegation
 */
export function renderTable({ columns, rows, className = '' }) {
  return `
    <table class="data-table ${className}">
      <thead>
        <tr>
          ${columns.map(col => `<th class="${col.class || ''}">${col.label}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${rows.map((row, index) => `
          <tr data-index="${index}" data-id="${row.id || index}">
            ${columns.map(col => {
              const value = col.render ? col.render(row) : (row[col.key] || '');
              return `<td class="${col.class || ''}">${value}</td>`;
            }).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}
