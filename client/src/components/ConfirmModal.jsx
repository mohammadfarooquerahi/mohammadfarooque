import { useEffect, useRef } from "react";

export default function ConfirmModal({
  isOpen,
  title = "Confirm Destructive Action",
  message = "Are you sure you want to proceed? This action cannot be undone.",
  confirmLabel = "Yes, Proceed",
  cancelLabel = "Cancel",
  requireInput = false,
  inputPlaceholder = "Type CONFIRM to proceed",
  expectedInput = "CONFIRM",
  onConfirm,
  onCancel,
}) {
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (requireInput && inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, requireInput]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (requireInput) {
      if (inputRef.current?.value.trim().toUpperCase() !== expectedInput.toUpperCase()) {
        alert(`Please type "${expectedInput}" to confirm.`);
        return;
      }
    }
    onConfirm();
  };

  return (
    <div className="modal-backdrop" onClick={onCancel} role="dialog" aria-modal="true">
      <div
        className="modal-card destructive-modal"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-badge-warn">⚠️ Warning</div>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-desc">{message}</p>

        {requireInput && (
          <div className="modal-input-field">
            <label htmlFor="confirm-input">Type <strong>{expectedInput}</strong> to confirm:</label>
            <input
              id="confirm-input"
              ref={inputRef}
              placeholder={inputPlaceholder}
              autoComplete="off"
            />
          </div>
        )}

        <div className="modal-actions">
          <button className="btn-border" onClick={onCancel}>
            <span>{cancelLabel}</span>
          </button>
          <button className="btn-destructive" onClick={handleConfirm}>
            <span>{confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
