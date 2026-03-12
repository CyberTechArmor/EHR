import { ENCOUNTERS, getPatientById } from '../dummy-data.js';
import { renderBadge } from '../components/badge.js';
import { renderTabs, initTabs } from '../components/tabs.js';
import { setPageTitle } from '../components/header.js';
import { showToast } from '../components/toast.js';

export function render(params) {
  // Use first encounter for demo, or look up by patient id
  const encounter = ENCOUNTERS['enc-001'];
  const patient = encounter?.patient || getPatientById(params.id);

  if (!patient) {
    return `<div class="empty-state"><i data-lucide="stethoscope"></i><div class="empty-title">No encounter found</div></div>`;
  }

  setPageTitle(`<span class="breadcrumb-parent" data-action="back-to-chart">Patients</span><span class="breadcrumb-sep">›</span>${patient.name}<span class="breadcrumb-sep">›</span>Encounter`);

  const enc = encounter || createDemoEncounter(patient);
  const v = patient.vitals.latest;

  return `
    <div class="page-encounter">
      <!-- Subheader -->
      <div class="encounter-subheader">
        <div class="encounter-patient">
          <i data-lucide="stethoscope" style="width:20px;height:20px;vertical-align:middle;margin-right:8px"></i>
          ${patient.name} — ${enc.visitType}
        </div>
        <div class="encounter-meta">
          <span>Visit Type: ${enc.visitType}</span>
          <span>Started: ${new Date(enc.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
          <span id="encounter-timer-inline">⏱ 00:${enc.emLevel.timeMinutes.toString().padStart(2, '0')}</span>
        </div>
      </div>

      <!-- Tabs -->
      <div class="encounter-tabs">
        ${renderTabs([
          { id: 'hpi', label: 'HPI', active: true },
          { id: 'exam', label: 'Exam' },
          { id: 'ap', label: 'A/P' },
          { id: 'orders', label: 'Orders' }
        ], 'encounter-tabs')}
      </div>

      <div class="two-col-layout" style="height:calc(100% - 120px)">
        <!-- Main Column -->
        <div class="two-col-main">
          <!-- HPI Tab -->
          <div class="tab-content active" data-tab-content="hpi" data-tab-group="encounter-tabs">
            <h3 style="font-size:var(--text-lg);font-weight:600;margin-bottom:var(--sp-4)">Problems Addressed</h3>
            <div class="hpi-problems">
              ${enc.hpiProblems.map((prob, i) => `
                <div class="hpi-problem-card">
                  <div class="hpi-problem-header" data-action="toggle-hpi" data-index="${i}">
                    <span class="problem-name">
                      <i data-lucide="check-square" style="width:16px;height:16px;color:var(--green)"></i>
                      ${prob.name}
                    </span>
                    <span class="text-mono text-sm text-muted">${prob.icd10}</span>
                  </div>
                  <div class="hpi-problem-body ${prob.prePopulated ? 'pre-populated' : ''}">
                    ${prob.narrative.map(line => `
                      <div class="hpi-detail-row">
                        <i data-lucide="chevron-right"></i>
                        <span>${line}</span>
                      </div>
                    `).join('')}
                    <div class="hpi-free-text">
                      <textarea placeholder="Additional notes for ${prob.name}..."></textarea>
                    </div>
                  </div>
                </div>
              `).join('')}
              <button class="btn btn-secondary" style="margin-top:var(--sp-3)" data-action="add-problem">
                <i data-lucide="plus" style="width:14px;height:14px"></i> Add Problem
              </button>
            </div>
          </div>

          <!-- Exam Tab -->
          <div class="tab-content" data-tab-content="exam" data-tab-group="encounter-tabs">
            <h3 style="font-size:var(--text-lg);font-weight:600;margin-bottom:var(--sp-4)">Physical Examination</h3>
            <div class="exam-systems">
              ${enc.exam.systems.map(sys => `
                <div class="exam-system" data-system="${sys.system}">
                  <div class="system-name">${sys.system}</div>
                  <div class="system-toggle">
                    <button class="exam-toggle-btn ${sys.finding === 'Normal' ? 'active normal' : ''}" data-finding="Normal">✓ Normal</button>
                    <button class="exam-toggle-btn ${sys.finding === 'Abnormal' ? 'active abnormal' : ''}" data-finding="Abnormal">○ Abnormal</button>
                  </div>
                  <div class="exam-findings">
                    ${sys.details ? `<span class="text-sm text-secondary">${sys.details}</span>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- A/P Tab -->
          <div class="tab-content" data-tab-content="ap" data-tab-group="encounter-tabs">
            <h3 style="font-size:var(--text-lg);font-weight:600;margin-bottom:var(--sp-4)">Assessment & Plan</h3>
            <div class="ap-problems">
              ${enc.assessmentPlan.map(prob => `
                <div class="ap-problem-card">
                  <div class="card-title">${prob.description}</div>
                  <div class="ap-diagnosis">
                    <span class="dx-code">${prob.icd10}</span>
                    <span class="text-sm text-muted">Specificity: ✓</span>
                  </div>
                  <div class="ap-assessment">
                    <span class="text-sm text-secondary" style="margin-right:var(--sp-2)">Assessment:</span>
                    <select>
                      <option ${prob.assessment === 'Improving' ? 'selected' : ''}>Improving</option>
                      <option ${prob.assessment === 'Stable' ? 'selected' : ''}>Stable</option>
                      <option ${prob.assessment === 'Worsening' ? 'selected' : ''}>Worsening</option>
                    </select>
                  </div>
                  <div class="right-section-title" style="margin-top:var(--sp-3)">Plan</div>
                  <div class="ap-plan-items">
                    ${prob.planItems.map(item => `
                      <div class="ap-plan-item">
                        <input type="checkbox" ${item.checked ? 'checked' : ''}>
                        <span>${item.text}</span>
                        ${item.autoOrder ? `<span class="auto-order">→ auto-order (${item.orderType})</span>` : ''}
                      </div>
                    `).join('')}
                    <button class="btn btn-ghost btn-sm" style="margin-top:var(--sp-2)">
                      <i data-lucide="plus" style="width:12px;height:12px"></i> Add plan item
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Sign Off Section -->
            <div class="sign-off-section">
              <h3>Sign & Close Encounter</h3>
              <div class="sign-off-checks">
                ${enc.completenessCheck.items.map(item => `
                  <div class="check-item ${item.passed ? 'passed' : item.severity === 'warning' ? 'warning' : 'failed'}">
                    <i data-lucide="${item.passed ? 'check-circle' : item.severity === 'warning' ? 'alert-triangle' : 'x-circle'}" class="check-icon"></i>
                    <span>${item.rule}</span>
                    ${!item.passed && item.fixAction ? `<button class="btn btn-ghost btn-sm" style="margin-left:auto">${item.fixAction}</button>` : ''}
                  </div>
                `).join('')}
              </div>
              <div class="sign-off-code">
                <span class="text-secondary">Selected Code:</span>
                <select class="form-select" style="width:120px">
                  <option>99213</option>
                  <option selected>99214</option>
                  <option>99215</option>
                </select>
                <span class="text-sm text-muted">(System recommends 99214)</span>
              </div>
              <div class="sign-off-actions">
                <button class="btn btn-primary" data-action="sign-encounter">
                  <i data-lucide="check-circle" style="width:16px;height:16px"></i> Sign & Close
                </button>
                <button class="btn btn-secondary" data-action="save-draft">
                  <i data-lucide="save" style="width:16px;height:16px"></i> Save Draft
                </button>
              </div>
            </div>
          </div>

          <!-- Orders Tab -->
          <div class="tab-content" data-tab-content="orders" data-tab-group="encounter-tabs">
            <h3 style="font-size:var(--text-lg);font-weight:600;margin-bottom:var(--sp-4)">Encounter Orders</h3>
            <div class="orders-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Order</th>
                    <th>Diagnosis</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${enc.orders.map(order => `
                    <tr>
                      <td>${renderBadge(order.type === 'Rx' ? 'linked' : 'linked')}<span style="margin-left:var(--sp-2)">${order.type}</span></td>
                      <td>${order.description}</td>
                      <td class="col-mono">${order.linkedDiagnosis}</td>
                      <td>${renderBadge(order.status)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div class="orders-actions">
              <button class="btn btn-secondary" data-action="add-order">
                <i data-lucide="plus" style="width:14px;height:14px"></i> Add Order
              </button>
              <button class="btn btn-secondary" data-action="add-rx">
                <i data-lucide="pill" style="width:14px;height:14px"></i> Add Rx
              </button>
              <button class="btn btn-secondary" data-action="add-referral">
                <i data-lucide="file-output" style="width:14px;height:14px"></i> Add Referral
              </button>
            </div>
          </div>
        </div>

        <!-- Right Panel -->
        <div class="two-col-right">
          <!-- Patient Summary -->
          <div class="right-section">
            <div class="right-patient-name">${patient.firstName} ${patient.lastName}</div>
            <div class="right-patient-demo">
              <span>${patient.age}${patient.sex} — MRN: ${patient.mrn}</span>
              <span>Ins: ${patient.insurance.name}</span>
            </div>
          </div>

          <!-- Allergies -->
          <div class="right-section">
            <div class="right-section-title">Allergies</div>
            ${patient.allergies.length > 0
              ? patient.allergies.map(a => `<span class="allergy-tag ${a.severity === 'severe' ? 'severe' : a.severity === 'moderate' ? 'moderate' : 'mild'}"><i data-lucide="alert-triangle" style="width:12px;height:12px"></i> ${a.substance} (${a.reaction})</span><br>`).join('')
              : '<span class="text-muted text-sm">NKDA</span>'
            }
          </div>

          <!-- Active Meds -->
          <div class="right-section">
            <div class="right-section-title">Active Medications</div>
            ${patient.medications.map(m => `
              <div class="med-item">
                <div class="med-name">${m.name}</div>
                <div class="med-dose">${m.dose} ${m.frequency}</div>
              </div>
            `).join('')}
          </div>

          <div style="border-top:1px solid var(--border);margin:var(--sp-3) 0"></div>

          <!-- Encounter Actions -->
          <div class="right-section">
            <div class="right-section-title">Encounter Actions</div>
            <div class="quick-actions">
              <button class="quick-action-btn" data-action="enc-prescribe"><i data-lucide="pill"></i> Prescribe</button>
              <button class="quick-action-btn" data-action="enc-order"><i data-lucide="flask-conical"></i> Order</button>
              <button class="quick-action-btn" data-action="enc-referral"><i data-lucide="file-output"></i> Referral</button>
              <button class="quick-action-btn" data-action="enc-screener"><i data-lucide="clipboard-list"></i> Screener</button>
            </div>
          </div>

          <div style="border-top:1px solid var(--border);margin:var(--sp-3) 0"></div>

          <!-- E/M Level -->
          <div class="right-section">
            <div class="right-section-title">E/M Level</div>
            <div class="em-indicator">
              <div class="em-level">${enc.emLevel.calculated}</div>
              <div class="em-bar">
                <div class="em-bar-fill" style="width:${enc.emLevel.calculated === '99215' ? '100' : enc.emLevel.calculated === '99214' ? '70' : enc.emLevel.calculated === '99213' ? '45' : '25'}%"></div>
              </div>
              <div class="text-sm text-secondary" style="margin-bottom:var(--sp-2)">MDM: Moderate</div>
              <div class="em-factors">
                ${enc.emLevel.mdmFactors.map(f => `<div class="em-factor">• ${f}</div>`).join('')}
              </div>
            </div>
          </div>

          <!-- Timer -->
          <div class="right-section">
            <div class="right-section-title">Timer</div>
            <div class="encounter-timer">
              <div>Face-to-face: <span class="timer-value">${enc.emLevel.timeMinutes} min</span></div>
              <div style="margin-top:var(--sp-2)">
                <div class="timer-threshold">
                  <span>99213</span>
                  <span>${enc.emLevel.thresholds['99213']} min</span>
                </div>
                <div class="timer-threshold ${enc.emLevel.calculated === '99214' ? 'active' : ''}">
                  <span>99214</span>
                  <span>${enc.emLevel.thresholds['99214']} min</span>
                </div>
                <div class="timer-threshold">
                  <span>99215</span>
                  <span>${enc.emLevel.thresholds['99215']} min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function createDemoEncounter(patient) {
  return ENCOUNTERS['enc-001'];
}

export function init(params) {
  const page = document.querySelector('.page-encounter');
  if (!page) return;

  // Tabs
  initTabs('encounter-tabs');

  // Exam toggle buttons
  page.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.exam-toggle-btn');
    if (toggleBtn) {
      const system = toggleBtn.closest('.exam-system');
      system.querySelectorAll('.exam-toggle-btn').forEach(b => b.classList.remove('active', 'normal', 'abnormal'));
      const finding = toggleBtn.dataset.finding;
      toggleBtn.classList.add('active', finding.toLowerCase());
      return;
    }

    const action = e.target.closest('[data-action]');
    if (!action) return;

    const actionType = action.dataset.action;
    const patient = ENCOUNTERS['enc-001']?.patient;

    switch (actionType) {
      case 'sign-encounter':
        showToast('Encounter signed and closed', 'success');
        setTimeout(() => {
          if (patient) window.location.hash = `#/patient/${patient.id}`;
          else window.location.hash = '#/schedule';
        }, 1000);
        break;
      case 'save-draft':
        showToast('Draft saved', 'info');
        break;
      case 'enc-prescribe':
        import('../components/slide-panel.js').then(m => m.openPanel('prescribe', { patientId: patient?.id }));
        break;
      case 'enc-order':
        import('../components/slide-panel.js').then(m => m.openPanel('order', { patientId: patient?.id }));
        break;
      case 'enc-referral':
        import('../components/slide-panel.js').then(m => m.openPanel('referral', { patientId: patient?.id }));
        break;
      case 'enc-screener':
        showToast('Screener panel would open', 'info');
        break;
      case 'add-order':
        import('../components/slide-panel.js').then(m => m.openPanel('order', { patientId: patient?.id }));
        break;
      case 'add-rx':
        import('../components/slide-panel.js').then(m => m.openPanel('prescribe', { patientId: patient?.id }));
        break;
      case 'add-referral':
        import('../components/slide-panel.js').then(m => m.openPanel('referral', { patientId: patient?.id }));
        break;
      case 'add-problem':
        showToast('Add problem panel would open', 'info');
        break;
      case 'back-to-chart':
        window.location.hash = '#/patients';
        break;
    }
  });
}
