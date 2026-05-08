import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { logout } from "../../store/slices/authSlice";
import { toggleTheme } from "../../store/slices/themeSlice";
import { toggleLanguage, setLanguage } from "../../store/slices/localeSlice";
import "./Header.css";

function Header() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode);
  const language = useSelector((state) => state.locale.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLanguageToggle = () => {
    const newLang = language === "en" ? "ar" : "en";
    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <header>
      <Link to="/" className="logo">
        <h2>TechShanab</h2>
      </Link>
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/">{t("header.home")}</Link>
            </li>
            <li>
              <Link to="/posts">{t("header.posts")}</Link>
            </li>
            <li>
              <Link to="/add-post">{t("header.addPost")}</Link>
            </li>
            <li>
              <span className="user-info">Welcome, {user?.username}!</span>
            </li>
            <li>
              <button
                onClick={handleThemeToggle}
                className="theme-btn"
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </li>
            <li>
              <button
                onClick={handleLanguageToggle}
                className="language-btn"
                title={`Switch to ${language === "en" ? "Arabic" : "English"}`}
              >
                {language === "en" ? "AR" : "EN"}
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                {t("header.logout")}
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">{t("header.login")}</Link>
            </li>
            <li>
              <Link to="/signup">{t("header.signup")}</Link>
            </li>
            <li>
              <button
                onClick={handleThemeToggle}
                className="theme-btn"
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </li>
            <li>
              <button
                onClick={handleLanguageToggle}
                className="language-btn"
                title={`Switch to ${language === "en" ? "Arabic" : "English"}`}
              >
                {language === "en" ? "AR" : "EN"}
              </button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
