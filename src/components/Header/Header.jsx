import "./Header.css";

function Header({ onOpenLogin, onOpenRegister }) {
    return (
        <header className="header">
            <h1 className="header__logo">Reflect</h1>

            <div className="header__actions">
                <button className="header__button" type="button" onClick={onOpenLogin}>
                    Sign in
                </button>
                <button className="header__button header__button_primary" type="button" onClick={onOpenRegister}>
                    Sign up
                </button>
            </div>
        </header>
    );
}

export default Header;