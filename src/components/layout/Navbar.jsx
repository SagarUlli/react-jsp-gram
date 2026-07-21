import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-3 me-5" to="/home">
          JSPGram
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto align-items-lg-center">
            {user ? (
              <>
                <NavLink
                  className="nav-link px-3 mx-1"
                  to={user ? "/home" : "/login"}
                >
                  Home
                </NavLink>

                <NavLink className="nav-link px-3 mx-1" to="/create-post">
                  Create Post
                </NavLink>

                <NavLink className="nav-link px-3 mx-1" to="/suggestions">
                  Suggestions
                </NavLink>

                <NavLink className="nav-link px-3 mx-1" to="/prime">
                  Prime
                </NavLink>

                <NavLink className="nav-link px-3 mx-1" to="/profile">
                  Profile
                </NavLink>

                <button
                  className="btn btn-outline-light rounded-pill ms-lg-4 mt-3 mt-lg-0 px-4"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink className="nav-link px-3 mx-1" to="/login">
                  Login
                </NavLink>

                <NavLink className="nav-link px-3 mx-1" to="/register">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
