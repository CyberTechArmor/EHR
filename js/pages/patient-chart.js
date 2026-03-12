import { getPatientById, PATIENTS } from '../dummy-data.js';
import { renderBadge, renderAllergyBadge } from '../components/badge.js';
import { setPageTitle } from '../components/header.js';

export function render(params) {
  const patient = getPatientById(params.id);
  if (!patient) {
    return `<div class="empty-state"><i data-lucide="user-x"></i><div class="empty-title">Patient not found</div></div>`;
  }

  setPageTitle(`<span class="breadcrumb-parent" data-action="back-to-patients">Patients</span><span class="breadcrumb-sep">›</span>${patient.name}`);

  const v = patient.vitals.latest;

  return `
    <div class="page-patient-chart">
      <div class="two-col-layout">
        <!-- Main Column -->
        <div class="two-col-main">
          <!-- Pre-visit Summary -->
          <div class="card previsit-summary">
            <div class="card-header">Pre-Visit Summary</div>
            <div class="previsit-item">
              <i data-lucide="calendar"></i>
              <span>Last visit: ${patient.preVisitSummary.lastVisit.date} — ${patient.preVisitSummary.lastVisit.summary}</span>
            </div>
            ${patient.preVisitSummary.relevantResults.map(r => `
              <div class="previsit-item">
                <i data-lucide="activity"></i>
                <span>${r.test}: ${r.value} (${r.date})${r.previousValue ? ` — prev ${r.previousValue}` : ''}${r.trend ? ` <span style="color:${r.trend === 'improving' ? 'var(--green)' : 'var(--red)'}">↗ ${r.trend}</span>` : ''}</span>
              </div>
            `).join('')}
            ${patient.preVisitSummary.openOrders.length > 0 ? `
              <div class="previsit-item">
                <i data-lucide="alert-circle"></i>
                <span>Open: ${patient.preVisitSummary.openOrders.join(', ')}</span>
              </div>
            ` : ''}
            ${patient.preVisitSummary.dueScreenings.length > 0 ? `
              <div class="previsit-item">
                <i data-lucide="clock"></i>
                <span>Due: ${patient.preVisitSummary.dueScreenings.join(', ')}</span>
              </div>
            ` : ''}
            <div class="previsit-item" style="margin-top:var(--sp-2)">
              <i data-lucide="stethoscope"></i>
              <span><strong>Reason today:</strong> ${patient.preVisitSummary.reasonToday}</span>
            </div>
          </div>

          <!-- Vitals -->
          <div class="card">
            <div class="card-header">Vitals (Latest)</div>
            <div class="vitals-grid">
              <div class="vital-item">
                <div class="vital-label">Blood Pressure</div>
                <div class="vital-value ${getBPClass(v.bp)}">${v.bp}</div>
              </div>
              <div class="vital-item">
                <div class="vital-label">Heart Rate</div>
                <div class="vital-value normal">${v.hr} bpm</div>
              </div>
              <div class="vital-item">
                <div class="vital-label">Temperature</div>
                <div class="vital-value ${v.temp > 100.4 ? 'critical' : 'normal'}">${v.temp}°F</div>
              </div>
              <div class="vital-item">
                <div class="vital-label">SpO2</div>
                <div class="vital-value ${v.spo2 < 95 ? 'critical' : 'normal'}">${v.spo2}%</div>
              </div>
              <div class="vital-item">
                <div class="vital-label">Weight</div>
                <div class="vital-value">${v.weight} lbs</div>
              </div>
              <div class="vital-item">
                <div class="vital-label">BMI</div>
                <div class="vital-value ${v.bmi > 30 ? 'borderline' : v.bmi > 25 ? 'borderline' : 'normal'}">${v.bmi}</div>
              </div>
            </div>
          </div>

          <!-- Problem List -->
          <div class="card">
            <div class="card-header">Active Problems</div>
            <div class="problem-list">
              ${patient.problems.filter(p => p.status === 'active').map(p => `
                <div class="problem-item">
                  <i data-lucide="circle-dot" style="width:14px;height:14px;color:var(--text-muted)"></i>
                  <span>${p.description}</span>
                  <span class="problem-code">${p.icd10}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Visit History -->
          <div class="card">
            <div class="card-header">Visit History</div>
            <div class="visit-timeline">
              ${patient.visits.map(visit => `
                <div class="timeline-item" data-action="open-visit" data-note-id="${visit.noteId}">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <div class="timeline-date">${visit.date}</div>
                    <div class="timeline-title">${visit.type} — ${visit.summary}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right Panel (sticky) -->
        <div class="two-col-right" id="right-panel">
          <!-- Patient Summary -->
          <div class="right-section">
            <div class="right-patient-name">${patient.firstName} ${patient.lastName}</div>
            <div class="right-patient-demo">
              <span>${patient.age}${patient.sex} — DOB: ${patient.dob}</span>
              <span>MRN: ${patient.mrn}</span>
              <span>Ins: ${patient.insurance.name}</span>
            </div>
          </div>

          <!-- Allergies -->
          <div class="right-section">
            <div class="right-section-title">Allergies</div>
            ${patient.allergies.length > 0
              ? patient.allergies.map(a => renderAllergyBadge(a)).join('<br style="margin-bottom:4px">')
              : '<span class="text-muted text-sm">NKDA</span>'
            }
          </div>

          <!-- Active Medications -->
          <div class="right-section">
            <div class="right-section-title">Active Medications</div>
            ${patient.medications.length > 0
              ? patient.medications.map(m => `
                <div class="med-item" data-action="med-detail" data-rx-id="${m.rxId}">
                  <div class="med-name">${m.name}</div>
                  <div class="med-dose">${m.dose} ${m.frequency}</div>
                </div>
              `).join('')
              : '<span class="text-muted text-sm">No active medications</span>'
            }
          </div>

          <div style="border-top:1px solid var(--border);margin:var(--sp-3) 0"></div>

          <!-- Quick Actions -->
          <div class="right-section">
            <div class="right-section-title">Quick Actions</div>
            <div class="quick-actions">
              <button class="quick-action-btn" data-action="new-encounter" data-patient-id="${patient.id}">
                <i data-lucide="plus-circle"></i> New Encounter
              </button>
              <button class="quick-action-btn" data-action="prescribe" data-patient-id="${patient.id}">
                <i data-lucide="pill"></i> e-Prescribe
              </button>
              <button class="quick-action-btn" data-action="order" data-patient-id="${patient.id}">
                <i data-lucide="flask-conical"></i> Order
              </button>
              <button class="quick-action-btn" data-action="message" data-patient-id="${patient.id}">
                <i data-lucide="mail"></i> Message Patient
              </button>
              <button class="quick-action-btn" data-action="referral" data-patient-id="${patient.id}">
                <i data-lucide="file-output"></i> Referral
              </button>
            </div>
          </div>

          <div style="border-top:1px solid var(--border);margin:var(--sp-3) 0"></div>

          <!-- Care Gaps -->
          ${patient.careGaps.length > 0 ? `
            <div class="right-section">
              <div class="right-section-title">Care Gaps</div>
              ${patient.careGaps.map(gap => `
                <div class="care-gap-item" data-action="close-gap" data-measure="${gap.measure}">
                  <i data-lucide="alert-circle"></i>
                  <span>${gap.description}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Right Panel Toggle (mobile) -->
      <div class="right-panel-toggle" data-action="toggle-right-panel">
        <i data-lucide="panel-right-open" style="width:16px;height:16px"></i>
      </div>
    </div>
  `;
}

function getBPClass(bp) {
  const systolic = parseInt(bp.split('/')[0]);
  if (systolic >= 140) return 'critical';
  if (systolic >= 130) return 'borderline';
  return 'normal';
}

export function init(params) {
  const page = document.querySelector('.page-patient-chart');
  if (!page) return;

  // Quick action clicks
  page.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]');
    if (!action) return;

    const actionType = action.dataset.action;
    const patientId = action.dataset.patientId || params.id;

    switch (actionType) {
      case 'new-encounter':
        window.location.hash = `#/encounter/${patientId}`;
        break;
      case 'prescribe':
        openSlidePanel('prescribe', patientId);
        break;
      case 'order':
        openSlidePanel('order', patientId);
        break;
      case 'message':
        openSlidePanel('message', patientId);
        break;
      case 'referral':
        openSlidePanel('referral', patientId);
        break;
      case 'toggle-right-panel':
        document.getElementById('right-panel')?.classList.toggle('open');
        break;
      case 'back-to-patients':
        window.location.hash = '#/patients';
        break;
      case 'close-gap':
        const { showToast } = await_import_toast();
        showToast(`Care gap action: ${action.dataset.measure}`, 'info');
        break;
      case 'med-detail':
        const { showToast: toast2 } = await_import_toast();
        toast2('Medication detail panel would open', 'info');
        break;
    }
  });

  // Breadcrumb in header
  document.querySelector('.breadcrumb-parent')?.addEventListener('click', () => {
    window.location.hash = '#/patients';
  });
}

function await_import_toast() {
  // Inline to avoid circular import issues at module level
  return { showToast: (msg, type) => import('../components/toast.js').then(m => m.showToast(msg, type)) };
}

async function openSlidePanel(type, patientId) {
  const module = await import('../components/slide-panel.js');
  module.openPanel(type, { patientId });
}
