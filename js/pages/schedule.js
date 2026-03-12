import { SCHEDULE } from '../dummy-data.js';
import { renderBadge } from '../components/badge.js';

export function render() {
  const { stats, appointments } = SCHEDULE;

  return `
    <div class="page-schedule">
      <!-- Stats Row -->
      <div class="schedule-stats">
        <div class="stat-card">
          <div class="stat-label">Total Patients</div>
          <div class="stat-value">${stats.total}</div>
          <div class="stat-sub">Scheduled today</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Confirmed</div>
          <div class="stat-value" style="color:var(--green)">${stats.confirmed}</div>
          <div class="stat-sub">Ready for visit</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">In Progress</div>
          <div class="stat-value" style="color:var(--blue)">${stats.inProgress}</div>
          <div class="stat-sub">Currently being seen</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Avg Wait</div>
          <div class="stat-value">${stats.avgWaitMinutes}m</div>
          <div class="stat-sub">Check-in to rooming</div>
        </div>
      </div>

      <!-- Controls -->
      <div class="schedule-controls">
        <div class="filter-bar" id="schedule-filters">
          <button class="filter-chip active" data-filter="all">All</button>
          <button class="filter-chip" data-filter="confirmed">Confirmed</button>
          <button class="filter-chip" data-filter="pending">Pending</button>
          <button class="filter-chip" data-filter="in_progress">In Progress</button>
        </div>
        <div class="date-nav">
          <button class="btn btn-ghost btn-sm" data-action="prev-day">
            <i data-lucide="chevron-left" style="width:16px;height:16px"></i>
          </button>
          <span class="date-label">Today, March 12, 2026</span>
          <button class="btn btn-ghost btn-sm" data-action="next-day">
            <i data-lucide="chevron-right" style="width:16px;height:16px"></i>
          </button>
        </div>
      </div>

      <!-- Schedule Table -->
      <div class="schedule-table-wrap">
        <table class="data-table schedule-table" id="schedule-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Patient</th>
              <th>Type</th>
              <th>Provider</th>
              <th>Status</th>
              <th>Intake</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${appointments.map(apt => `
              <tr data-id="${apt.id}" data-patient="${apt.patient.id}" data-status="${apt.status}">
                <td class="col-mono">${apt.time}</td>
                <td>
                  <span class="col-link" data-action="open-chart" data-patient-id="${apt.patient.id}">${apt.patient.name}</span>
                  <div class="text-xs text-muted text-mono">${apt.patient.mrn}</div>
                </td>
                <td>${apt.visitType}</td>
                <td>${apt.provider}</td>
                <td class="status-cell">${renderBadge(apt.status)}</td>
                <td class="intake-cell">${renderIntake(apt.intake, apt.status)}</td>
                <td>
                  <div class="col-actions">
                    <button class="btn btn-icon btn-ghost sm" data-action="start-encounter" data-patient-id="${apt.patient.id}" data-encounter-id="${apt.id}" title="Start Encounter">
                      <i data-lucide="play" style="width:14px;height:14px"></i>
                    </button>
                    <button class="btn btn-icon btn-ghost sm" data-action="open-chart" data-patient-id="${apt.patient.id}" title="Open Chart">
                      <i data-lucide="clipboard-list" style="width:14px;height:14px"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderIntake(intake, status) {
  if (status === 'pending' || status === 'cancelled') {
    return '<span class="text-muted text-xs">—</span>';
  }

  return `
    <div class="intake-progress">
      <span class="intake-item ${intake.vitals ? 'done' : ''}">V${intake.vitals ? '✓' : '○'}</span>
      <span class="intake-item ${intake.medRec ? 'done' : ''}">M${intake.medRec ? '✓' : '○'}</span>
      <span class="intake-item ${intake.screeners ? 'done' : ''}">S${intake.screeners ? '✓' : '○'}</span>
    </div>
  `;
}

export function init() {
  const page = document.querySelector('.page-schedule');
  if (!page) return;

  // Filter chips
  const filters = page.querySelector('#schedule-filters');
  if (filters) {
    filters.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;

      filters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.dataset.filter;
      const rows = page.querySelectorAll('#schedule-table tbody tr');
      rows.forEach(row => {
        if (filter === 'all' || row.dataset.status === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // Table clicks
  const table = page.querySelector('#schedule-table');
  if (table) {
    table.addEventListener('click', (e) => {
      const action = e.target.closest('[data-action]');
      if (!action) return;

      const actionType = action.dataset.action;
      if (actionType === 'open-chart') {
        const patientId = action.dataset.patientId;
        window.location.hash = `#/patient/${patientId}`;
      } else if (actionType === 'start-encounter') {
        const patientId = action.dataset.patientId;
        window.location.hash = `#/encounter/${patientId}`;
      }
    });
  }
}
