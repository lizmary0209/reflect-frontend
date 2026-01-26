import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import NewEntryModal from "../NewEntryModal/NewEntryModal";
import EditEntryModal from "../EditEntryModal/EditEntryModal";

import {
  getEntries,
  createEntry,
  deleteEntry,
  updateEntry,
} from "../../utils/api";

import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [entries, setEntries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingEntries, setIsLoadingEntries] = useState(false);
  const [isCreatingEntry, setIsCreatingEntry] = useState(false);
  const [isUpdatingEntry, setIsUpdatingEntry] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const openLogin = () => setActiveModal("login");
  const openRegister = () => setActiveModal("register");
  const openNewEntry = () => setActiveModal("new-entry");

  const closeModal = () => {
    setActiveModal("");
    setSelectedEntry(null);
  };

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

  const handleCreateEntry = (entryData) => {
    setIsCreatingEntry(true);

    createEntry(entryData)
      .then((newEntry) => {
        setEntries((prev) => [newEntry, ...prev]);
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsCreatingEntry(false);
      });
  };

  const handleDeleteEntry = (id) => {
    deleteEntry(id)
      .then(() => {
        setEntries((prev) =>
          prev.filter((entry) => entry._id !== id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEditEntry = (entry) => {
    setSelectedEntry(entry);
    setActiveModal("edit-entry");
  };

  const handleUpdateEntry = (id, data) => {
    setIsUpdatingEntry(true);

    updateEntry(id, data)
      .then((updatedEntry) => {
        setEntries((prev) =>
          prev.map((entry) =>
            entry._id === updatedEntry._id ? updatedEntry : entry
          )
        );
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsUpdatingEntry(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setEntries([]);
    setActiveModal("");
    setSelectedEntry(null);
  };

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        onOpenLogin={openLogin}
        onOpenRegister={openRegister}
        onLogout={handleLogout}
      />

      <Navigation />

      <div className="app__content">
        <div className="app__container">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  entries={entries}
                  isLoading={isLoadingEntries}
                  isLoggedIn={isLoggedIn}
                  onOpenNewEntry={openNewEntry}
                  onDeleteEntry={handleDeleteEntry}
                  onEditEntry={handleEditEntry}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>

      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeModal}
        onLoginSuccess={handleLoginSuccess}
      />

      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeModal}
      />

      <NewEntryModal
        isOpen={activeModal === "new-entry"}
        onClose={closeModal}
        onCreateEntry={handleCreateEntry}
        isLoading={isCreatingEntry}
      />

      <EditEntryModal
        isOpen={activeModal === "edit-entry"}
        onClose={closeModal}
        onUpdateEntry={handleUpdateEntry}
        isLoading={isUpdatingEntry}
        entry={selectedEntry}
      />
    </div>
  );
}

export default App;
