import { getPatientById, MEDICATIONS_CATALOG, ORDER_CATALOG } from '../dummy-data.js';
import { showToast } from './toast.js';

let currentType = null;

export function openPanel(type, data = {}) {
  const backdrop = document.getElementById('slide-panel-backdrop');
  const panel = document.getElementById('slide-panel');

  currentType = type;
  const patient = data.patientId ? getPatientById(data.patientId) : null;

  panel.innerHTML = renderPanelContent(type, patient, data);

  // Open
  requestAnimationFrame(() => {
    backdrop.classList.add('open');
    panel.classList.add('open');
    if (window.lucide) lucide.createIcons({ nodes: [panel] });
  });

  // Backdrop close
  backdrop.onclick = () => closePanel();

  // Init panel interactions
  initPanelEvents(panel, type, patient);
}

export function closePanel() {
  const backdrop = document.getElementById('slide-panel-backdrop');
  const panel = document.getElementById('slide-panel');
  backdrop.classList.remove('open');
  panel.classList.remove('open');
  currentType = null;
}

function renderPanelContent(type, patient, data) {
  const patientLabel = patient ? `${patient.name} (MRN: ${patient.mrn})` : '';

  switch (type) {
    case 'prescribe':
      return `
        <div class="slide-panel-header">
          <h3><i data-lucide="pill" style="width:20px;height:20px;vertical-align:middle;margin-right:8px"></i>e-Prescribe</h3>
          <button class="btn btn-icon btn-ghost" data-action="close-panel"><i data-lucide="x" style="width:18px;height:18px"></i></button>
        </div>
        <div class="slide-panel-body">
          ${patient ? `<div class="text-secondary mb-4" style="font-size:var(--text-sm)">Patient: <strong>${patientLabel}</strong></div>` : ''}
          <div class="form-group">
            <label class="form-label">Medication</label>
            <input class="form-input" id="rx-search" placeholder="Search medications..." autocomplete="off">
            <div id="rx-results" style="margin-top:var(--sp-2)"></div>
          </div>
          <div class="form-group">
            <label class="form-label">Dose</label>
            <select class="form-select" id="rx-dose"><option value="">Select dose</option></select>
          </div>
          <div class="form-group">
            <label class="form-label">Route</label>
            <input class="form-input" id="rx-route" value="Oral" readonly>
          </div>
          <div class="form-group">
            <label class="form-label">Frequency</label>
            <select class="form-select" id="rx-freq"><option value="">Select frequency</option></select>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-3)">
            <div class="form-group">
              <label class="form-label">Quantity</label>
              <input class="form-input" id="rx-qty" type="number" value="30">
            </div>
            <div class="form-group">
              <label class="form-label">Refills</label>
              <input class="form-input" id="rx-refills" type="number" value="3">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Pharmacy</label>
            <input class="form-input" value="${patient?.preferredPharmacy || ''}" readonly>
          </div>
          <div class="form-group">
            <label class="form-label">Diagnosis Link</label>
            <select class="form-select">
              ${patient ? patient.problems.map(p => `<option value="${p.icd10}">${p.icd10} — ${p.description}</option>`).join('') : '<option>Select diagnosis</option>'}
            </select>
          </div>
        </div>
        <div class="slide-panel-footer">
          <button class="btn btn-secondary" data-action="close-panel">Cancel</button>
          <button class="btn btn-primary" data-action="send-rx"><i data-lucide="send" style="width:14px;height:14px"></i> Send Rx</button>
        </div>
      `;

    case 'order':
      return `
        <div class="slide-panel-header">
          <h3><i data-lucide="flask-conical" style="width:20px;height:20px;vertical-align:middle;margin-right:8px"></i>Place Order</h3>
          <button class="btn btn-icon btn-ghost" data-action="close-panel"><i data-lucide="x" style="width:18px;height:18px"></i></button>
        </div>
        <div class="slide-panel-body">
          ${patient ? `<div class="text-secondary mb-4" style="font-size:var(--text-sm)">Patient: <strong>${patientLabel}</strong></div>` : ''}
          <div class="form-group">
            <label class="form-label">Search Orders</label>
            <input class="form-input" id="order-search" placeholder="Search labs, imaging, screenings..." autocomplete="off">
          </div>
          <div id="order-results">
            ${ORDER_CATALOG.map(o => `
              <div class="inbox-item" style="cursor:pointer" data-action="select-order" data-order="${o.name}" data-code="${o.code}" data-cat="${o.category}">
                <div class="item-title">${o.name}</div>
                <div class="item-meta">
                  <span class="badge badge-gray">${o.category}</span>
                  <span class="text-mono text-xs">${o.code}</span>
                </div>
              </div>
            `).join('')}
          </div>
          <div id="selected-orders" style="margin-top:var(--sp-4)"></div>
          <div class="form-group" style="margin-top:var(--sp-4)">
            <label class="form-label">Link Diagnosis</label>
            <select class="form-select">
              ${patient ? patient.problems.map(p => `<option value="${p.icd10}">${p.icd10} — ${p.description}</option>`).join('') : '<option>Select diagnosis</option>'}
            </select>
          </div>
        </div>
        <div class="slide-panel-footer">
          <button class="btn btn-secondary" data-action="close-panel">Cancel</button>
          <button class="btn btn-primary" data-action="place-order"><i data-lucide="check" style="width:14px;height:14px"></i> Place Order</button>
        </div>
      `;

    case 'referral':
      return `
        <div class="slide-panel-header">
          <h3><i data-lucide="file-output" style="width:20px;height:20px;vertical-align:middle;margin-right:8px"></i>Create Referral</h3>
          <button class="btn btn-icon btn-ghost" data-action="close-panel"><i data-lucide="x" style="width:18px;height:18px"></i></button>
        </div>
        <div class="slide-panel-body">
          ${patient ? `<div class="text-secondary mb-4" style="font-size:var(--text-sm)">Patient: <strong>${patientLabel}</strong></div>` : ''}
          <div class="form-group">
            <label class="form-label">Specialty</label>
            <select class="form-select">
              <option>Select specialty</option>
              <option>Cardiology</option>
              <option>Dermatology</option>
              <option>Endocrinology</option>
              <option>Gastroenterology</option>
              <option>Nephrology</option>
              <option>Neurology</option>
              <option>Ophthalmology</option>
              <option>Orthopedics</option>
              <option>Pulmonology</option>
              <option>Psychiatry</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Referring To</label>
            <input class="form-input" placeholder="Provider or facility name">
          </div>
          <div class="form-group">
            <label class="form-label">Diagnosis</label>
            <select class="form-select">
              ${patient ? patient.problems.map(p => `<option value="${p.icd10}">${p.icd10} — ${p.description}</option>`).join('') : '<option>Select diagnosis</option>'}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Clinical Reason</label>
            <textarea class="form-textarea" placeholder="Clinical rationale for referral..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Urgency</label>
            <select class="form-select">
              <option>Routine</option>
              <option>Urgent</option>
              <option>Emergent</option>
            </select>
          </div>
        </div>
        <div class="slide-panel-footer">
          <button class="btn btn-secondary" data-action="close-panel">Cancel</button>
          <button class="btn btn-primary" data-action="send-referral"><i data-lucide="send" style="width:14px;height:14px"></i> Send Referral</button>
        </div>
      `;

    case 'message':
      return `
        <div class="slide-panel-header">
          <h3><i data-lucide="mail" style="width:20px;height:20px;vertical-align:middle;margin-right:8px"></i>Message Patient</h3>
          <button class="btn btn-icon btn-ghost" data-action="close-panel"><i data-lucide="x" style="width:18px;height:18px"></i></button>
        </div>
        <div class="slide-panel-body">
          ${patient ? `<div class="text-secondary mb-4" style="font-size:var(--text-sm)">To: <strong>${patient.firstName} ${patient.lastName}</strong> (${patient.email})</div>` : ''}
          <div class="form-group">
            <label class="form-label">Subject</label>
            <input class="form-input" placeholder="Message subject">
          </div>
          <div class="form-group">
            <label class="form-label">Message</label>
            <textarea class="form-textarea" style="min-height:200px" placeholder="Type your message to the patient..."></textarea>
          </div>
        </div>
        <div class="slide-panel-footer">
          <button class="btn btn-secondary" data-action="close-panel">Cancel</button>
          <button class="btn btn-primary" data-action="send-message"><i data-lucide="send" style="width:14px;height:14px"></i> Send Message</button>
        </div>
      `;

    default:
      return '<div class="slide-panel-body"><div class="empty-state">Unknown panel type</div></div>';
  }
}

function initPanelEvents(panel, type, patient) {
  panel.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]');
    if (!action) return;

    const actionType = action.dataset.action;

    if (actionType === 'close-panel') {
      closePanel();
    } else if (actionType === 'send-rx') {
      showToast('Prescription sent to pharmacy', 'success');
      closePanel();
    } else if (actionType === 'place-order') {
      showToast('Order placed successfully', 'success');
      closePanel();
    } else if (actionType === 'send-referral') {
      showToast('Referral sent', 'success');
      closePanel();
    } else if (actionType === 'send-message') {
      showToast('Message sent to patient', 'success');
      closePanel();
    } else if (actionType === 'select-order') {
      action.style.background = 'var(--accent-subtle)';
      action.style.borderLeft = '3px solid var(--accent)';
    }
  });

  // Medication search
  if (type === 'prescribe') {
    const searchInput = panel.querySelector('#rx-search');
    const resultsDiv = panel.querySelector('#rx-results');
    const doseSelect = panel.querySelector('#rx-dose');
    const freqSelect = panel.querySelector('#rx-freq');

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase();
        if (q.length < 2) {
          resultsDiv.innerHTML = '';
          return;
        }
        const matches = MEDICATIONS_CATALOG.filter(m => m.name.toLowerCase().includes(q)).slice(0, 5);
        resultsDiv.innerHTML = matches.map(m => `
          <div style="padding:var(--sp-2) var(--sp-3);cursor:pointer;border-bottom:1px solid var(--border-subtle);transition:background 0.15s"
               onmouseover="this.style.background='var(--bg-elevated)'" onmouseout="this.style.background=''"
               data-med-name="${m.name}" data-med-doses="${m.doses.join(',')}" data-med-freqs="${m.frequencies.join(',')}">
            ${m.name}
          </div>
        `).join('');

        resultsDiv.addEventListener('click', (e) => {
          const item = e.target.closest('[data-med-name]');
          if (!item) return;
          searchInput.value = item.dataset.medName;
          resultsDiv.innerHTML = '';

          // Populate dose and frequency
          doseSelect.innerHTML = item.dataset.medDoses.split(',').map(d => `<option>${d}</option>`).join('');
          freqSelect.innerHTML = item.dataset.medFreqs.split(',').map(f => `<option>${f}</option>`).join('');
        });
      });
    }
  }

  // Order search filter
  if (type === 'order') {
    const searchInput = panel.querySelector('#order-search');
    const resultsDiv = panel.querySelector('#order-results');

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase();
        resultsDiv.querySelectorAll('.inbox-item').forEach(item => {
          const name = item.dataset.order?.toLowerCase() || '';
          const cat = item.dataset.cat?.toLowerCase() || '';
          item.style.display = (name.includes(q) || cat.includes(q)) ? '' : 'none';
        });
      });
    }
  }
}
