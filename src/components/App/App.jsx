import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";


import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";


import "./App.css";

function App() {
    const [activeModal, setActiveModal] = useState("");

    const openLogin = () => setActiveModal("login");
    const openRegister = () => setActiveModal("register");
    const closeModal = () => setActiveModal("");

    useEffect(() => {
        if (!activeModal) return;

        const handleEsc = (evt) => {
            if (evt.key === "Escape") {
                closeModal();
            }
        };

        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [activeModal]);


    return (
        <div className="app">
            <Header onOpenLogin={openLogin} onOpenRegister={openRegister} />
            <Navigation />

            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>

            <Footer />

            <LoginModal isOpen={activeModal === "login"} onClose={closeModal} />
            <RegisterModal isOpen={activeModal === "register"} onClose={closeModal} />
        </div>
    );
}

export default App;