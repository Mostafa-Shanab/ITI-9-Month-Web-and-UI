import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { login as loginAction } from "../../store/slices/authSlice";
import "./Login.css";

function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Fetch users from db.json
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      // Find user with matching email and password
      const foundUser = users.find(
        (user) => user.email === email && user.password === password,
      );

      if (foundUser) {
        const userData = {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
        };
        dispatch(loginAction(userData));
        toast.success(`${t("login.success")} ${foundUser.username}!`);
        navigate("/");
      } else {
        toast.error(t("login.invalidCredentials"));
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(t("login.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">{t("login.title")}</h1>
          <p className="auth-subtitle">{t("login.subtitle")}</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                {t("login.email")}
              </label>
              <input
                type="email"
                id="email"
                className={`form-input ${errors.email ? "error" : ""}`}
                placeholder={t("login.emailPlaceholder")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: "" });
                  }
                }}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                {t("login.password")}
              </label>
              <input
                type="password"
                id="password"
                className={`form-input ${errors.password ? "error" : ""}`}
                placeholder={t("login.passwordPlaceholder")}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: "" });
                  }
                }}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? `${t("common.loading")}...` : t("login.submit")}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {t("login.signupLink")}{" "}
              <a href="/signup" className="auth-link">
                Sign up here
              </a>
            </p>
          </div>

          <div className="demo-credentials">
            <p className="demo-title">Demo Credentials:</p>
            <p className="demo-text">Email: demo@example.com</p>
            <p className="demo-text">Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
