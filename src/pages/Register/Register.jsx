import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import { toast } from "react-toastify";

import AOS from "aos";
import "aos/dist/aos.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const result = await register(form);

      if (result.success) {
        toast.success(result.message);

        navigate("/login");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error(err);

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
        {/* Left */}

        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center text-white">
          <h1 className="display-3 fw-bold">📸 JSPGram</h1>

          <p className="fs-4 text-center px-5 mt-3">
            Join thousands of people sharing moments every day.
          </p>
        </div>

        {/* Right */}

        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <div
            className="card shadow-lg border-0 rounded-4"
            style={{ width: "600px", maxWidth: "95%" }}
            data-aos="zoom-in"
          >
            <div className="card-body p-5">
              <h2 className="fw-bold text-center mb-4">Create Account</h2>

              <form onSubmit={handleRegister}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      className="form-control form-control-lg rounded-pill"
                      value={form.firstname}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      className="form-control form-control-lg rounded-pill"
                      value={form.lastname}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="form-control form-control-lg rounded-pill"
                      value={form.username}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control form-control-lg rounded-pill"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="number"
                      name="mobile"
                      placeholder="Mobile Number"
                      className="form-control form-control-lg rounded-pill"
                      value={form.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <select
                      name="gender"
                      className="form-select form-select-lg rounded-pill"
                      value={form.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-12 mb-3">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control form-control-lg rounded-pill"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="form-control form-control-lg rounded-pill"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button className="btn btn-primary btn-lg rounded-pill w-100 mt-3">
                  Register
                </button>
              </form>

              <p className="text-center mt-4">
                Already have an account?
                <Link to="/login" className="fw-bold ms-2 text-decoration-none">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
