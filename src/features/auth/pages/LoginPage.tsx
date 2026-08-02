import { LoginForm } from "../components/LoginForm";
import loginImage from "../../../assets/login-image.png";
import { useEffect, useState } from "react";
import SignUpForm from "../components/SignUpForm";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useTheme } from "../../../theme/ThemeContext";

//State 0 -> login and State 1 -> Sign Up
const LoginPage = () => {
  const { setTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [authMode, setAuthMode] = useState(0);

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <main className="login-page">
      <section className="login-form-side">
        <div className="login-form-container">
          <h1>Budget Base</h1>
          <button
            value={authMode}
            onClick={() => setAuthMode(0)}
            disabled={authMode === 0}
          >
            Sign in
          </button>

          <button
            value={authMode}
            onClick={() => setAuthMode(1)}
            disabled={authMode === 1}
          >
            Sign up
          </button>

          {authMode === 0 ? <LoginForm /> : <SignUpForm />}
        </div>
      </section>

      <section className="login-image-side">
        <img src={loginImage} alt="" className="login-side-image" />
      </section>
    </main>
  );
};

export default LoginPage;
