import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/home">
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
          <div className="navbar-nav ms-auto">
            {user ? (
              <>
                <NavLink
                  className="navbar-brand"
                  to={user ? "/home" : "/login"}
                >
                  Home
                </NavLink>

                <NavLink to="/create-post" className="nav-link">
                  Create Post
                </NavLink>

                <NavLink to="/suggestions" className="nav-link">
                  Suggestions
                </NavLink>

                <NavLink to="/prime" className="nav-link">
                  Prime
                </NavLink>

                <NavLink to="/profile" className="nav-link">
                  Profile
                </NavLink>

                <button
                  className="btn btn-outline-light ms-lg-3 mt-2 mt-lg-0"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>

                <NavLink to="/register" className="nav-link">
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
