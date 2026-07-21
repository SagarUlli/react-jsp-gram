import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3 text-primary" to="/home">
          📸 JSPGram
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          {/* Search */}

          <form className="mx-auto w-50">
            <input
              type="search"
              className="form-control rounded-pill"
              placeholder="Search users..."
            />
          </form>

          {/* Menu */}

          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                <i className="bi bi-house-door-fill fs-5"></i>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/create-post">
                <i className="bi bi-plus-square fs-5"></i>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/suggestions">
                <i className="bi bi-people-fill fs-5"></i>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/prime">
                <i className="bi bi-star-fill text-warning fs-5"></i>
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                href="/"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                onClick={(e) => e.preventDefault()}
              >
                <i className="bi bi-person-circle fs-4"></i>
              </a>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/edit-profile">
                    Edit Profile
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link className="dropdown-item text-danger" to="/logout">
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
