let toastId = 0;

export function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const id = `toast-${++toastId}`;
  const iconMap = {
    success: 'check-circle',
    error: 'alert-circle',
    warning: 'alert-triangle',
    info: 'info'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.id = id;
  toast.innerHTML = `
    <i data-lucide="${iconMap[type] || 'info'}" style="width:18px;height:18px;flex-shrink:0"></i>
    <span>${message}</span>
    <button class="toast-close" data-dismiss="${id}">
      <i data-lucide="x" style="width:14px;height:14px"></i>
    </button>
  `;

  container.appendChild(toast);

  if (window.lucide) lucide.createIcons({ nodes: [toast] });

  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.remove();
  });

  if (duration > 0) {
    setTimeout(() => {
      if (document.getElementById(id)) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, duration);
  }
}
