import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import "./App.css";

function App() {
    return (
        <div className="app">
            <Header />
            <Navigation />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;