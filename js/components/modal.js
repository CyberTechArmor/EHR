export function openModal({ title, body, confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm, onCancel, danger = false }) {
  const backdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('modal');

  modal.innerHTML = `
    <div class="modal-header">
      <h3>${title}</h3>
    </div>
    <div class="modal-body">
      ${body}
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" data-action="cancel">${cancelLabel}</button>
      <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-action="confirm">${confirmLabel}</button>
    </div>
  `;

  backdrop.classList.add('open');

  const handleClick = (e) => {
    const action = e.target.closest('[data-action]');
    if (!action) return;

    if (action.dataset.action === 'confirm') {
      closeModal();
      if (onConfirm) onConfirm();
    } else if (action.dataset.action === 'cancel') {
      closeModal();
      if (onCancel) onCancel();
    }

    modal.removeEventListener('click', handleClick);
  };

  modal.addEventListener('click', handleClick);

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === backdrop) {
      closeModal();
      if (onCancel) onCancel();
      backdrop.removeEventListener('click', handleBackdrop);
    }
  };
  backdrop.addEventListener('click', handleBackdrop);
}

export function closeModal() {
  const backdrop = document.getElementById('modal-backdrop');
  backdrop.classList.remove('open');
}
