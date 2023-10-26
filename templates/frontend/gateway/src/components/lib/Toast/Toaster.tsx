import type { Toast, ToastType } from './store';
import { useToasterStore } from './store';
import * as T from './Toast';

export function Toaster() {
  const toaster = useToasterStore();

  const iconsByType: Record<ToastType, string> = {
    INFO: 'ph ph-info',
    WARNING: 'ph ph-warning',
    ERROR: 'ph ph-warning-circle',
    SUCCESS: 'ph ph-check-circle',
  };

  function onOpenChange(open: boolean, toast: Toast) {
    if (!open) toaster.close(toast);
  }

  return (
    <T.Provider duration={5000}>
      {toaster.toasts.map((toast) => {
        const type = toast.type || 'INFO';
        const icon = toast.icon || iconsByType[type];

        return (
          <T.Root
            data-type={type}
            duration={toast.duration}
            open={toast.isOpen}
            onOpenChange={(open) => onOpenChange(open, toast)}
            key={toast.id}
          >
            <i className={icon} />

            <T.Content>
              <T.Title>{toast.title}</T.Title>
              {toast.description && <T.Description>{toast.description}</T.Description>}
            </T.Content>

            <T.CloseButton data-type={type} />
          </T.Root>
        );
      })}

      <T.Viewport />
    </T.Provider>
  );
}
