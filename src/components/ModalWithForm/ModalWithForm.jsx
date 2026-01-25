import "./ModalWithForm.css";

function ModalWithForm({ isOpen, title, children, onClose, onSubmit }) {
    if (!isOpen) return null;

    const handleOverlayClick = (evt) => {
        if (evt.target.classList.contains("modal")) {
            onClose();
        }
    };

    return (
        <div className="modal" onMouseDown={handleOverlayClick}>
            <div className="modal__content" role="dialog" aria-label="true">
                <button
                type="button"
                className="modal__close"
                aria-label="Close modal"
                onClick={onClose}
                >
                    x
                </button>

                <h2 className="modal__title">{title}</h2>

                <form className="modal__form" noValidate onSubmit={onSubmit}>
                    {children}
                </form>
            </div>
        </div>
    );
}

export default ModalWithForm;