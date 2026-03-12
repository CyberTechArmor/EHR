import { REPORTS } from '../dummy-data.js';
import { renderBadge } from '../components/badge.js';
import { renderTabs, initTabs } from '../components/tabs.js';

export function render() {
  return `
    <div class="page-reports">
      ${renderTabs([
        { id: 'billing', label: 'Billing', active: true },
        { id: 'quality', label: 'Quality' },
        { id: 'referrals', label: 'Referrals' },
        { id: 'orders', label: 'Orders' }
      ], 'report-tabs')}

      <!-- Billing Tab -->
      <div class="tab-content active" data-tab-content="billing" data-tab-group="report-tabs">
        <div class="reports-stats">
          ${REPORTS.billing.stats.map(stat => `
            <div class="stat-card">
              <div class="stat-label">${stat.label}</div>
              <div class="stat-value">${stat.value}</div>
              <div class="stat-sub">${stat.sub}</div>
            </div>
          `).join('')}
        </div>

        <!-- E/M Distribution -->
        <div class="card mb-4">
          <div class="card-header">E/M Code Distribution (This Month)</div>
          <div class="bar-chart">
            ${REPORTS.billing.emDistribution.map(item => `
              <div class="bar-col">
                <div class="bar-value">${item.count}</div>
                <div class="bar" style="height:${item.percentage * 2}px;background:var(--accent)"></div>
                <div class="bar-label">${item.code}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Unsigned Notes -->
        <div class="card">
          <div class="card-header">Unsigned Encounters</div>
          <div class="reports-table-wrap" style="border:none">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${REPORTS.billing.unsignedNotes.map(note => `
                  <tr>
                    <td class="col-link">${note.patient}</td>
                    <td class="col-mono">${note.date}</td>
                    <td>${note.type}</td>
                    <td>${renderBadge(parseInt(note.age) > 2 ? 'urgent' : 'normal')}<span style="margin-left:var(--sp-1)">${note.age}</span></td>
                    <td><button class="btn btn-sm btn-secondary">Sign</button></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Quality Tab -->
      <div class="tab-content" data-tab-content="quality" data-tab-group="report-tabs">
        <div class="quality-measures">
          ${REPORTS.quality.measures.map(m => `
            <div class="quality-card">
              <div class="measure-name">${m.name}</div>
              <div class="measure-bar">
                <div class="measure-bar-fill ${m.status}" style="width:${m.percentage}%"></div>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:baseline">
                <div class="measure-value" style="color:${m.status === 'good' ? 'var(--green)' : m.status === 'warning' ? 'var(--amber)' : 'var(--red)'}">${m.percentage}%</div>
                <div class="measure-target">Target: ${m.target}% | ${m.numerator}/${m.denominator}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Referrals Tab -->
      <div class="tab-content" data-tab-content="referrals" data-tab-group="report-tabs">
        <div class="reports-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>MRN</th>
                <th>Specialty</th>
                <th>Provider</th>
                <th>Date Sent</th>
                <th>Status</th>
                <th>Days Open</th>
                <th>Consult Note</th>
              </tr>
            </thead>
            <tbody>
              ${REPORTS.referrals.map(ref => `
                <tr>
                  <td class="col-link">${ref.patient}</td>
                  <td class="col-mono">${ref.mrn}</td>
                  <td>${ref.specialty}</td>
                  <td>${ref.provider}</td>
                  <td class="col-mono">${ref.dateSent}</td>
                  <td>${renderBadge(ref.status)}</td>
                  <td class="col-mono">${ref.daysOpen}d</td>
                  <td>${ref.consultNote ? '<span style="color:var(--green)">✓ Received</span>' : '<span class="text-muted">○ Pending</span>'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Orders Tab -->
      <div class="tab-content" data-tab-content="orders" data-tab-group="report-tabs">
        <div class="reports-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>MRN</th>
                <th>Order</th>
                <th>Date Ordered</th>
                <th>Expected By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${REPORTS.orders.map(ord => `
                <tr>
                  <td class="col-link">${ord.patient}</td>
                  <td class="col-mono">${ord.mrn}</td>
                  <td>${ord.order}</td>
                  <td class="col-mono">${ord.dateOrdered}</td>
                  <td class="col-mono">${ord.expectedBy}</td>
                  <td>${renderBadge(ord.status)}${ord.overdue ? ' <i data-lucide="alert-triangle" style="width:14px;height:14px;color:var(--red);vertical-align:middle"></i>' : ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  initTabs('report-tabs');
}
