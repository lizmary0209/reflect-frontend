import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://127.0.0.1:3001/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            localStorage.setItem("jwt", data.token);
           if (onLoginSuccess) {
            onLoginSuccess(data.token);
           }
           onClose();
        })
        .catch((err) => {
            console.error(err);
        });
    };


    return (
        <ModalWithForm isOpen={isOpen} title="Sign in" onClose={onClose} onSubmit={handleSubmit}>
            <label className="auth__label">
                Email
                <input
                 className="auth__input"
                 type="email"
                  name="email"
                   value={email}
                    onChange={(e) => setEmail(e.target.value)}
                     placeholder="you@example.com"
                     required
                      />
            </label>

            <label className="auth__label">
                Password
                <input
                 className="auth__input"
                  type="password"
                   name="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Password"
                   required
                    />
            </label>

            <button className="auth_button" type="submit">
                Sign in
            </button>
        </ModalWithForm>
    );
}

export default LoginModal;