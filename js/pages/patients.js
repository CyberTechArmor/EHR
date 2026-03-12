import { PATIENTS } from '../dummy-data.js';

const ALPHA_GROUPS = ['A–D', 'E–H', 'I–L', 'M–P', 'Q–T', 'U–Z'];
let searchQuery = '';
let activeAlpha = null;

export function render() {
  // Get recent patients from localStorage or default
  const recentIds = getRecentPatients();
  const recentPatients = recentIds.map(id => PATIENTS.find(p => p.id === id)).filter(Boolean).slice(0, 5);

  return `
    <div class="page-patients">
      <!-- Search -->
      <div class="patients-search-wrap">
        <div class="patients-search">
          <i data-lucide="search"></i>
          <input type="text" id="patient-search" placeholder="Search patients by name, MRN, DOB..." autocomplete="off">
        </div>
      </div>

      <!-- Recent Patients -->
      ${recentPatients.length > 0 ? `
        <div class="patients-section">
          <h3>Recent Patients</h3>
          <div class="patients-table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>MRN</th>
                  <th>DOB</th>
                  <th>Last Visit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${recentPatients.map(p => `
                  <tr data-patient-id="${p.id}">
                    <td class="col-link" data-action="open-patient" data-patient-id="${p.id}">${p.name}</td>
                    <td class="col-mono">${p.mrn}</td>
                    <td class="col-mono">${p.dob}</td>
                    <td class="col-mono">${p.visits[0]?.date || 'N/A'}</td>
                    <td><button class="btn btn-sm btn-secondary" data-action="open-patient" data-patient-id="${p.id}">Open</button></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      <!-- My Panel -->
      <div class="patients-section">
        <h3>My Panel</h3>
        <div class="alpha-filter" id="alpha-filter">
          <button class="alpha-btn active" data-alpha="all">All</button>
          ${ALPHA_GROUPS.map(g => `<button class="alpha-btn" data-alpha="${g}">${g}</button>`).join('')}
        </div>
        <div class="patients-table-wrap">
          <table class="data-table" id="patients-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>MRN</th>
                <th>DOB</th>
                <th>Age/Sex</th>
                <th>Insurance</th>
                <th>Last Visit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="patients-tbody">
              ${renderPatientRows(PATIENTS)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderPatientRows(patients) {
  return patients.map(p => `
    <tr data-patient-id="${p.id}" data-name="${p.lastName.toLowerCase()}" data-mrn="${p.mrn}">
      <td class="col-link" data-action="open-patient" data-patient-id="${p.id}">${p.name}</td>
      <td class="col-mono">${p.mrn}</td>
      <td class="col-mono">${p.dob}</td>
      <td>${p.age}${p.sex}</td>
      <td>${p.insurance.name}</td>
      <td class="col-mono">${p.visits[0]?.date || 'N/A'}</td>
      <td><button class="btn btn-sm btn-secondary" data-action="open-patient" data-patient-id="${p.id}">Open</button></td>
    </tr>
  `).join('');
}

function getRecentPatients() {
  try {
    return JSON.parse(localStorage.getItem('enchart_recent_patients') || '[]');
  } catch {
    return [];
  }
}

function addRecentPatient(patientId) {
  const recent = getRecentPatients().filter(id => id !== patientId);
  recent.unshift(patientId);
  try {
    localStorage.setItem('enchart_recent_patients', JSON.stringify(recent.slice(0, 10)));
  } catch { /* ignore */ }
}

export function init() {
  const page = document.querySelector('.page-patients');
  if (!page) return;

  // Search
  const searchInput = page.querySelector('#patient-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.toLowerCase();
      filterPatients(page);
    });
    searchInput.focus();
  }

  // Alpha filter
  const alphaFilter = page.querySelector('#alpha-filter');
  if (alphaFilter) {
    alphaFilter.addEventListener('click', (e) => {
      const btn = e.target.closest('.alpha-btn');
      if (!btn) return;

      alphaFilter.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeAlpha = btn.dataset.alpha === 'all' ? null : btn.dataset.alpha;
      filterPatients(page);
    });
  }

  // Row clicks
  page.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]');
    if (!action) return;

    if (action.dataset.action === 'open-patient') {
      const patientId = action.dataset.patientId;
      addRecentPatient(patientId);
      window.location.hash = `#/patient/${patientId}`;
    }
  });
}

function filterPatients(page) {
  const rows = page.querySelectorAll('#patients-tbody tr');
  rows.forEach(row => {
    const name = row.dataset.name || '';
    const mrn = row.dataset.mrn || '';
    let show = true;

    // Search filter
    if (searchQuery) {
      show = name.includes(searchQuery) || mrn.includes(searchQuery);
    }

    // Alpha filter
    if (show && activeAlpha) {
      const range = activeAlpha.split('–').map(c => c.toLowerCase());
      const firstChar = name.charAt(0);
      show = firstChar >= range[0] && firstChar <= range[1];
    }

    row.style.display = show ? '' : 'none';
  });
}
