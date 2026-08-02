import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../features/auth/AuthContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const { logout } = useAuth();

  const navigate = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link${isActive ? " nav-link--active" : ""}`;

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <NavLink to="/" className="navbar__brand" aria-label="Budget Base home">
          <img
            src={isDark ? "/dark-logo.svg" : "/light-logo.svg"}
            alt=""
            className="navbar__logo"
          />
          <span className="navbar__brand-name">Budget Base</span>
        </NavLink>

        <div className="navbar__links">
          <NavLink to="/" end className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/transactions" className={navLinkClass}>
            Transactions
          </NavLink>
        </div>

        <div className="navbar__actions">
          <div className="profile-nav">
            <NavLink to="/profile" className={navLinkClass}>
              Profile
            </NavLink>

            <div className="popup-content">
              <button
                type="button"
                className="logout-menu-item"
                onClick={handleLogout}
              >
                <svg
                  className="logout-menu-item__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <path d="m16 17 5-5-5-5" />
                  <path d="M21 12H9" />
                </svg>

                <span>Log out</span>
              </button>
            </div>
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            <span aria-hidden="true">{isDark ? "☀" : "☾"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
