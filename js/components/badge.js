const STATUS_MAP = {
  confirmed: { label: 'Confirmed', class: 'badge-green badge-dot' },
  pending: { label: 'Pending', class: 'badge-amber badge-dot' },
  in_progress: { label: 'In Progress', class: 'badge-blue badge-dot' },
  completed: { label: 'Completed', class: 'badge-green badge-dot' },
  cancelled: { label: 'Cancelled', class: 'badge-red badge-dot' },
  no_show: { label: 'No Show', class: 'badge-red badge-dot' },

  // Inbox
  normal: { label: 'Normal', class: 'badge-green' },
  urgent: { label: 'Urgent', class: 'badge-red badge-dot' },

  // Referral statuses
  'Sent': { label: 'Sent', class: 'badge-blue' },
  'Received': { label: 'Received', class: 'badge-amber' },
  'Scheduled': { label: 'Scheduled', class: 'badge-green' },
  'Completed': { label: 'Completed', class: 'badge-green' },
  'Note Received': { label: 'Note Received', class: 'badge-green' },

  // Order statuses
  'Ordered': { label: 'Ordered', class: 'badge-blue' },
  'Collected': { label: 'Collected', class: 'badge-amber' },
  'Resulted': { label: 'Resulted', class: 'badge-green' },
  'Overdue': { label: 'Overdue', class: 'badge-red badge-dot' },

  // Encounter order statuses
  linked: { label: 'Linked', class: 'badge-green' },
  needs_fax: { label: 'Needs Fax', class: 'badge-amber' },

  // Care gap statuses
  overdue: { label: 'Overdue', class: 'badge-red badge-dot' },
  upcoming: { label: 'Upcoming', class: 'badge-amber' },
  open: { label: 'Open', class: 'badge-amber badge-dot' }
};

export function renderBadge(status) {
  const config = STATUS_MAP[status] || { label: status, class: 'badge-gray' };
  return `<span class="badge ${config.class}">${config.label}</span>`;
}

export function renderAllergyBadge(allergy) {
  const severityClass = allergy.severity === 'severe' ? 'severe' :
                        allergy.severity === 'moderate' ? 'moderate' : 'mild';
  return `<span class="allergy-tag ${severityClass}">
    <i data-lucide="alert-triangle" style="width:12px;height:12px"></i>
    ${allergy.substance} (${allergy.reaction})
  </span>`;
}
