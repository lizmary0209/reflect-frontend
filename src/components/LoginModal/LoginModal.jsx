import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose }) {
    return (
        <ModalWithForm isOpen={isOpen} title="Sign in" onClose={onClose}>
            <label className="auth__label">
                Email
                <input className="auth__input" type="email" name="email" placeholder="you@example.com" />
            </label>

            <label className="auth__label">
                Password
                <input className="auth__input" type="password" name="password" placeholder="Password" />
            </label>

            <button className="auth_button" type="button">
                Sign in
            </button>
        </ModalWithForm>
    );
}

export default LoginModal;