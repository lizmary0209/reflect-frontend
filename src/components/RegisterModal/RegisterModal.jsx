import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose }) {
    return (
        <ModalWithForm isOpen={isOpen} title="Sign Up" onClose={onClose}>
            <label className="auth__label">
                Name
                <input className="auth__input" type="text" name="name" placeholder="Your Name" />
            </label>

            <label className="auth__label">
                Email
                <input className="auth__input" type="email" name="email" placeholder="you@example.com" />
            </label>

            <label className="auth__label">
                Password
                <input className="auth__input" type="password" name="password" placeholder="Password" />
            </label>

            <button className="auth__button" type="button">
                Sign Up
            </button>
        </ModalWithForm>
    );
}

export default RegisterModal;