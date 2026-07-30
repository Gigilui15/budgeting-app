import { NavLink } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link${isActive ? " nav-link--active" : ""}`;

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
          <NavLink to="/profile" className={navLinkClass}>
            Profile
          </NavLink>
        </div>

        <div className="navbar__actions">
          <NavLink to="/login" className="login-link">
            Log in
          </NavLink>
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
