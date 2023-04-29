import "./modal.css";

const Modal = ({ open, children, className, handleClose, parentClassName }) => {
  return (
    <>
      {open && (
        <div
          className={parentClassName}
          onClick={(e) => {
            e.nativeEvent.stopImmediatePropagation();
            handleClose?.();
          }}
        >
          <div
            className={`${style.modalContentWrapper} ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
