import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister }) {
    const handleSubmit = (evt) => {
        evt.preventDefault();

        const { name, email, password } = evt.target.elements;

        onRegister({
            name: name.value,
            email: email.value,
            password: password.value,
        });
    };

    return (
        <ModalWithForm
         isOpen={isOpen}
          title="Sign Up"
           onClose={onClose}
           onSubmit={handleSubmit}
           >
            <label className="auth__label">
                Name
                <input
                 className="auth__input"
                  type="text"
                   name="name"
                    placeholder="Your name"
                    required
                    minLength="2"
                    />
                    <p className="modal__error">
                        Name must be at least 2 characters.
                    </p>
            </label>

            <label className="auth__label">
                Email
                <input
                 className="auth__input"
                  type="email"
                   name="email"
                    placeholder="you@example.com"
                    required
                    />
                    <p className="modal__error">
  Please enter a valid email address.
</p>
            </label>

            <label className="auth__label">
                Password
                <input 
                className="auth__input" 
                type="password"
                 name="password"
                  placeholder="Password"
                  minLength="8"
                  required
                  />
                  <p className="modal__error">
  Password must be at least 8 characters.
</p>
            </label>

            <div className="auth__actions">
            <button className="auth__button" type="submit">
                Sign up
            </button>
            </div>
        </ModalWithForm>
    );
}

export default RegisterModal;