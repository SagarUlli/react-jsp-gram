import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/userService";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    gender: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(user);

      if (response.data.success) {
        toast.success(response.data.message);

        navigate(`/otp/${response.data.data}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="text-center">Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="mobile"
            placeholder="Mobile"
            onChange={handleChange}
          />

          <select
            className="form-control mb-3"
            name="gender"
            onChange={handleChange}
          >
            <option value="">Select Gender</option>

            <option value="MALE">Male</option>

            <option value="FEMALE">Female</option>
          </select>

          <input
            className="form-control mb-3"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

          <input
            type="password"
            className="form-control mb-3"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <input
            type="password"
            className="form-control mb-3"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
