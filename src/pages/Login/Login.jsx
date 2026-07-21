import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authService";
import { toast } from "react-toastify";

import AOS from "aos";
import "aos/dist/aos.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await login(username, password);

      if (result.success) {
        sessionStorage.setItem("user", JSON.stringify(result.data));
        toast.success(result.message);
        navigate("/home");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to connect to server.");
    }
  };

  return (
    <div
      className="container-fluid vh-100"
      style={{
        background: "linear-gradient(135deg,#4f46e5,#7c3aed,#06b6d4)",
      }}
    >
      <div className="row h-100">
        {/* Left Side */}
        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center text-white">
          <h1 className="display-3 fw-bold">📸 JSPGram</h1>

          <p className="fs-4 mt-3 text-center px-5">
            Connect with friends, share your memories and discover amazing
            stories.
          </p>
        </div>

        {/* Right Side */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <div
            className="card shadow-lg border-0 rounded-4"
            style={{ width: "430px" }}
            data-aos="zoom-in"
          >
            <div className="card-body p-5">
              <h2 className="fw-bold text-center mb-4">Welcome Back 👋</h2>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-pill"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="password"
                    className="form-control form-control-lg rounded-pill"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg rounded-pill w-100"
                >
                  Login
                </button>
              </form>

              <p className="text-center mt-4">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-decoration-none fw-bold ms-2"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
