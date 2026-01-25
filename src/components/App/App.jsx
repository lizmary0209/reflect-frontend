import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";


import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

import { getEntries } from "../../utils/api";

import "./App.css";

function App() {
    const [activeModal, setActiveModal] = useState("");
    const [entries, setEntries] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoadingEntries, setIsLoadingEntries] = useState(false);

    const openLogin = () => setActiveModal("login");
    const openRegister = () => setActiveModal("register");
    const closeModal = () => setActiveModal("");

    const fetchEntries = () => {
        setIsLoadingEntries(true);
        return getEntries()
        .then((data) => {
            setEntries(data);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setIsLoadingEntries(false);
        });
    };

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        if (!token) {
            setIsLoggedIn(false);
            return;
        }

        setIsLoggedIn(true);
        fetchEntries();
    }, []);

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

    const handleLoginSuccess = () => {
        const token = localStorage.getItem("jwt");
        if (!token) return;

        setIsLoggedIn(true);
        fetchEntries();
    };

    const handleLoginClose = () => {
        closeModal();
    };


    return (
        <div className="app">
            <Header onOpenLogin={openLogin} onOpenRegister={openRegister} />
            <Navigation />

            <Routes>
                <Route path="/"
                 element={<Main entries={entries} isLoading={isLoadingEntries} isLoggedIn={isLoggedIn} />} 
                 />
                <Route path="/profile" element={<Profile />} />
            </Routes>

            <Footer />

            <LoginModal 
            isOpen={activeModal === "login"}
             onClose={handleLoginClose}
             onLoginSuccess={handleLoginSuccess}
              />
            <RegisterModal isOpen={activeModal === "register"} onClose={closeModal} />
        </div>
    );
}

export default App;